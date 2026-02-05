
import React, { useState } from 'react';
import { ShoppingBag, Search, Tag, Check, Package } from 'lucide-react';
import { MarketItem } from '../types';

const STORE_ITEMS: MarketItem[] = [
  { id: 'i1', name: 'Glitch Cloak', price: 1200, category: 'Cosmetic', rarity: 'Legendary', color: 'purple' },
  { id: 'i2', name: 'Anti-Grav Wings', price: 850, category: 'Aura', rarity: 'Epic', color: 'indigo' },
  { id: 'i3', name: 'Void Walkers', price: 400, category: 'Trail', rarity: 'Rare', color: 'blue' },
  { id: 'i4', name: 'Neon Blade', price: 2500, category: 'Tool', rarity: 'Legendary', color: 'red' },
  { id: 'i5', name: 'Cyber Pet', price: 1800, category: 'Pet', rarity: 'Epic', color: 'emerald' },
  { id: 'i6', name: 'Prism Visor', price: 150, category: 'Head', rarity: 'Common', color: 'slate' },
];

interface Props {
  currency: number;
  inventory: MarketItem[];
  onPurchase: (item: MarketItem) => void;
}

const Marketplace: React.FC<Props> = ({ currency, inventory, onPurchase }) => {
  const [view, setView] = useState<'store' | 'inventory'>('store');
  const ownedIds = new Set(inventory.map(i => i.id));

  return (
    <div className="h-full flex flex-col p-6 space-y-6 overflow-y-auto">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-orbitron font-bold tracking-tight">Marketplace</h1>
          <p className="text-slate-400">Manage your assets and acquire new equipment.</p>
        </div>
        <div className="flex bg-slate-900 rounded-xl p-1 border border-slate-800">
           <button onClick={() => setView('store')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'store' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-200'}`}>Store</button>
           <button onClick={() => setView('inventory')} className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${view === 'inventory' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-200'}`}>Inventory ({inventory.length})</button>
        </div>
      </div>

      {view === 'store' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {STORE_ITEMS.map((item) => (
            <div key={item.id} className={`bg-slate-900/50 border rounded-3xl p-5 transition-all group ${ownedIds.has(item.id) ? 'border-green-500/30' : 'border-slate-800 hover:border-slate-700'}`}>
              <div className="h-40 bg-slate-950 rounded-2xl mb-4 flex items-center justify-center relative">
                 <Tag size={40} className={`text-${item.color}-500/30`} />
                 <div className="absolute top-3 right-3 px-2 py-1 bg-slate-900 rounded text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.rarity}</div>
              </div>
              <h4 className="font-bold text-lg mb-1">{item.name}</h4>
              <p className="text-xs text-slate-500 mb-4">{item.category}</p>
              <div className="flex items-center justify-between">
                 <span className="font-bold text-slate-300">{item.price} AET</span>
                 {ownedIds.has(item.id) ? (
                   <div className="flex items-center gap-1 text-green-400 font-bold text-xs"><Check size={16} /> OWNED</div>
                 ) : (
                   <button 
                     onClick={() => onPurchase(item)}
                     disabled={currency < item.price}
                     className={`p-2 rounded-lg transition-all ${currency >= item.price ? 'bg-indigo-600 hover:bg-indigo-500 text-white' : 'bg-slate-800 text-slate-600 cursor-not-allowed'}`}
                   >
                     <ShoppingBag size={18} />
                   </button>
                 )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex-1">
          {inventory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
               <Package size={60} className="mb-4 opacity-20" />
               <p className="font-bold">Your inventory is empty.</p>
               <button onClick={() => setView('store')} className="text-indigo-400 hover:underline mt-2">Go to the Store</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {inventory.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="bg-indigo-950/20 border border-indigo-500/20 rounded-3xl p-5">
                   <div className="h-32 bg-slate-950 rounded-2xl mb-4 flex items-center justify-center"><Package size={30} className="text-indigo-400" /></div>
                   <h4 className="font-bold">{item.name}</h4>
                   <span className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">{item.category} • {item.rarity}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Marketplace;
