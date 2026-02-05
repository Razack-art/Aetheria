
import React, { useState, useEffect } from 'react';
import { AvatarState } from '../types';
import { Trophy, Star, Gift, Clock, ArrowRight, BrainCircuit, Loader2 } from 'lucide-react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { getPlayerBriefing } from '../services/geminiService';

interface Props {
  avatar: AvatarState;
}

const Dashboard: React.FC<Props> = ({ avatar }) => {
  const [briefing, setBriefing] = useState<string>('');
  const [isLoadingBriefing, setIsLoadingBriefing] = useState(true);

  useEffect(() => {
    const fetchBriefing = async () => {
      setIsLoadingBriefing(true);
      const text = await getPlayerBriefing(avatar);
      setBriefing(text);
      setIsLoadingBriefing(false);
    };
    fetchBriefing();
  }, [avatar.name, avatar.level]);

  const data = [
    { name: 'Combat', val: avatar.skills.combat },
    { name: 'Agility', val: avatar.skills.agility },
    { name: 'Creative', val: avatar.skills.creativity },
    { name: 'Social', val: avatar.skills.social },
  ];

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-orbitron font-bold tracking-tight">Status: Active</h1>
          <p className="text-slate-400">Welcome back, {avatar.name}. Synchronized with Season 4.</p>
        </div>
        <div className="bg-indigo-600 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-lg shadow-indigo-600/20">
          <Trophy size={20} className="text-white" />
          <div>
            <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest block">Global Rank</span>
            <span className="font-bold text-lg">LEVEL {avatar.level}</span>
          </div>
        </div>
      </div>

      {/* AI Personalized Briefing */}
      <section className="bg-indigo-950/30 border border-indigo-500/20 rounded-3xl p-6 relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
          <BrainCircuit size={80} className="text-indigo-400" />
        </div>
        <div className="flex items-start gap-4">
          <div className="mt-1">
            <BrainCircuit size={20} className="text-indigo-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-sm font-bold text-indigo-400 uppercase tracking-widest mb-2">Neural Link Intelligence Briefing</h3>
            {isLoadingBriefing ? (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <Loader2 size={14} className="animate-spin" />
                Analyzing real-time player telemetry...
              </div>
            ) : (
              <p className="text-slate-200 leading-relaxed italic">
                "{briefing}"
              </p>
            )}
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-slate-900/50 rounded-3xl p-8 border border-slate-800 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8">
               <Star size={100} className="text-indigo-500/10 rotate-12" />
             </div>
             <div className="relative z-10">
               <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                 <Gift size={22} className="text-indigo-400" />
                 Your Progression
               </h3>
               
               <div className="flex justify-between items-center mb-10 overflow-x-auto pb-4 gap-8">
                  {[avatar.level - 1, avatar.level, avatar.level + 1, avatar.level + 2].map((lv) => (
                    <div key={lv} className="flex flex-col items-center flex-shrink-0">
                       <div className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center mb-2 transition-all ${
                         lv <= avatar.level 
                          ? 'bg-indigo-500 border-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.5)]' 
                          : 'bg-slate-800 border-slate-700 text-slate-500'
                       }`}>
                          {lv <= avatar.level ? <Gift size={20} /> : <Clock size={20} />}
                       </div>
                       <span className={`text-xs font-bold ${lv === avatar.level ? 'text-indigo-400' : 'text-slate-500'}`}>LV {lv}</span>
                    </div>
                  ))}
               </div>

               <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden mb-2">
                 <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-500 w-[45%]" />
               </div>
               <div className="flex justify-between text-xs text-slate-500 font-bold uppercase tracking-widest">
                 <span>Current Data Flow: Stable</span>
                 <span className="text-indigo-400">45% to level {avatar.level + 1}</span>
               </div>
             </div>
          </section>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
             <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
                <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6">Actual Skill Metrics</h4>
                <div className="h-48 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data}>
                      <XAxis dataKey="name" hide />
                      <Tooltip 
                        contentStyle={{backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px'}}
                        itemStyle={{color: '#818cf8'}}
                      />
                      <Bar dataKey="val" fill="#6366f1" radius={[8, 8, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-4">
                   {data.map(d => (
                     <div key={d.name} className="flex justify-between items-center text-xs">
                       <span className="text-slate-500 font-medium">{d.name}</span>
                       <span className="font-bold">{d.val}</span>
                     </div>
                   ))}
                </div>
             </div>

             <div className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800 flex flex-col justify-between">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-4">Latest Achievement</h4>
                  <div className="flex gap-4">
                     <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center border border-amber-500/30">
                        <Trophy size={24} className="text-amber-400" />
                     </div>
                     <div>
                        <h5 className="font-bold">Neural Origin</h5>
                        <p className="text-xs text-slate-400">Successfully linked identity to the Aetheria Persistent World.</p>
                     </div>
                  </div>
                </div>
                <button className="mt-6 flex items-center justify-between w-full p-4 bg-slate-800 hover:bg-slate-700 rounded-2xl transition-all group">
                   <span className="text-sm font-bold">View My Full Profile</span>
                   <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
             </div>
          </div>
        </div>

        <div className="bg-slate-900/50 rounded-3xl border border-slate-800 flex flex-col p-6">
           <h3 className="font-bold mb-6">Personal Quest Log</h3>
           <div className="space-y-4">
              <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl">
                 <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-indigo-400 uppercase tracking-widest">Active Task</span>
                 </div>
                 <h5 className="font-bold mb-3">Earn { (avatar.level * 1000).toLocaleString() } Aethels</h5>
                 <div className="flex items-center justify-between">
                    <div className="w-32 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                       <div className="h-full bg-indigo-500" style={{ width: `${Math.min(100, (avatar.currency / (avatar.level * 1000)) * 100)}%` }} />
                    </div>
                    <span className="text-xs font-bold">{avatar.currency} / {avatar.level * 1000}</span>
                 </div>
              </div>
           </div>

           <div className="mt-auto pt-6">
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                 <p className="text-xs text-slate-400 leading-relaxed mb-3 italic">"Your data is your power. Every action in Aetheria is recorded as part of your persistent legacy."</p>
                 <span className="text-[10px] font-bold text-indigo-400 tracking-tighter">— DATA GUARDIAN</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
