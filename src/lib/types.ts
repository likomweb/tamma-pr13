export type SubmissionStatus = 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'COMPLETED' | 'ARCHIVED';

export interface ContactRequest {
  id: string;
  created_at: string;
  updated_at: string;
  first_name: string;
  last_name: string;
  company?: string | null;
  email: string;
  phone: string;
  service: string;
  message: string;
  project_location?: string | null;
  project_type?: string | null;
  budget?: string | null;
  desired_deadline?: string | null;
  status: SubmissionStatus;
  is_archived: boolean;
  admin_notes?: string | null;
  attachments?: Attachment[];
}

export interface Attachment {
  id: string;
  request_id: string;
  file_name: string;
  file_path: string;
  mime_type: string;
  file_size: number;
  created_at: string;
  signed_url?: string;
}

export type Language = 'fr' | 'en' | 'ar';
