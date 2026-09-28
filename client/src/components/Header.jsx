import React, { useState } from 'react';
import { Search, Bell, Shield, User, ChevronDown, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import SimTag from './SimTag';
import { useNavigate } from 'react-router-dom';

export const Header = ({ title = 'Dashboard' }) => {
  const { user, switchRole } = useAuth();
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/parcels?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="bg-canvas border-b border-ink-200/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-40 backdrop-blur-md bg-canvas/90">
      {/* Title & Greeting */}
      <div>
        <h2 className="text-xl font-bold text-ink-900 tracking-tight">{title}</h2>
        <p className="text-xs text-ink-500 flex items-center gap-1.5 mt-0.5">
          <span>Namaste, <strong className="text-forest-950">{user?.name}</strong></span>
          <span className="text-ink-300">•</span>
          <span className="font-medium text-brand-700">Rampur Survey Resurvey Demo</span>
        </p>
      </div>

      {/* Search & Actions */}
      <div className="flex items-center gap-3">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative w-64 sm:w-72">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search parcel (e.g. P-101), owner..."
            className="w-full h-10 rounded-full bg-white px-4 pl-9 text-xs text-ink-900 placeholder:text-ink-500 border border-ink-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
          <Search className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
        </form>

        {/* Global Demo Tag */}
        <SimTag label="Demo Build" />

        {/* Role Switcher Pill */}
        <div className="relative">
          <button
            onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            className="btn bg-forest-950 text-white text-xs h-10 px-3 rounded-full hover:bg-forest-800 shadow-sm flex items-center gap-2"
          >
            <Shield className="w-3.5 h-3.5 text-brand-400" />
            <span className="capitalize font-semibold">{user?.role || 'surveyor'}</span>
            <ChevronDown className="w-3.5 h-3.5 text-ink-300" />
          </button>

          {roleMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-float border border-ink-200 p-2 z-50 text-xs">
              <span className="px-2 py-1 text-[10px] font-bold text-ink-400 uppercase tracking-wider block">Switch Persona</span>
              {[
                { role: 'surveyor', label: 'Field Surveyor' },
                { role: 'officer', label: 'Revenue Officer' },
                { role: 'admin', label: 'System Admin' },
                { role: 'citizen', label: 'Landholder / Citizen' }
              ].map((item) => (
                <button
                  key={item.role}
                  onClick={() => {
                    switchRole(item.role);
                    setRoleMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-xl flex items-center justify-between font-medium transition ${
                    user?.role === item.role ? 'bg-brand-100 text-forest-950 font-bold' : 'hover:bg-ink-100 text-ink-700'
                  }`}
                >
                  <span>{item.label}</span>
                  {user?.role === item.role && <Check className="w-3.5 h-3.5 text-brand-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Bell */}
        <button className="w-10 h-10 rounded-full bg-white border border-ink-200 flex items-center justify-center text-ink-700 hover:bg-ink-100 relative shadow-sm">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
      </div>
    </header>
  );
};

export default Header;
