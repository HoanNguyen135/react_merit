import { Action, Actions } from '@/components/ai-elements/actions';
import {
  Conversation,
  ConversationContent,
  ConversationEmptyState,
  ConversationScrollButton,
} from '@/components/ai-elements/conversation';
import { Loader } from '@/components/ai-elements/loader';
import { Message, MessageContent, MessageAvatar } from '@/components/ai-elements/message';
import {
  PromptInput,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputToolbar,
} from '@/components/ai-elements/prompt-input';
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from '@/components/ai-elements/reasoning';
import { Response } from '@/components/ai-elements/response';
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from '@/components/ai-elements/sources';
import { Suggestion, Suggestions } from '@/components/ai-elements/suggestion';
import { useChat, useEcho } from '@merit-systems/echo-react-sdk';
import { CopyIcon, MessageSquare } from 'lucide-react';
import { Fragment, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { EchoAccount } from './components/echo-account-react';


const suggestions = [
  'What is a merit project?',
  'Who are Merit Systems Investors and Backers?',
  'How to join the Merit project?',
];

const ChatBotDemo = () => {
  const [input, setInput] = useState('');
  const { messages, sendMessage, status } = useChat();

  const { user } = useEcho();

  const isSignedIn = user !== null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage({ text: input });
      setInput('');
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    sendMessage({ text: suggestion });
  };

  return (
    <div
      className="mx-auto flex h-full max-w-4xl flex-col p-6 rounded-3xl shadow-2xl border border-blue-200 dark:border-indigo-900"
      style={{
        background: 'rgba(255,255,255,0.6)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        animation: 'fadeIn 1s ease',
      }}
    >
      <div className="flex h-full min-h-0 flex-col">
        <Conversation className="relative min-h-0 w-full flex-1 overflow-hidden">
          <ConversationContent>
            <style>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              ::-webkit-scrollbar { width: 8px; background: transparent; }
              ::-webkit-scrollbar-thumb { background: #a5b4fc; border-radius: 4px; }
              .dark ::-webkit-scrollbar-thumb { background: #6366f1; }
            `}</style>
            {messages.length === 0 ? (
              <ConversationEmptyState
                icon={<MessageSquare className="size-12" />}
                title="No messages yet"
                description="Start a conversation to see messages here"
              />
            ) : (
              <AnimatePresence>
                {messages.map(message => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4, type: 'spring' }}
                  >
                  {message.role === 'assistant' &&
                    message.parts.filter(part => part.type === 'source-url')
                      .length > 0 && (
                      <Sources>
                        <SourcesTrigger
                          count={
                            message.parts.filter(
                              part => part.type === 'source-url'
                            ).length
                          }
                        />
                        {message.parts
                          .filter(part => part.type === 'source-url')
                          .map((part, i) => (
                            <SourcesContent key={`${message.id}-${i}`}>
                              <Source
                                key={`${message.id}-${i}`}
                                href={part.url}
                                title={part.url}
                              />
                            </SourcesContent>
                          ))}
                      </Sources>
                    )}
                  {message.parts.map((part, i) => {
                    switch (part.type) {
                      case 'text':
                        return (
                          <Fragment key={`${message.id}-${i}`}>
                            <Message from={message.role}>
                              <MessageAvatar
                                src={message.role === 'assistant' ? '/logo/dark.svg' : '/logo/light.svg'}
                                name={message.role === 'assistant' ? 'Bot' : 'Me'}
                                from={message.role}
                              />
                              <MessageContent from={message.role}>
                                <Response key={`${message.id}-${i}`}>
                                  {part.text}
                                </Response>
                              </MessageContent>
                            </Message>
                            {message.role === 'assistant' &&
                              i === messages.length - 1 && (
                                <Actions className="mt-2">
                                  <Action
                                    onClick={() =>
                                      navigator.clipboard.writeText(part.text)
                                    }
                                    label="Copy"
                                  >
                                    <CopyIcon className="size-3" />
                                  </Action>
                                </Actions>
                              )}
                          </Fragment>
                        );
                      case 'reasoning':
                        return (
                          <Reasoning
                            key={`${message.id}-${i}`}
                            className="w-full"
                            isStreaming={
                              status === 'streaming' &&
                              i === message.parts.length - 1 &&
                              message.id === messages[messages.length - 1].id
                            }
                          >
                            <ReasoningTrigger />
                            <ReasoningContent>{part.text}</ReasoningContent>
                          </Reasoning>
                        );
                      default:
                        return null;
                    }
                  })}
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
            {status === 'submitted' && <Loader />}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

  <div className="relative mt-4 flex-shrink-0 ">
          {!isSignedIn && (
            <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-background/60 backdrop-blur-sm">
              <EchoAccount />
            </div>
          )}

          <div
            className={
              !isSignedIn ? 'pointer-events-none select-none opacity-50' : ''
            }
            style={{
              background: 'linear-gradient(90deg, #e0e7ff 0%, #f3e8ff 50%, #ffe4e6 100%)',
              borderRadius: '1.5rem',
              boxShadow: '0 4px 24px 0 rgba(80, 80, 200, 0.08)',
              padding: '1.5rem',
            }}
          >
            <Suggestions>
              {suggestions.map(suggestion => (
                <Suggestion
                  key={suggestion}
                  onClick={handleSuggestionClick}
                  suggestion={suggestion}
                />
              ))}
            </Suggestions>
            <PromptInput onSubmit={handleSubmit} className="flex-shrink-0 mt-2">
              <PromptInputTextarea
                onChange={e => setInput(e.target.value)}
                value={input}
              />
              <PromptInputToolbar className="justify-end">
                <PromptInputSubmit disabled={!input} status={status} />
              </PromptInputToolbar>
            </PromptInput>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBotDemo;
