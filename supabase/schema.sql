-- ==============================================================================
-- SARL TAMMA EPC SOLUTIONS - DATABASE & STORAGE INITIALIZATION SCHEMA
-- ==============================================================================

-- Enable UUID extension if not enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Create Contact Requests Table
CREATE TABLE IF NOT EXISTS public.contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    company TEXT,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    service TEXT NOT NULL,
    message TEXT NOT NULL,
    project_location TEXT,
    project_type TEXT,
    budget TEXT,
    desired_deadline TEXT,
    status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'IN_PROGRESS', 'COMPLETED', 'ARCHIVED')),
    is_archived BOOLEAN NOT NULL DEFAULT false,
    admin_notes TEXT
);

-- 2. Create Attachments Table
CREATE TABLE IF NOT EXISTS public.attachments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    request_id UUID NOT NULL REFERENCES public.contact_requests(id) ON DELETE CASCADE,
    file_name TEXT NOT NULL,
    file_path TEXT NOT NULL,
    mime_type TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. Indexes for Search and Performance
CREATE INDEX IF NOT EXISTS idx_contact_requests_created_at ON public.contact_requests (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_requests_status ON public.contact_requests (status);
CREATE INDEX IF NOT EXISTS idx_contact_requests_email ON public.contact_requests (email);
CREATE INDEX IF NOT EXISTS idx_contact_requests_company ON public.contact_requests (company);
CREATE INDEX IF NOT EXISTS idx_attachments_request_id ON public.attachments (request_id);

-- 4. Automatic updated_at Trigger
CREATE OR REPLACE FUNCTION update_modified_column()
RETURNS TRIGGER AS 
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
 language 'plpgsql';

DROP TRIGGER IF EXISTS update_contact_requests_updated_at ON public.contact_requests;
CREATE TRIGGER update_contact_requests_updated_at
    BEFORE UPDATE ON public.contact_requests
    FOR EACH ROW
    EXECUTE FUNCTION update_modified_column();

-- 5. Row Level Security (RLS) Policies
ALTER TABLE public.contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attachments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous/public visitors to insert contact requests
CREATE POLICY "Public can insert contact requests"
    ON public.contact_requests
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow authenticated administrator to select, update, delete contact requests
CREATE POLICY "Admin full access to contact requests"
    ON public.contact_requests
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Allow public to insert attachments during submission
CREATE POLICY "Public can insert attachments"
    ON public.attachments
    FOR INSERT
    TO public
    WITH CHECK (true);

-- Allow authenticated administrator to read and manage attachments
CREATE POLICY "Admin full access to attachments"
    ON public.attachments
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- 6. Storage Bucket Configuration for Attachments (Private)
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'customer_attachments',
    'customer_attachments',
    false,
    10485760, -- 10MB limit
    ARRAY['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/zip']
)
ON CONFLICT (id) DO NOTHING;

-- Storage RLS: Public can upload
CREATE POLICY "Public can upload customer attachments"
    ON storage.objects
    FOR INSERT
    TO public
    WITH CHECK (bucket_id = 'customer_attachments');

-- Storage RLS: Authenticated admin can read/download customer attachments
CREATE POLICY "Admin can view and download customer attachments"
    ON storage.objects
    FOR SELECT
    TO authenticated
    USING (bucket_id = 'customer_attachments');
