import { useEffect, useState } from 'react';

const themes = [
  { name: 'Light', className: '' },
  { name: 'Dark', className: 'dark' },
];

export function ThemeSwitcher() {
  const [theme, setTheme] = useState('');

  useEffect(() => {
    document.documentElement.classList.remove('dark', 'neon');
    if (theme) document.documentElement.classList.add(theme);
  }, [theme]);

  return (
    <div className="flex gap-4 items-center bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 rounded-xl px-4 py-2 shadow-lg">
      <span className="font-bold text-lg text-blue-600 drop-shadow">Theme</span>
      <div className="flex gap-2">
        {themes.map(t => (
          <button
            key={t.name}
            className={
              `relative px-4 py-2 rounded-full font-semibold transition-all duration-200 border-2 border-transparent ` +
              (theme === t.className
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105 border-blue-400'
                : 'bg-white text-blue-500 hover:bg-blue-100 hover:scale-105')
            }
            onClick={() => setTheme(t.className)}
            aria-label={`Switch to ${t.name} theme`}
          >
            {theme === t.className && (
              <span className="absolute left-2 top-2 animate-ping inline-flex h-3 w-3 rounded-full bg-blue-400 opacity-75"></span>
            )}
            {t.name}
          </button>
        ))}
      </div>
    </div>
  );
}

// Neon theme CSS can be added to index.css:
// .neon { background: #0f0c29; color: #39ff14; text-shadow: 0 0 8px #39ff14; }
