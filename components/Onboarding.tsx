
import React, { useState } from 'react';
import { Zap, Shield, Target, Cpu, Loader2 } from 'lucide-react';
import { AvatarState } from '../types';

interface Props {
  onComplete: (data: AvatarState) => void;
}

const Onboarding: React.FC<Props> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [isSyncing, setIsSyncing] = useState(false);

  const specialties = [
    { id: 'Vanguard', label: 'Vanguard', icon: Shield, desc: 'Frontline operations specialist.', stats: { combat: 25, agility: 15, creativity: 5, social: 5 } },
    { id: 'Architect', label: 'Architect', icon: Cpu, desc: 'World-building and tech masters.', stats: { combat: 5, agility: 5, creativity: 30, social: 10 } },
    { id: 'Envoy', label: 'Envoy', icon: Target, desc: 'Trade and social community leaders.', stats: { combat: 5, agility: 10, creativity: 10, social: 25 } },
  ];

  const handleComplete = () => {
    setIsSyncing(true);
    const selected = specialties.find(s => s.id === specialty) || specialties[0];
    
    setTimeout(() => {
      onComplete({
        name,
        level: 1,
        currency: 1500,
        specialty: selected.label,
        appearance: {
          hairColor: "#6366f1",
          skinTone: "#fecaca",
          outfit: selected.label
        },
        skills: selected.stats,
        inventory: [],
        worldDiscovery: {},
        chronicles: []
      });
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-slate-950 flex items-center justify-center p-6 z-[100]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none"></div>
      <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-[2.5rem] p-10 shadow-2xl overflow-hidden">
        {isSyncing ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Loader2 size={48} className="text-indigo-500 animate-spin mb-6" />
            <h2 className="text-2xl font-orbitron font-bold mb-2">Syncing Neural Link</h2>
            <p className="text-slate-400">Uploading identity profile to Aetheria Core...</p>
          </div>
        ) : (
          <>
            <div className="mb-8">
              <Zap size={32} className="text-indigo-500 mb-6 fill-indigo-500" />
              <h1 className="text-3xl font-orbitron font-bold mb-2">Identity Initialization</h1>
              <p className="text-slate-400 text-sm">Your actions are your data. Define your origin to begin.</p>
            </div>
            {step === 0 ? (
              <div className="space-y-6">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter unique alias..." className="w-full bg-slate-950 border border-slate-800 rounded-2xl px-6 py-4 text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
                <button disabled={name.length < 3} onClick={() => setStep(1)} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 rounded-2xl font-bold transition-all shadow-lg">NEXT</button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 gap-3">
                  {specialties.map(s => (
                    <button key={s.id} onClick={() => setSpecialty(s.id)} className={`flex items-center gap-4 p-4 rounded-2xl border-2 transition-all text-left ${specialty === s.id ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 hover:border-slate-700'}`}>
                      <div className={`p-3 rounded-xl ${specialty === s.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'}`}><s.icon size={20} /></div>
                      <div><h4 className="font-bold text-sm">{s.label}</h4><p className="text-[10px] text-slate-500">{s.desc}</p></div>
                    </button>
                  ))}
                </div>
                <button disabled={!specialty} onClick={handleComplete} className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold transition-all shadow-lg">INITIALIZE LINK</button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Onboarding;
