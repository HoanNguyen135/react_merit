import type { FC } from 'react';
import { EchoAccount } from '@/components/echo-account-react';
import { ThemeSwitcher } from '@/components/ui/theme-switcher';

interface HeaderProps {
  title?: string;
  className?: string;
}

const Header: FC<HeaderProps> = ({ title = 'My App', className = '' }) => {
  return (
    <header
      className={`border-b shadow-lg rounded-b-2xl bg-gradient-to-r from-blue-200 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-indigo-900 dark:to-slate-900 ${className}`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <h1 className="font-extrabold text-transparent text-3xl bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 dark:from-indigo-300 dark:via-purple-400 dark:to-pink-300 drop-shadow-lg">{title}</h1>
          </div>

          <nav className="flex items-center space-x-4">
            <ThemeSwitcher />
            <EchoAccount />
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
