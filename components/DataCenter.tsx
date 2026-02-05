
import React, { useState } from 'react';
import { Database, Download, Trash2, Save, AlertTriangle, RefreshCcw } from 'lucide-react';
import { AvatarState } from '../types';

interface Props {
  avatar: AvatarState;
  setAvatar: React.Dispatch<React.SetStateAction<AvatarState>>;
}

const DataCenter: React.FC<Props> = ({ avatar, setAvatar }) => {
  const [jsonText, setJsonText] = useState(JSON.stringify(avatar, null, 2));
  const [showConfirm, setShowConfirm] = useState(false);

  const handleUpdate = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setAvatar(parsed);
      alert('Data Core Synchronized Successfully.');
    } catch (e) {
      alert('Invalid JSON format. Sync failed.');
    }
  };

  const resetData = () => {
    localStorage.removeItem('aetheria_profile');
    window.location.reload();
  };

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div>
        <h1 className="text-3xl font-orbitron font-bold tracking-tight">Data Core Management</h1>
        <p className="text-slate-400">Access and modify your raw persistent identity data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 flex-1">
        <div className="lg:col-span-2 flex flex-col space-y-4">
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-3xl p-6 font-mono text-xs overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-800">
              <span className="text-indigo-400">PLAYER_TELEMETRY.JSON</span>
              <div className="flex gap-2">
                <button 
                  onClick={() => setJsonText(JSON.stringify(avatar, null, 2))}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-500"
                >
                  <RefreshCcw size={14} />
                </button>
              </div>
            </div>
            <textarea 
              value={jsonText}
              onChange={(e) => setJsonText(e.target.value)}
              className="flex-1 bg-transparent border-none focus:outline-none resize-none text-slate-300 w-full"
            />
          </div>
          <div className="flex gap-4">
            <button 
              onClick={handleUpdate}
              className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-bold flex items-center justify-center gap-2"
            >
              <Save size={18} /> SYNC DATA CORE
            </button>
            <button 
              onClick={() => {
                const blob = new Blob([jsonText], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `aetheria_profile_${avatar.name}.json`;
                a.click();
              }}
              className="px-8 py-4 bg-slate-800 hover:bg-slate-700 rounded-2xl font-bold flex items-center gap-2"
            >
              <Download size={18} /> EXPORT
            </button>
          </div>
        </div>

        <div className="space-y-6">
          <section className="bg-slate-900/50 border border-slate-800 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-400">
              <AlertTriangle size={18} /> Danger Zone
            </h3>
            <p className="text-sm text-slate-400 mb-6">Resetting your data core is irreversible. All progress, currency, and custom attributes will be purged.</p>
            
            {!showConfirm ? (
              <button 
                onClick={() => setShowConfirm(true)}
                className="w-full py-3 bg-red-950/30 border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <Trash2 size={16} /> RESET PROFILE
              </button>
            ) : (
              <div className="space-y-3">
                <button 
                  onClick={resetData}
                  className="w-full py-3 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold transition-all"
                >
                  CONFIRM PURGE
                </button>
                <button 
                  onClick={() => setShowConfirm(false)}
                  className="w-full py-3 bg-slate-800 text-slate-300 rounded-xl font-bold"
                >
                  CANCEL
                </button>
              </div>
            )}
          </section>

          <section className="bg-indigo-600/5 border border-indigo-500/20 rounded-3xl p-6">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Database size={18} className="text-indigo-400" /> Storage Stats
            </h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">Protocol</span>
                <span className="text-indigo-400 font-mono">Local_Storage_v4</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Payload Size</span>
                <span className="text-indigo-400 font-mono">{(jsonText.length / 1024).toFixed(2)} KB</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Status</span>
                <span className="text-green-400 font-mono">Persistent</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default DataCenter;
