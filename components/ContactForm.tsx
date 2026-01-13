// 改进的联系表单组件 - 带验证和错误处理
// 时间戳：2025-01-27

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Language, STRINGS } from '../types';
import { submitContactForm, ContactFormData } from '../utils/api';

interface ContactFormProps {
  language: Language;
  onSubmit?: (data: FormData) => Promise<void>;
}

interface FormData extends ContactFormData {}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({ language, onSubmit }) => {
  const t = STRINGS[language];
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // 名称验证
    if (!formData.name.trim()) {
      newErrors.name = language === 'en' ? 'Name is required' : '请输入姓名';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = language === 'en' ? 'Name must be at least 2 characters' : '姓名至少需要 2 个字符';
    }

    // 邮箱验证
    if (!formData.email.trim()) {
      newErrors.email = language === 'en' ? 'Email is required' : '请输入邮箱';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = language === 'en' ? 'Please enter a valid email address' : '请输入有效的邮箱地址';
    }

    // 主题验证
    if (!formData.subject.trim()) {
      newErrors.subject = language === 'en' ? 'Subject is required' : '请输入主题';
    } else if (formData.subject.trim().length < 3) {
      newErrors.subject = language === 'en' ? 'Subject must be at least 3 characters' : '主题至少需要 3 个字符';
    }

    // 消息验证
    if (!formData.message.trim()) {
      newErrors.message = language === 'en' ? 'Message is required' : '请输入消息';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = language === 'en' ? 'Message must be at least 10 characters' : '消息至少需要 10 个字符';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else {
        // 使用 API 工具函数提交表单 - 2025-01-27
        const result = await submitContactForm(formData);
        
        if (!result.success) {
          throw new Error(result.error || 'Failed to send message');
        }
      }

      setSubmitted(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : (language === 'en'
              ? 'Failed to send message. Please try again.'
              : '发送失败，请重试。')
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    // 清除对应字段的错误
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-center py-12">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
          <CheckCircle2 size={32} />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          {language === 'en' ? 'Message Sent!' : '消息已发送！'}
        </h3>
        <p className="text-slate-600 mb-6">
          {language === 'en'
            ? 'Thank you for contacting us. We will respond shortly.'
            : '感谢您的联系，我们会尽快回复。'}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setSubmitError(null);
          }}
          className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#FF6B35]"
        >
          {language === 'en' ? 'Send another message' : '发送另一条消息'}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {submitError && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-red-800">{submitError}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
            {t.formName}
          </label>
          <input
            id="name"
            type="text"
            value={formData.name}
            onChange={handleChange('name')}
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
              errors.name
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
            }`}
            aria-invalid={errors.name ? 'true' : 'false'}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
            {t.formEmail}
          </label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange('email')}
            className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                : 'border-slate-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
            }`}
            aria-invalid={errors.email ? 'true' : 'false'}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">
              {errors.email}
            </p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-2">
          {t.formSubject}
        </label>
        <input
          id="subject"
          type="text"
          value={formData.subject}
          onChange={handleChange('subject')}
          className={`w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 ${
            errors.subject
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
          }`}
          aria-invalid={errors.subject ? 'true' : 'false'}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
        />
        {errors.subject && (
          <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.subject}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">
          {t.formMessage}
        </label>
        <textarea
          id="message"
          rows={5}
          value={formData.message}
          onChange={handleChange('message')}
          className={`w-full px-4 py-3 rounded-lg border transition-all resize-none focus:outline-none focus:ring-2 ${
            errors.message
              ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
              : 'border-slate-200 focus:border-[#FF6B35] focus:ring-[#FF6B35]/20'
          }`}
          aria-invalid={errors.message ? 'true' : 'false'}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-black hover:bg-[#1a1a1a] disabled:bg-slate-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[#FF6B35] focus:ring-offset-2"
      >
        {isSubmitting ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>{language === 'en' ? 'Sending...' : '发送中...'}</span>
          </>
        ) : (
          <>
            {t.formSubmit}
            <Send size={18} />
          </>
        )}
      </button>
    </form>
  );
};

