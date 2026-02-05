
import React, { useState } from 'react';
import { District, DistrictType } from '../types';
import { MapPin, Users, Activity, Play, Clock } from 'lucide-react';

const DISTRICTS: District[] = [
  { id: 'u1', name: 'Neo-Oasis', type: DistrictType.URBAN, description: 'The pulsing heart of Aetheria. High-rise skyscrapers and neon markets.', color: 'indigo', icon: '🏙️' },
  { id: 'n1', name: 'Emerald Wilds', type: DistrictType.NATURAL, description: 'Vibrant forests with gravity-defying waterfalls and mythical flora.', color: 'emerald', icon: '🌲' },
  { id: 'f1', name: 'Zenith Prime', type: DistrictType.FUTURE, description: 'A station at the edge of the atmosphere. Experimental physics and zero-G.', color: 'purple', icon: '🚀' },
  { id: 'm1', name: 'Mythos Reach', type: DistrictType.FANTASY, description: 'Floating islands, ancient ruins, and magic-infused landscapes.', color: 'amber', icon: '🏰' }
];

interface Props {
  userDiscovery: Record<string, number>;
  onVisit: (id: string, name: string) => void;
}

const WorldMap: React.FC<Props> = ({ userDiscovery, onVisit }) => {
  const [selectedDistrict, setSelectedDistrict] = useState<District>(DISTRICTS[0]);

  const lastVisit = userDiscovery[selectedDistrict.id];

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div>
        <h1 className="text-3xl font-orbitron font-bold tracking-tight">World Discovery</h1>
        <p className="text-slate-400">Map your journey across the persistent districts of Aetheria.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {DISTRICTS.map((district) => (
            <button
              key={district.id}
              onClick={() => setSelectedDistrict(district)}
              className={`relative group h-64 rounded-3xl overflow-hidden border-2 transition-all ${
                selectedDistrict.id === district.id 
                  ? `border-${district.color}-500 shadow-xl` 
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <img src={`https://picsum.photos/seed/${district.id}/800/600`} className="absolute inset-0 w-full h-full object-cover opacity-40" alt={district.name} />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{district.icon}</span>
                  <h3 className="text-xl font-bold">{district.name}</h3>
                </div>
                {userDiscovery[district.id] ? (
                  <span className="text-xs text-indigo-400 font-bold flex items-center gap-1">
                    <Clock size={12} /> Visited {new Date(userDiscovery[district.id]).toLocaleDateString()}
                  </span>
                ) : (
                  <span className="text-xs text-slate-500 uppercase tracking-widest font-bold">Never visited</span>
                )}
              </div>
            </button>
          ))}
        </div>

        <div className="bg-slate-900/50 backdrop-blur rounded-3xl border border-slate-800 p-6 flex flex-col">
          <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2 bg-${selectedDistrict.color}-500/20 text-${selectedDistrict.color}-400 border border-${selectedDistrict.color}-500/30`}>
            {selectedDistrict.type}
          </div>
          <h2 className="text-2xl font-bold mb-3">{selectedDistrict.name}</h2>
          <p className="text-slate-400 text-sm leading-relaxed mb-6">{selectedDistrict.description}</p>

          <div className="space-y-4 mb-6">
            <h4 className="text-xs font-bold uppercase text-slate-500">Your Status</h4>
            <div className="p-4 bg-slate-950/50 rounded-2xl border border-slate-800">
              {lastVisit ? (
                <p className="text-sm text-slate-300">You are synchronized with this region's relay station.</p>
              ) : (
                <p className="text-sm text-slate-500">Neural link data for this sector is missing. Explore to synchronize.</p>
              )}
            </div>
          </div>

          <button 
            onClick={() => onVisit(selectedDistrict.id, selectedDistrict.name)}
            className="mt-auto w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg"
          >
            {lastVisit ? 'RE-ENTER SECTOR' : 'EXPLORE DISTRICT'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
