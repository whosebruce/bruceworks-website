import React, { useState } from 'react';

interface PhoneAndSmsConsentProps {
  idPrefix: string;
  phoneLabel?: string;
}

const DISCLOSURE_VERSION = '2026-07-17';

export const PhoneAndSmsConsent: React.FC<PhoneAndSmsConsentProps> = ({
  idPrefix,
  phoneLabel = 'Phone Number',
}) => {
  const [smsPreference, setSmsPreference] = useState('');
  const [preferenceRecordedAt, setPreferenceRecordedAt] = useState('');

  const phoneId = `${idPrefix}-phone`;
  const preferenceName = 'sms_preference';

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor={phoneId} className="mb-1.5 block text-sm font-semibold text-ink">
          {phoneLabel}
        </label>
        <input
          id={phoneId}
          name="phone"
          type="tel"
          required={smsPreference === 'yes'}
          className="field"
          placeholder="Best number to reach you"
        />
        <p className="mt-1 text-xs text-ink-3">
          Optional unless you choose to receive text messages.
        </p>
      </div>

      <fieldset className="panel p-4">
        <legend className="px-1 text-sm font-bold text-ink">SMS preference</legend>
        <p className="mb-3 text-sm text-ink-2">
          Please choose Yes or No. No option is selected for you.
        </p>
        <div className="space-y-3">
          <label className="flex cursor-pointer items-start gap-3 rounded-theme border-theme border-line p-3 text-sm text-ink hover:border-signal">
            <input
              type="radio"
              name={preferenceName}
              value="yes_informational_sms"
              required
              checked={smsPreference === 'yes'}
              onChange={() => {
                setSmsPreference('yes');
                setPreferenceRecordedAt(new Date().toISOString());
              }}
              className="mt-1 h-4 w-4 accent-[rgb(var(--c-signal))]"
            />
            <span><strong>Yes.</strong> I agree to receive informational text messages from Bruce Works LLC.</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-theme border-theme border-line p-3 text-sm text-ink hover:border-signal">
            <input
              type="radio"
              name={preferenceName}
              value="no_sms_calls_only"
              required
              checked={smsPreference === 'no'}
              onChange={() => {
                setSmsPreference('no');
                setPreferenceRecordedAt(new Date().toISOString());
              }}
              className="mt-1 h-4 w-4 accent-[rgb(var(--c-signal))]"
            />
            <span><strong>No.</strong> Do not text me. My number may be used for calls only.</span>
          </label>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-ink-3">
          If you select Yes, Bruce Works LLC may send informational text messages related to your inquiry,
          appointments, quotes, invoices, classes/events, and customer support. Message frequency varies.
          Message and data rates may apply. Reply HELP for help or STOP to opt out. Consent is not required
          to purchase services. Read our{' '}
          <a href="/privacy-policy/" className="font-semibold text-ink underline">
            Privacy Policy
          </a>{' '}
          and{' '}
          <a href="/sms-consent/#messaging-terms" className="font-semibold text-ink underline">
            Messaging Terms &amp; Conditions
          </a>.
        </p>
      </fieldset>

      <input type="hidden" name="sms_disclosure_version" value={DISCLOSURE_VERSION} />
      <input
        type="hidden"
        name="sms_source_page"
        value={typeof window !== 'undefined' ? window.location.href : ''}
      />
      <input type="hidden" name="sms_preference_recorded_at" value={preferenceRecordedAt} />
    </div>
  );
};
