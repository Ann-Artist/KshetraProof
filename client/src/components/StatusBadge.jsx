import React from 'react';

const STATUS_MAP = {
  verified: { label: 'Verified', bg: 'bg-[#DDF1E3]', text: 'text-[#1B6B3C]', dot: 'bg-[#2F9E5B]' },
  approved: { label: 'Approved', bg: 'bg-[#D2EFE2]', text: 'text-[#135A41]', dot: 'bg-[#1F7A5A]' },
  pending: { label: 'Pending', bg: 'bg-[#FBEFC6]', text: 'text-[#7A5800]', dot: 'bg-[#D9A21B]' },
  conflict: { label: 'Area Mismatch', bg: 'bg-[#FCE5D2]', text: 'text-[#9A4A10]', dot: 'bg-[#D9782F]' },
  disputed: { label: 'Disputed', bg: 'bg-[#F8DDDA]', text: 'text-[#9B2222]', dot: 'bg-[#C23B3B]' },
  government: { label: 'Government Land', bg: 'bg-[#E9E2F3]', text: 'text-[#563B85]', dot: 'bg-[#7B5EA7]' },
  field_visit: { label: 'Field Visit Required', bg: 'bg-[#D6ECF5]', text: 'text-[#17627E]', dot: 'bg-[#2B8FB3]' },
  submitted: { label: 'Submitted', bg: 'bg-[#DCE8F6]', text: 'text-[#1F4F8A]', dot: 'bg-[#2F6FB5]' },
  under_review: { label: 'Under Review', bg: 'bg-[#FBEFC6]', text: 'text-[#7A5800]', dot: 'bg-[#D9A21B]' },
  resolved: { label: 'Resolved', bg: 'bg-[#DDF1E3]', text: 'text-[#1B6B3C]', dot: 'bg-[#2F9E5B]' },
  rejected: { label: 'Rejected', bg: 'bg-[#F8DDDA]', text: 'text-[#9B2222]', dot: 'bg-[#C23B3B]' }
};

export const StatusBadge = ({ status = 'pending', customLabel = null, variant = 'soft', className = '' }) => {
  const config = STATUS_MAP[status] || STATUS_MAP.pending;
  const label = customLabel || config.label;

  if (variant === 'chip') {
    return (
      <span className={`inline-flex items-center gap-1.5 rounded-md border border-ink-300 bg-white px-2 h-6 text-[11px] font-medium text-ink-900 ${className}`}>
        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
        {label}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 h-6 text-xs font-semibold ${config.bg} ${config.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {label}
    </span>
  );
};

export default StatusBadge;
