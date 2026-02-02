import React, { useState, useRef, useEffect } from 'react';
import {
  Pencil,
  Image as ImageIcon,
  User,
  Code,
  Plus,
  Paperclip,
  Mic,
  Globe,
  SendHorizontal,
  X,
  Bot,
  User as UserIcon
} from 'lucide-react';

// 1. Skeleton Loader Component
const LoadingSkeleton = () => (
  <div className="flex gap-4 w-full max-w-3xl mx-auto mt-6 animate-pulse px-4">
    <div className="w-8 h-8 bg-gray-200 dark:bg-gray-800 rounded-full shrink-0"></div>
    <div className="space-y-3 w-full">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6"></div>
    </div>
  </div>
);

// 2. Message Bubble Component
const MessageBubble = ({ role, content, attachment }) => {
  const isUser = role === 'user';
  return (
    <div className={`flex gap-4 w-full max-w-3xl mx-auto px-4 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
          <Bot className="w-5 h-5 text-white" />
        </div>
      )}
      
      <div className={`flex flex-col gap-2 max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        {attachment && (
           <div className="text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded-lg mb-1 border border-gray-200 dark:border-gray-700">
              📎 {attachment.name}
           </div>
        )}
        <div className={`px-4 py-3 rounded-2xl whitespace-pre-wrap ${
          isUser 
            ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-tr-sm' 
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {content}
        </div>
      </div>

      {isUser && (
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center shrink-0">
          <UserIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
        </div>
      )}
    </div>
  );
};

// 3. Main Component
const MainContent = ({ onSendMessage, messages = [], isLoading = false }) => {
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [attachment, setAttachment] = useState(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const scrollRef = useRef(null);
  const MAX_CHARS = 3000;

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const actions = [
    { icon: Pencil, label: 'Write copy', prompt: 'Write a marketing copy for ', color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' },
    { icon: ImageIcon, label: 'Image generation', prompt: 'Generate an image of ', color: 'bg-sky-100 dark:bg-sky-900/30 text-sky-600 dark:text-sky-400' },
    { icon: User, label: 'Create avatar', prompt: 'Create a user persona for ', color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' },
    { icon: Code, label: 'Write code', prompt: 'Write a React component that ', color: 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' },
  ];

  const handleActionClick = (promptPrefix) => {
    setInputValue(promptPrefix);
    textareaRef.current?.focus();
  };

  const handleAttachClick = () => fileInputRef.current?.click();
  
  const handleFileChange = (e) => {
    if (e.target.files?.[0]) setAttachment(e.target.files[0]);
  };

  const handleVoiceClick = () => {
    if (!('webkitSpeechRecognition' in window)) return alert('Browser not supported');
    if (isRecording) return setIsRecording(false);

    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = 'en-US';
    recognition.onstart = () => setIsRecording(true);
    recognition.onend = () => setIsRecording(false);
    recognition.onresult = (event) => setInputValue(prev => prev + ' ' + event.results[0][0].transcript);
    recognition.start();
  };

  const handleBrowseClick = () => {
    setInputValue(prev => prev + " [Browse Web] ");
    textareaRef.current?.focus();
  };

  const handleSubmit = async () => {
    if (!inputValue.trim() && !attachment) return;
    await onSendMessage(inputValue, attachment);
    setInputValue('');
    setAttachment(null);
    if (textareaRef.current) textareaRef.current.style.height = '48px';
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  // Logic to determine what to show
  const showWelcomeScreen = messages.length === 0 && !isLoading;

  return (
    <div className="flex flex-col h-full relative bg-white dark:bg-gray-950">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Scrollable Content Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-800 pb-40"
      >
        {showWelcomeScreen ? (
          /* --- Welcome Screen (Only shows when no messages) --- */
          <div className="flex flex-col items-center justify-center min-h-full p-6">
            <div className="max-w-2xl w-full space-y-12">
              <div className="text-center space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white tracking-tight">Welcome to AskMe</h1>
                <p className="text-lg text-gray-500 dark:text-gray-400">"Get started by giving AskMe a task, and Chat can do the rest."</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {actions.map((action) => (
                  <button
                    key={action.label}
                    onClick={() => handleActionClick(action.prompt)}
                    className="group flex items-center justify-between p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${action.color}`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <span className="font-semibold text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{action.label}</span>
                    </div>
                    <div className="text-gray-300 dark:text-gray-600 group-hover:text-gray-400 dark:group-hover:text-gray-400 transition-colors"><Plus className="w-5 h-5" /></div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* --- Chat History & Skeleton (Shows when there are messages) --- */
          <div className="flex flex-col gap-6 pt-6">
            {messages.map((msg, index) => (
              <MessageBubble 
                key={index} 
                role={msg.role} 
                content={msg.content} 
                attachment={msg.attachment} 
              />
            ))}
            {isLoading && <LoadingSkeleton />}
          </div>
        )}
      </div>

      {/* Input Area (Fixed to bottom) */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent dark:from-gray-950 dark:via-gray-950 dark:to-transparent pt-12">
        <div className="max-w-3xl mx-auto">
          {attachment && (
             <div className="mb-2 flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-2 rounded-lg w-fit">
                <span className="text-xs text-gray-600 dark:text-gray-300 truncate max-w-[200px]">{attachment.name}</span>
                <button onClick={() => setAttachment(null)} className="text-gray-500 hover:text-red-500"><X size={14}/></button>
             </div>
          )}
          <div className={`bg-white dark:bg-gray-900 border transition-colors duration-200 ${inputValue || isRecording ? 'border-blue-500/50 dark:border-blue-500/50 ring-4 ring-blue-500/10' : 'border-gray-200 dark:border-gray-800'} rounded-2xl shadow-lg dark:shadow-gray-900/50 p-4`}>
            <textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message AskMe..."
              maxLength={MAX_CHARS}
              className="w-full min-h-[48px] max-h-[200px] resize-none bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400 text-base"
            ></textarea>
            <div className="flex flex-col sm:flex-row items-center justify-between mt-2 pt-2 border-t border-gray-100 dark:border-gray-800 gap-2">
              <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto no-scrollbar">
                <button onClick={handleAttachClick} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <Paperclip className="w-4 h-4" /> <span className="hidden sm:inline">Attach</span>
                </button>
                <button onClick={handleVoiceClick} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${isRecording ? 'text-red-500 bg-red-50 dark:bg-red-900/20' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'}`}>
                  <Mic className={`w-4 h-4 ${isRecording ? 'animate-pulse' : ''}`} /> <span className="hidden sm:inline">{isRecording ? 'Listening...' : 'Voice'}</span>
                </button>
                <button onClick={handleBrowseClick} className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors whitespace-nowrap">
                  <Globe className="w-4 h-4" /> <span className="hidden sm:inline">Browse</span>
                </button>
              </div>
              <div className="flex items-center gap-4 ml-auto sm:ml-0">
                <div className="text-xs font-medium text-gray-400">{inputValue.length}/{MAX_CHARS}</div>
                <button onClick={handleSubmit} disabled={(!inputValue.trim() && !attachment) || isLoading} className={`p-2 rounded-xl transition-all duration-200 ${inputValue.trim() || attachment ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 transform hover:scale-105' : 'bg-gray-100 dark:bg-gray-800 text-gray-400 cursor-not-allowed'}`}>
                  <SendHorizontal className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;