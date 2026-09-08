'use server';

import { z } from 'zod';
import { createAdminClient } from '@/lib/supabase/admin';
import { ContactRequest, SubmissionStatus } from '@/lib/types';
import { Resend } from 'resend';

const contactSchema = z.object({
  firstName: z.string().min(2, 'Le prénom est requis'),
  lastName: z.string().min(2, 'Le nom est requis'),
  company: z.string().optional().nullable(),
  email: z.string().email('Adresse email invalide'),
  phone: z.string().min(6, 'Numéro de téléphone requis'),
  service: z.string().min(2, 'Veuillez sélectionner un service'),
  projectLocation: z.string().optional().nullable(),
  projectType: z.string().optional().nullable(),
  budget: z.string().optional().nullable(),
  desiredDeadline: z.string().optional().nullable(),
  message: z.string().min(10, 'Le message doit comporter au moins 10 caractères'),
  honeypot: z.string().optional(),
});

export async function submitContactRequest(formData: FormData) {
  try {
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      company: (formData.get('company') as string) || null,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      service: formData.get('service') as string,
      projectLocation: (formData.get('projectLocation') as string) || null,
      projectType: (formData.get('projectType') as string) || null,
      budget: (formData.get('budget') as string) || null,
      desiredDeadline: (formData.get('desiredDeadline') as string) || null,
      message: formData.get('message') as string,
      honeypot: (formData.get('honeypot') as string) || '',
    };

    if (rawData.honeypot && rawData.honeypot.trim() !== '') {
      return { success: true, message: 'Message reçu' };
    }

    const validated = contactSchema.parse(rawData);
    const supabase = createAdminClient();

    const { data: requestRecord, error: insertError } = await supabase
      .from('contact_requests')
      .insert({
        first_name: validated.firstName,
        last_name: validated.lastName,
        company: validated.company,
        email: validated.email,
        phone: validated.phone,
        service: validated.service,
        project_location: validated.projectLocation,
        project_type: validated.projectType,
        budget: validated.budget,
        desired_deadline: validated.desiredDeadline,
        message: validated.message,
        status: 'NEW',
        is_archived: false,
      })
      .select('id, created_at')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      return { success: false, error: insertError.message };
    }

    const requestId = requestRecord.id;
    const files = formData.getAll('attachments') as File[];
    const uploadedAttachments: { name: string; path: string; size: number; mime: string }[] = [];

    for (const file of files) {
      if (file && file.size > 0 && file.name) {
        if (file.size > 10 * 1024 * 1024) continue;

        const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const storagePath = `${requestId}/${Date.now()}_${safeFileName}`;
        const fileBuffer = await file.arrayBuffer();

        const { error: uploadError } = await supabase.storage
          .from('customer_attachments')
          .upload(storagePath, fileBuffer, {
            contentType: file.type || 'application/octet-stream',
            upsert: false,
          });

        if (!uploadError) {
          await supabase.from('attachments').insert({
            request_id: requestId,
            file_name: file.name,
            file_path: storagePath,
            mime_type: file.type || 'application/octet-stream',
            file_size: file.size,
          });
          uploadedAttachments.push({
            name: file.name,
            path: storagePath,
            size: file.size,
            mime: file.type,
          });
        }
      }
    }

    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const recipientEmail = process.env.NOTIFICATION_EMAIL_TO || 'commercial@tamma-services.dz';
      const senderEmail = process.env.NOTIFICATION_EMAIL_FROM || 'TAMMA System <onboarding@resend.dev>';

      if (resendApiKey && resendApiKey.startsWith('re_')) {
        const resend = new Resend(resendApiKey);
        await resend.emails.send({
          from: senderEmail,
          to: [recipientEmail],
          subject: `Nouvelle demande client SARL TAMMA - ${validated.firstName} ${validated.lastName}`,
          html: `<p>Client: ${validated.firstName} ${validated.lastName}</p><p>Email: ${validated.email}</p><p>Tel: ${validated.phone}</p><p>Service: ${validated.service}</p><p>Message: ${validated.message}</p>`,
        });
      }
    } catch (emailErr) {
      console.warn('Resend notification skipped/failed:', emailErr);
    }

    return { success: true, id: requestId };
  } catch (error: any) {
    console.error('Submit contact error:', error);
    return { success: false, error: error.message || 'Erreur lors de la soumission' };
  }
}

export async function getSubmissions(options?: {
  status?: SubmissionStatus | 'ALL';
  search?: string;
  isArchived?: boolean;
}) {
  try {
    const supabase = createAdminClient();
    let query = supabase
      .from('contact_requests')
      .select('*, attachments(*)')
      .order('created_at', { ascending: false });

    if (options?.isArchived !== undefined) {
      query = query.eq('is_archived', options.isArchived);
    } else {
      query = query.eq('is_archived', false);
    }

    if (options?.status && options.status !== 'ALL') {
      query = query.eq('status', options.status);
    }

    if (options?.search && options.search.trim() !== '') {
      const s = `%${options.search.trim()}%`;
      query = query.or(`first_name.ilike.${s},last_name.ilike.${s},company.ilike.${s},email.ilike.${s},phone.ilike.${s},service.ilike.${s}`);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Error fetching submissions:', error);
      return { success: false, error: error.message, data: [] };
    }

    return { success: true, data: data as ContactRequest[] };
  } catch (err: any) {
    return { success: false, error: err.message, data: [] };
  }
}

export async function getSubmissionDetails(id: string) {
  try {
    const supabase = createAdminClient();
    const { data: request, error } = await supabase
      .from('contact_requests')
      .select('*, attachments(*)')
      .eq('id', id)
      .single();

    if (error || !request) {
      return { success: false, error: error?.message || 'Submission not found', data: null };
    }

    if (request.attachments && request.attachments.length > 0) {
      for (const att of request.attachments) {
        if (att.file_path) {
          const { data: signedData } = await supabase.storage
            .from('customer_attachments')
            .createSignedUrl(att.file_path, 3600);
          if (signedData) {
            att.signed_url = signedData.signedUrl;
          }
        }
      }
    }

    return { success: true, data: request as ContactRequest };
  } catch (err: any) {
    return { success: false, error: err.message, data: null };
  }
}

export async function updateSubmissionStatus(id: string, status: SubmissionStatus, adminNotes?: string) {
  try {
    const supabase = createAdminClient();
    const updatePayload: any = { status };
    if (adminNotes !== undefined) {
      updatePayload.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from('contact_requests')
      .update(updatePayload)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function toggleArchiveSubmission(id: string, isArchived: boolean) {
  try {
    const supabase = createAdminClient();
    const { error } = await supabase
      .from('contact_requests')
      .update({ is_archived: isArchived })
      .eq('id', id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function deleteSubmission(id: string) {
  try {
    const supabase = createAdminClient();
    const { data: attachments } = await supabase
      .from('attachments')
      .select('file_path')
      .eq('request_id', id);

    if (attachments && attachments.length > 0) {
      const paths = attachments.map((a) => a.file_path);
      await supabase.storage.from('customer_attachments').remove(paths);
    }

    const { error } = await supabase.from('contact_requests').delete().eq('id', id);
    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}