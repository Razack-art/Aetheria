
import React from 'react';
import { AvatarState } from '../types';
import { Sparkles, Sword, Wind, Hammer, MessageCircle } from 'lucide-react';

interface Props {
  avatar: AvatarState;
  setAvatar: React.Dispatch<React.SetStateAction<AvatarState>>;
}

const AvatarCustomizer: React.FC<Props> = ({ avatar, setAvatar }) => {
  const outfits = ["Cyber Runner", "Zenith Plate", "Spiritweaver", "Wasteland Scav"];
  const hairColors = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#ec4899", "#f8fafc"];

  const updateAvatar = (field: string, value: any) => {
    setAvatar(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [field]: value
      }
    }));
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-orbitron font-bold tracking-tight">Personal Identity</h1>
          <p className="text-slate-400">Evolve your appearance and specialize your skills.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Preview Container */}
        <div className="relative group bg-slate-900 rounded-[2.5rem] border border-slate-800 overflow-hidden flex items-center justify-center p-12 min-h-[500px]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent"></div>
          
          <div className="relative z-10 scale-[2.5] transform transition-transform group-hover:scale-[2.6]">
            <img 
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar.name}&backgroundColor=transparent&hairColor=${avatar.appearance.hairColor.replace('#', '')}&top=${avatar.appearance.outfit === 'Cyber Runner' ? 'shortHair' : 'longHair'}`} 
              alt="Avatar Preview"
              className="w-32 h-32"
            />
          </div>

          {/* Stats Overlay */}
          <div className="absolute bottom-8 left-8 right-8 grid grid-cols-4 gap-4">
             <div className="bg-slate-950/80 backdrop-blur border border-slate-700 p-3 rounded-2xl flex flex-col items-center">
                <Sword size={18} className="text-red-400 mb-1" />
                <span className="text-xs text-slate-500">Combat</span>
                <span className="font-bold">{avatar.skills.combat}</span>
             </div>
             <div className="bg-slate-950/80 backdrop-blur border border-slate-700 p-3 rounded-2xl flex flex-col items-center">
                <Wind size={18} className="text-blue-400 mb-1" />
                <span className="text-xs text-slate-500">Agility</span>
                <span className="font-bold">{avatar.skills.agility}</span>
             </div>
             <div className="bg-slate-950/80 backdrop-blur border border-slate-700 p-3 rounded-2xl flex flex-col items-center">
                <Hammer size={18} className="text-amber-400 mb-1" />
                <span className="text-xs text-slate-500">Creative</span>
                <span className="font-bold">{avatar.skills.creativity}</span>
             </div>
             <div className="bg-slate-950/80 backdrop-blur border border-slate-700 p-3 rounded-2xl flex flex-col items-center">
                <MessageCircle size={18} className="text-emerald-400 mb-1" />
                <span className="text-xs text-slate-500">Social</span>
                <span className="font-bold">{avatar.skills.social}</span>
             </div>
          </div>
        </div>

        {/* Customization Options */}
        <div className="space-y-8">
          <section className="bg-slate-900/50 rounded-3xl p-6 border border-slate-800">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-400" />
              Appearance Modifiers
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-400 block mb-3 uppercase tracking-widest font-semibold">Current Outfit</label>
                <div className="grid grid-cols-2 gap-2">
                  {outfits.map(outfit => (
                    <button
                      key={outfit}
                      onClick={() => updateAvatar('outfit', outfit)}
                      className={`py-3 px-4 rounded-xl border-2 transition-all ${
                        avatar.appearance.outfit === outfit 
                          ? 'border-indigo-500 bg-indigo-500/10 text-white' 
                          : 'border-slate-800 hover:border-slate-700 text-slate-400'
                      }`}
                    >
                      {outfit}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-3 uppercase tracking-widest font-semibold">Hair Color Core</label>
                <div className="flex flex-wrap gap-3">
                  {hairColors.map(color => (
                    <button
                      key={color}
                      onClick={() => updateAvatar('hairColor', color)}
                      className={`w-10 h-10 rounded-full border-2 transition-all p-1 ${
                        avatar.appearance.hairColor === color ? 'border-white scale-110 shadow-lg' : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-400 block mb-1 uppercase tracking-widest font-semibold">Identity Sync Name</label>
                <input 
                  type="text" 
                  value={avatar.name}
                  onChange={(e) => setAvatar(prev => ({...prev, name: e.target.value}))}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
                  placeholder="Enter alias..."
                />
              </div>
            </div>
          </section>

          <div className="flex gap-4">
             <button className="flex-1 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-500 font-bold transition-all shadow-lg">
               SAVE CHANGES
             </button>
             <button className="flex-1 py-4 rounded-2xl border border-slate-700 hover:bg-slate-800 font-bold transition-all">
               RESET DEFAULT
             </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvatarCustomizer;
