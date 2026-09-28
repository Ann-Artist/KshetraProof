import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, X, ShieldAlert } from 'lucide-react';

export const ConfirmDialog = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm Decision',
  confirmVariant = 'primary',
  requireComment = true
}) => {
  const [comment, setComment] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(comment);
    setComment('');
  };

  const btnClass =
    confirmVariant === 'danger'
      ? 'bg-parcel-disputed text-white hover:bg-red-700'
      : confirmVariant === 'accent'
      ? 'bg-brand-500 text-forest-950 hover:bg-brand-600'
      : 'bg-forest-950 text-white hover:bg-forest-800';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-forest-950/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl max-width-lg w-full max-w-md p-6 shadow-float border border-ink-200">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center ${confirmVariant === 'danger' ? 'bg-red-100 text-red-600' : 'bg-brand-100 text-brand-700'}`}>
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-ink-900">{title}</h3>
              <p className="text-xs text-ink-500">Authorized Action Required</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-ink-500 hover:bg-ink-100">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-ink-600 mt-4 leading-relaxed">{message}</p>

        <form onSubmit={handleSubmit} className="mt-4">
          {requireComment && (
            <div>
              <label className="label">Officer Review Notes / Justification *</label>
              <textarea
                required
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Enter mandatory field verification remarks, dispute reason, or legal reference..."
                className="w-full rounded-xl bg-ink-100 p-3 text-sm border border-ink-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          )}

          <div className="mt-3 p-3 rounded-xl bg-harvest-100/70 border border-harvest-400/40 text-[11px] text-harvest-700 leading-normal">
            <span className="font-bold">Audit Trail Notice:</span> This action will update the official parcel record status and generate an immutable version history entry timestamped with your identity.
          </div>

          <div className="mt-6 flex items-center justify-end gap-3">
            <button type="button" onClick={onClose} className="btn btn-ghost">
              Cancel
            </button>
            <button type="submit" className={`btn ${btnClass}`}>
              {confirmText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ConfirmDialog;
