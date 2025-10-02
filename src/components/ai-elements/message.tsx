import type { UIMessage } from 'ai';
import type { ComponentProps, HTMLAttributes } from 'react';
import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type MessageProps = HTMLAttributes<HTMLDivElement> & {
  from: UIMessage['role'];
};

export const Message = ({ className, from, ...props }: MessageProps) => (
  <div
    className={cn(
      'group flex w-full items-end justify-end gap-2 py-4',
      from === 'user' ? 'is-user' : 'is-assistant flex-row-reverse justify-end',
      '[&>div]:max-w-[80%]',
      className
    )}
    {...props}
  />
);

export type MessageContentProps = HTMLAttributes<HTMLDivElement>;

export const MessageContent = ({
  children,
  className,
  from,
  ...props
}: MessageContentProps & { from?: string }) => {
  const [reaction, setReaction] = useState<string | null>(null);
  const isAssistant = from === 'assistant';
  return (
    <div
      className={cn(
        'flex flex-col gap-2 overflow-hidden rounded-2xl px-6 py-4 text-foreground text-base shadow-lg',
  'group-[.is-user]:bg-gradient-to-r group-[.is-user]:from-blue-500 group-[.is-user]:to-purple-500 group-[.is-user]:text-white',
  'group-[.is-assistant]:bg-gradient-to-r group-[.is-assistant]:from-gray-100 group-[.is-assistant]:to-blue-100 group-[.is-assistant]:text-gray-800',
  'border border-border',
  'dark:group-[.is-user]:!bg-white dark:group-[.is-user]:!text-black',
        className
      )}
      {...props}
    >
      {children}
      {isAssistant && (
        <div className="flex gap-3 mt-3 justify-end">
          {['👍', '👎', '😆'].map(r => (
            <button
              key={r}
              className={cn(
                'transition-all duration-200 rounded-full p-2 text-xl shadow hover:scale-110 hover:bg-blue-200 focus:outline-none',
                reaction === r ? 'bg-blue-500 text-white scale-110 ring-2 ring-blue-400' : 'bg-white text-blue-500'
              )}
              onClick={() => setReaction(r)}
              aria-label={`React ${r}`}
            >
              {r}
            </button>
          ))}
        </div>
      )}
      {isAssistant && reaction && (
        <span className="text-xs mt-2 text-right text-blue-500 font-semibold animate-pulse">
          You reacted: {reaction}
        </span>
      )}
    </div>
  );
};

export type MessageAvatarProps = ComponentProps<typeof Avatar> & {
  src: string;
  name?: string;
};

export const MessageAvatar = ({
  src,
  name,
  className,
  from,
  ...props
}: MessageAvatarProps & { from?: string }) => {
  if (from === 'assistant') {
    return (
      <motion.div
        initial={{ boxShadow: '0 0 0px #39ff14' }}
        animate={{ boxShadow: ['0 0 0px #39ff14', '0 0 16px #39ff14', '0 0 0px #39ff14'] }}
        transition={{ duration: 2, repeat: Infinity }}
        className={cn('rounded-full', className)}
      >
        <Avatar className="size-8 ring-2 ring-[#39ff14]">
          <AvatarImage alt="Bot" src={src} />
          <AvatarFallback>🤖</AvatarFallback>
        </Avatar>
      </motion.div>
    );
  }
  return (
    <Avatar className={cn('size-8 ring-1 ring-border', className)} {...props}>
      <AvatarImage alt="" className="mt-0 mb-0" src={src} />
      <AvatarFallback>{name?.slice(0, 2) || 'ME'}</AvatarFallback>
    </Avatar>
  );
};
