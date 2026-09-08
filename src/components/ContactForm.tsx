'use client';

import React, { useState, useRef } from 'react';
import { useLanguage } from './LanguageContext';
import { submitContactRequest } from '@/lib/actions';
import { Send, Upload, CheckCircle2, AlertCircle, Loader2, FileText, X } from 'lucide-react';

export default function ContactForm() {
  const { t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [emailValid, setEmailValid] = useState<boolean | null>(null);
  const [phoneValid, setPhoneValid] = useState<boolean | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArray].slice(0, 5));
    }
  };

  const removeFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;

    setSubmitting(true);
    setErrorMessage(null);

    const formData = new FormData(formRef.current);
    selectedFiles.forEach((file) => {
      formData.append('attachments', file);
    });

    try {
      const result = await submitContactRequest(formData);
      if (result.success) {
        setSuccess(true);
        formRef.current.reset();
        setSelectedFiles([]);
      } else {
        setErrorMessage(result.error || t.contact.form.errorMessage);
      }
    } catch (err: any) {
      setErrorMessage(err.message || t.contact.form.errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = "w-full px-0 py-3 bg-transparent border-0 border-b border-[rgba(10,12,13,0.1)] focus:border-[var(--color-accent)] focus:shadow-[0_1px_0_0_var(--color-accent)] text-[var(--color-ink)] placeholder-[var(--color-fog)] text-sm outline-none transition-all duration-200";
  const getInputClass = (name: string, baseClass: string) => {
    const touchedField = touched[name];
    if (!touchedField) return baseClass;
    if (name === 'email' && emailValid === false) return `${baseClass} is-invalid`;
    if (name === 'phone' && phoneValid === false) return `${baseClass} is-invalid`;
    if (name === 'email' && emailValid === true) return `${baseClass} is-valid`;
    return baseClass;
  };

  const validateEmail = (val: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  const validatePhone = (val: string) => val.replace(/\D/g, '').length >= 8;
  const labelClass = "block text-[10px] font-bold tracking-[0.18em] text-[var(--color-mist)] uppercase mb-1";

  if (success) {
    return (
      <div className="card p-10 text-center space-y-5">
        <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center text-[var(--color-accent)]">
          <CheckCircle2 className="w-7 h-7" />
        </div>
        <h3 className="display-md text-[var(--color-ink)]">
          {t.contact.form.successTitle}
        </h3>
        <p className="text-sm text-[var(--color-graphite)] max-w-md mx-auto leading-relaxed">
          {t.contact.form.successMessage}
        </p>
        <div className="pt-4">
          <button
            type="button"
            onClick={() => setSuccess(false)}
            className="btn-outline text-xs"
          >
            Soumettre une autre demande
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <input
        type="text"
        name="honeypot"
        style={{ display: 'none' }}
        tabIndex={-1}
        autoComplete="off"
      />

      {errorMessage && (
        <div className="p-4 rounded-xl bg-[var(--color-accent)]/8 text-[var(--color-accent-deep)] text-sm flex items-start gap-3">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Row 1: Name & Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t.contact.form.firstName} *
          </label>
          <input
            type="text"
            name="firstName"
            required
            placeholder="Mohammed"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t.contact.form.lastName} *
          </label>
          <input
            type="text"
            name="lastName"
            required
            placeholder="Benali"
            className={inputClass}
          />
        </div>
      </div>

      {/* Row 2: Company & Service */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t.contact.form.company}
          </label>
          <input
            type="text"
            name="company"
            placeholder="Company / Institution"
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t.contact.form.service} *
          </label>
          <select
            name="service"
            required
            defaultValue=""
            className={`${inputClass} cursor-pointer appearance-none bg-[url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIj48cGF0aCBmaWxsPSIjODZiYWEiIGQ9Ik0yIDVsNiA2IDYtNnoiLz48L3N2Zz4=")] bg-[length:18px] bg-no-repeat bg-[right_0.25rem_center] pr-8`}
          >
            <option value="" disabled>
              {t.contact.form.servicePlaceholder}
            </option>
            <option value="EPC Industrial Construction & Power Plants">
              EPC Industrial Construction & Power Plants
            </option>
            <option value="High Voltage Substations (400/220/60kV) & Lines">
              High Voltage Substations & Lines
            </option>
            <option value="Pre-commissioning & Dielectric Oil Processing">
              Pre-commissioning & Oil Processing
            </option>
            <option value="Oil, Gas & High-Pressure Pipelines (28'')">
              Oil, Gas & High-Pressure Pipelines (28'')
            </option>
            <option value="Heavy Civil Engineering & Desert Workover Platforms">
              Heavy Civil Engineering
            </option>
            <option value="Industrial Maintenance & Shutdown Services">
              Industrial Maintenance
            </option>
            <option value="Heavy Machinery & Equipment Rental">
              Heavy Machinery Rental
            </option>
            <option value="Other Technical Project Inquiry">
              Other Inquiry
            </option>
          </select>
        </div>
      </div>

      {/* Row 3: Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className={labelClass}>
            {t.contact.form.email} *
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="contact@enterprise.com"
            className={getInputClass('email', inputClass)}
            onBlur={(e) => {
              setTouched(t => ({ ...t, email: true }));
              setEmailValid(e.target.value ? validateEmail(e.target.value) : null);
            }}
          />
        </div>
        <div>
          <label className={labelClass}>
            {t.contact.form.phone} *
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="+213 6XX XX XX XX"
            className={getInputClass('phone', inputClass)}
            onBlur={(e) => {
              setTouched(t => ({ ...t, phone: true }));
              setPhoneValid(e.target.value ? validatePhone(e.target.value) : null);
            }}
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label className={labelClass}>
          {t.contact.form.message} *
        </label>
        <textarea
          name="message"
          required
          minLength={10}
          rows={3}
          placeholder="Scope of work, project location, technical specifications..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Attachments */}
      <div>
        <label className={labelClass}>
          {t.contact.form.attachments}
        </label>
        <div className="relative rounded-xl border border-dashed border-[rgba(10,12,13,0.12)] hover:border-[var(--color-accent)] p-5 text-center cursor-pointer transition-colors bg-[var(--color-paper)]">
          <input
            type="file"
            multiple
            accept=".pdf,.jpg,.jpeg,.png,.webp,.docx,.doc,.zip"
            onChange={handleFileChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <div className="flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[var(--color-accent)]/10 flex items-center justify-center">
              <Upload className="w-4 h-4 text-[var(--color-accent)]" />
            </div>
            <span className="text-sm text-[var(--color-ink)] font-medium">
              Déposer les spécifications, plans ou RFQ
            </span>
            <span className="text-[10px] text-[var(--color-mist)] font-mono tracking-wider">
              PDF · CAD · JPG · DOCX · ZIP (MAX 10 MB)
            </span>
          </div>
        </div>

        {selectedFiles.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {selectedFiles.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-[var(--color-paper)] text-sm"
              >
                <div className="flex items-center gap-2 truncate">
                  <FileText className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                  <span className="truncate">{file.name}</span>
                  <span className="text-[10px] text-[var(--color-mist)] font-mono">
                    ({(file.size / 1024).toFixed(0)} KB)
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-[var(--color-mist)] hover:text-[var(--color-accent)] p-1 cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Submit row */}
      <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="text-[10px] text-[var(--color-mist)] font-mono tracking-[0.12em] max-w-xs leading-relaxed">
          Les données transmises sont strictement confidentielles et réservées à la Direction Commerciale SARL TAMMA.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn-premium w-full sm:w-auto disabled:opacity-50 cursor-pointer"
        >
          {submitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{t.contact.form.submitting}</span>
            </>
          ) : (
            <>
              <span>{t.contact.form.submitButton}</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}
