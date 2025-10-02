import { useState } from 'react';

const languages = [
  { code: 'en', label: 'English' },
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'es', label: 'Español' },
  { code: 'fr', label: 'Français' },
  // Add more languages as needed
];

export function LanguageSwitcher({ onChange }: { onChange?: (code: string) => void }) {
  const [lang, setLang] = useState('en');

  const handleChange = (code: string) => {
    setLang(code);
    onChange?.(code);
    // Optionally, store in localStorage or context
    document.documentElement.lang = code;
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="font-semibold">Language:</span>
      <select
        value={lang}
        onChange={e => handleChange(e.target.value)}
        className="rounded px-2 py-1 border bg-background"
      >
        {languages.map(l => (
          <option key={l.code} value={l.code}>{l.label}</option>
        ))}
      </select>
    </div>
  );
}
