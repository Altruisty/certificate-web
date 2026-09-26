'use client'

const FIELD_GROUPS = [
  {
    group: 'Candidate',
    fields: [
      { label: 'Candidate Name', key: 'candidateName', placeholder: 'Full name' },
      { label: 'Domain / Role', key: 'domain', placeholder: 'e.g. Data Analytics' },
    ],
  },
  {
    group: 'Dates',
    fields: [
      { label: 'Letter Date', key: 'date', placeholder: 'DD-M-YY' },
      { label: 'Internship Start Date', key: 'startDate', placeholder: 'DD-M-YY' },
      { label: 'Duration', key: 'duration', placeholder: 'e.g. 1 month' },
    ],
  },
  {
    group: 'HR & Registration',
    fields: [
      { label: 'Registration ID', key: 'regId', placeholder: 'e.g. 1252025936' },
    ],
  },
]

export default function OfferForm({ fields, onChange }) {
  return (
    <div className="flex-1 overflow-hidden flex flex-col">
      <div className="flex-1 overflow-y-auto pr-2 flex flex-col gap-7">
        {FIELD_GROUPS.map(({ group, fields: groupFields }) => (
          <div key={group} className="flex flex-col gap-4">
            <div className="text-[11px] font-bold tracking-[0.14em] uppercase text-text-muted pb-1.5 border-b border-border/60">
              {group}
            </div>
            {groupFields.map(({ label, key, placeholder }) => (
              <div key={key} className="flex flex-col gap-2">
                <label
                  htmlFor={key}
                  className="text-[13px] font-medium text-text-secondary"
                >
                  {label}
                </label>
                <input
                  id={key}
                  type="text"
                  value={fields[key]}
                  onChange={(e) => onChange(key, e.target.value)}
                  placeholder={placeholder}
                  spellCheck={false}
                  autoComplete="off"
                  className="w-full bg-surface2 border border-border rounded-lg text-text-primary text-sm px-4 py-2.5 outline-none transition-all duration-200 focus:border-accent focus:ring-4 focus:ring-accent/15 hover:border-white/20 placeholder:text-text-muted/60"
                />
              </div>
            ))}
          </div>
        ))}

        <div className="mt-3">
          <p className="flex items-start gap-2 text-xs text-text-muted bg-white/[0.01] border border-dashed border-border rounded-lg p-3 leading-relaxed">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 shrink-0"
            >
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path
                d="M12 8v4M12 16h.01"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            All edits appear live in the preview panel
          </p>
        </div>
      </div>
    </div>
  )
}