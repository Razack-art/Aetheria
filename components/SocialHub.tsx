
import React from 'react';
import { Shield, Bell, Zap, User, Clock, Star, ShoppingBag, MapPin } from 'lucide-react';
import { ActivityEntry } from '../types';

interface Props {
  chronicles: ActivityEntry[];
  name: string;
  specialty: string;
}

const SocialHub: React.FC<Props> = ({ chronicles, name, specialty }) => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'purchase': return <ShoppingBag size={16} className="text-amber-400" />;
      case 'discovery': return <MapPin size={16} className="text-indigo-400" />;
      case 'achievement': return <Star size={16} className="text-yellow-400" />;
      default: return <Zap size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div>
        <h1 className="text-3xl font-orbitron font-bold tracking-tight">Your Chronicles</h1>
        <p className="text-slate-400">The persistent record of your impact on the Aetheria universe.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8">
           <section className="bg-slate-900/50 rounded-[2rem] p-8 border border-slate-800 min-h-full">
             <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center">
                   <User size={24} className="text-white" />
                </div>
                <div>
                   <h3 className="text-xl font-bold">{name}'s History</h3>
                   <span className="text-xs text-indigo-400 font-bold uppercase tracking-widest">{specialty || 'Independent'} Agent</span>
                </div>
             </div>
             
             <div className="space-y-4">
               {chronicles.length === 0 ? (
                 <div className="text-center py-20 text-slate-600 italic">No historical data recorded yet.</div>
               ) : (
                 chronicles.map((entry) => (
                   <div key={entry.id} className="flex items-start gap-4 p-5 bg-slate-950/40 rounded-2xl border border-slate-800/50 group hover:border-indigo-500/30 transition-all">
                      <div className="mt-1 p-2 bg-slate-800 rounded-lg group-hover:bg-slate-700 transition-colors">
                        {getIcon(entry.type)}
                      </div>
                      <div className="flex-1">
                         <p className="text-sm text-slate-200 font-medium">{entry.text}</p>
                         <div className="flex items-center gap-2 mt-1">
                            <Clock size={12} className="text-slate-600" />
                            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">
                              {new Date(entry.timestamp).toLocaleString()}
                            </span>
                         </div>
                      </div>
                   </div>
                 ))
               )}
             </div>
           </section>
        </div>

        <div className="lg:col-span-4 space-y-6">
           <section className="bg-indigo-600/10 border border-indigo-500/20 rounded-3xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Shield size={18} /> Reputation Stats</h3>
              <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Total Exploits</span>
                    <span className="font-bold text-indigo-400">{chronicles.length}</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-400">Worlds Visited</span>
                    <span className="font-bold text-indigo-400">0</span>
                 </div>
              </div>
           </section>

           <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
              <h3 className="font-bold mb-4 flex items-center gap-2"><Bell size={18} /> Protocol Logs</h3>
              <p className="text-xs text-slate-500 leading-relaxed italic">
                "All user actions are hashed and stored in the persistent core. Your legacy cannot be erased."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SocialHub;
