'use client';
/**
 * Reusable password input with a visibility toggle.
 *
 * Defaults to hidden (type="password"). Clicking the eye icon switches
 * to type="text" so the user can verify what they typed. Switches back
 * after they tab away or click the eye again.
 *
 * Used everywhere in the site a password is entered: customer signin,
 * signup, password reset, admin login.
 *
 * Accessibility:
 *  - aria-label on the toggle button describes the current action
 *  - The toggle is a real <button> (not a div), focusable, keyboard-usable
 *  - Eye/eye-off SVGs are decorative (aria-hidden), the button has the label
 */
import { forwardRef, useState, InputHTMLAttributes } from 'react';

interface Props extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  /** Visible label above the field (optional — falls back to placeholder) */
  label?: string;
  /** Localized strings for the toggle button's aria-label */
  showLabel?: string; // e.g. "Show password" / "Shfaq fjalëkalimin"
  hideLabel?: string; // e.g. "Hide password" / "Fshih fjalëkalimin"
}

const PasswordInput = forwardRef<HTMLInputElement, Props>(function PasswordInput(
  { label, showLabel = 'Show password', hideLabel = 'Hide password', style, ...rest },
  ref
) {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      {label && (
        <label
          htmlFor={rest.id}
          style={{
            display: 'block',
            fontFamily: 'var(--font-sans)',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#888',
            marginBottom: 8,
          }}
        >
          {label}
        </label>
      )}
      <div style={{ position: 'relative' }}>
        <input
          ref={ref}
          type={visible ? 'text' : 'password'}
          style={{
            width: '100%',
            padding: '13px 44px 13px 16px', // right padding for the eye button
            border: '1px solid #e8e0d4',
            background: '#fff',
            fontFamily: 'var(--font-sans)',
            fontSize: 14,
            color: '#1a0a0a',
            boxSizing: 'border-box',
            outline: 'none',
            ...style,
          }}
          {...rest}
        />
        <button
          type="button"
          onClick={() => setVisible(v => !v)}
          aria-label={visible ? hideLabel : showLabel}
          aria-pressed={visible}
          style={{
            position: 'absolute',
            right: 8,
            top: '50%',
            transform: 'translateY(-50%)',
            width: 32,
            height: 32,
            border: 'none',
            background: 'transparent',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#888',
            padding: 0,
          }}
        >
          {visible ? (
            // Eye-off (closed) icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
              <line x1="1" y1="1" x2="23" y2="23" />
            </svg>
          ) : (
            // Eye (open) icon
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
});

export default PasswordInput;
