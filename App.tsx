
import React, { useState, useEffect } from 'react';
import { 
  Globe, 
  User, 
  Palette, 
  ShoppingBag, 
  Users, 
  Trophy, 
  Settings, 
  Menu,
  X,
  Zap,
  Star,
  Database,
  Terminal
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import WorldMap from './components/WorldMap';
import AvatarCustomizer from './components/AvatarCustomizer';
import CreatorStudio from './components/CreatorStudio';
import Marketplace from './components/Marketplace';
import SocialHub from './components/SocialHub';
import DataCenter from './components/DataCenter';
import Onboarding from './components/Onboarding';
import { AvatarState, MarketItem } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('explore');
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  
  const [avatar, setAvatar] = useState<AvatarState>(() => {
    const saved = localStorage.getItem('aetheria_profile');
    if (saved) return JSON.parse(saved);
    return {
      name: "",
      level: 1,
      currency: 1500,
      specialty: "",
      appearance: { hairColor: "#6366f1", skinTone: "#fecaca", outfit: "Default" },
      skills: { agility: 10, combat: 10, creativity: 10, social: 10 },
      inventory: [],
      worldDiscovery: {},
      chronicles: []
    };
  });

  useEffect(() => {
    if (avatar.name) {
      localStorage.setItem('aetheria_profile', JSON.stringify(avatar));
      setIsInitialized(true);
    }
  }, [avatar]);

  const addChronicle = (text: string, type: any = 'discovery') => {
    setAvatar(prev => ({
      ...prev,
      chronicles: [{
        id: Math.random().toString(36).substr(2, 9),
        timestamp: Date.now(),
        type,
        text
      }, ...prev.chronicles].slice(0, 50)
    }));
  };

  const handleVisit = (districtId: string, districtName: string) => {
    setAvatar(prev => ({
      ...prev,
      worldDiscovery: { ...prev.worldDiscovery, [districtId]: Date.now() }
    }));
    addChronicle(`You successfully entered the ${districtName} district.`, 'discovery');
  };

  const handlePurchase = (item: MarketItem) => {
    if (avatar.currency >= item.price) {
      setAvatar(prev => ({
        ...prev,
        currency: prev.currency - item.price,
        inventory: [...prev.inventory, item]
      }));
      addChronicle(`Acquired "${item.name}" from the central market.`, 'purchase');
    }
  };

  const menuItems = [
    { id: 'explore', label: 'My World', icon: Globe },
    { id: 'avatar', label: 'My Identity', icon: User },
    { id: 'market', label: 'Marketplace', icon: ShoppingBag },
    { id: 'social', label: 'My Chronicles', icon: Users },
    { id: 'creator', label: 'Creator Studio', icon: Palette },
    { id: 'seasons', label: 'Season Pass', icon: Trophy },
    { id: 'data', label: 'Data Core', icon: Database },
  ];

  if (!isInitialized && !avatar.name) {
    return <Onboarding onComplete={(initialData) => {
      const data = {
        ...initialData,
        chronicles: [{ id: 'init', timestamp: Date.now(), type: 'social', text: 'Identity synchronized. Welcome to Aetheria.' }]
      };
      setAvatar(data);
    }} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'explore': return <WorldMap userDiscovery={avatar.worldDiscovery} onVisit={handleVisit} />;
      case 'avatar': return <AvatarCustomizer avatar={avatar} setAvatar={setAvatar} />;
      case 'creator': return <CreatorStudio />;
      case 'market': return <Marketplace currency={avatar.currency} inventory={avatar.inventory} onPurchase={handlePurchase} />;
      case 'social': return <SocialHub chronicles={avatar.chronicles} name={avatar.name} specialty={avatar.specialty} />;
      case 'seasons': return <Dashboard avatar={avatar} />;
      case 'data': return <DataCenter avatar={avatar} setAvatar={setAvatar} />;
      default: return <WorldMap userDiscovery={avatar.worldDiscovery} onVisit={handleVisit} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-100 overflow-hidden">
      <aside className={`${isSidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 border-r border-slate-800 bg-slate-900/50 backdrop-blur-xl flex flex-col z-50`}>
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
            <Zap className="text-white w-5 h-5 fill-white" />
          </div>
          {isSidebarOpen && <span className="font-orbitron font-bold text-xl tracking-tighter bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">AETHERIA</span>}
        </div>
        <nav className="flex-1 px-3 space-y-1">
          {menuItems.map((item) => (
            <button key={item.id} onClick={() => setActiveTab(item.id)} className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeTab === item.id ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}>
              <item.icon size={22} />
              {isSidebarOpen && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 p-2">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${avatar.name}`} className="w-10 h-10 rounded-full border-2 border-indigo-500" alt="Avatar" />
            {isSidebarOpen && (
              <div className="flex flex-col">
                <span className="text-sm font-bold truncate">{avatar.name}</span>
                <span className="text-xs text-slate-400 font-bold">LVL {avatar.level}</span>
              </div>
            )}
          </div>
          <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="mt-4 w-full flex justify-center p-2 text-slate-500 hover:text-white">
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </aside>
      <main className="flex-1 relative flex flex-col overflow-hidden">
        <header className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-8 z-10 bg-gradient-to-b from-slate-950/80 to-transparent">
          <div className="flex items-center gap-2 bg-slate-900/60 backdrop-blur px-3 py-1 rounded-full border border-slate-700 pointer-events-auto">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">{avatar.currency.toLocaleString()} Aethels</span>
          </div>
          <div className="flex items-center gap-4 pointer-events-auto">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">{avatar.specialty || 'Pathfinder'}</span>
               <div className="w-32 h-1 bg-slate-800 rounded-full mt-1 overflow-hidden">
                 <div className="h-full bg-indigo-500" style={{width: '65%'}}></div>
               </div>
             </div>
             <button className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors">
               <Terminal size={20} />
             </button>
          </div>
        </header>
        <div className="w-full h-full pt-16">{renderContent()}</div>
      </main>
    </div>
  );
};

export default App;
