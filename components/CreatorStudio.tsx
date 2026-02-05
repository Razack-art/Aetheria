
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Code, 
  Layers, 
  PlayCircle, 
  BrainCircuit, 
  Send, 
  Save, 
  Share2,
  Trash2,
  Loader2
} from 'lucide-react';
import { getCreativeAssistance } from '../services/geminiService';

const CreatorStudio: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [project, setProject] = useState({
    name: "New Sandbox Map",
    type: "Environment",
    nodes: 12,
    lastSaved: "Just now"
  });

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory, isAiLoading]);

  const handleAiConsult = async () => {
    if (!prompt.trim()) return;
    
    const userMsg = prompt;
    setPrompt('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsAiLoading(true);

    const context = `Project: ${project.name}, Type: ${project.type}`;
    const aiResponse = await getCreativeAssistance(userMsg, context);
    
    setChatHistory(prev => [...prev, { role: 'ai', content: aiResponse }]);
    setIsAiLoading(false);
  };

  return (
    <div className="h-full flex overflow-hidden">
      {/* Tools Sidebar */}
      <div className="w-16 border-r border-slate-800 bg-slate-900/30 flex flex-col items-center py-6 gap-6">
        <button className="p-3 bg-indigo-600 rounded-xl text-white shadow-lg"><Box size={22} /></button>
        <button className="p-3 text-slate-500 hover:text-slate-200"><Code size={22} /></button>
        <button className="p-3 text-slate-500 hover:text-slate-200"><Layers size={22} /></button>
        <div className="flex-1"></div>
        <button className="p-3 text-slate-500 hover:text-red-400"><Trash2 size={22} /></button>
      </div>

      {/* Workspace Area */}
      <div className="flex-1 flex flex-col relative bg-[linear-gradient(rgba(15,23,42,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,0.8)_1px,transparent_1px)] bg-[size:40px_40px]">
        {/* Workspace Header */}
        <div className="h-16 border-b border-slate-800 bg-slate-900/80 backdrop-blur px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="font-bold">{project.name}</h2>
            <span className="text-xs bg-slate-800 px-2 py-1 rounded text-slate-400 uppercase tracking-widest">{project.type}</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
              <Save size={14} /> Save
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-sm font-medium transition-colors">
              <Share2 size={14} /> Publish
            </button>
            <button className="flex items-center gap-2 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 rounded-lg text-sm font-bold transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] ml-2">
              <PlayCircle size={14} /> TEST WORLD
            </button>
          </div>
        </div>

        {/* Viewport Placeholder */}
        <div className="flex-1 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <Box size={200} className="text-indigo-400" />
          </div>
          <div className="z-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400 text-sm mb-4">
              <BrainCircuit size={16} /> AI Co-pilot Active
            </div>
            <h3 className="text-2xl font-bold mb-2">Infinite Canvas Ready</h3>
            <p className="text-slate-500 max-w-sm">Use the tools on the left to add geometry, logic, and spawners, or ask the AI assistant for ideas.</p>
          </div>
        </div>
      </div>

      {/* AI Assistant Panel */}
      <div className="w-96 border-l border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col">
        <div className="p-4 border-b border-slate-800 bg-indigo-600/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <BrainCircuit size={18} className="text-indigo-400" />
          </div>
          <div>
            <h3 className="text-sm font-bold">Creative Assistant</h3>
            <div className="flex items-center gap-1.5">
               <div className="w-2 h-2 bg-green-500 rounded-full"></div>
               <span className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Gemini 3 Ready</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.length === 0 && (
            <div className="p-4 bg-slate-800/40 rounded-2xl border border-slate-700/50 text-sm text-slate-400 leading-relaxed">
              "Hey! Need help brainstorming a zero-gravity parkour course or a complex economy script? Just ask me!"
            </div>
          )}
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
              <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                msg.role === 'user' 
                  ? 'bg-indigo-600 text-white rounded-br-none' 
                  : 'bg-slate-800 text-slate-200 rounded-bl-none border border-slate-700'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isAiLoading && (
            <div className="flex items-center gap-2 text-slate-500 text-xs font-medium pl-2">
              <Loader2 size={14} className="animate-spin" />
              Thinking...
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900/80">
          <div className="relative">
            <textarea
              rows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleAiConsult())}
              placeholder="Ask for scripts or build ideas..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 pr-12 resize-none"
            />
            <button 
              onClick={handleAiConsult}
              disabled={!prompt.trim() || isAiLoading}
              className="absolute right-2 bottom-2 p-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white rounded-lg transition-all"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatorStudio;
