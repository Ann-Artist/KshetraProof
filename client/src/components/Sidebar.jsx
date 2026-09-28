import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Map,
  Grid2x2,
  Crosshair,
  TriangleAlert,
  MessageSquareWarning,
  ClipboardCheck,
  RadioTower,
  FileText,
  LogOut,
  Landmark,
  ShieldCheck,
  UserCheck
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar = ({ conflictCount = 2, objectionCount = 1 }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const isOfficer = user?.role === 'officer' || user?.role === 'admin';
  const isSurveyor = user?.role === 'surveyor' || user?.role === 'admin';

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Village Map', path: '/map', icon: Map },
    { label: 'Parcels', path: '/parcels', icon: Grid2x2 },
    ...(isSurveyor ? [{ label: 'Boundary Capture', path: '/boundary-capture', icon: Crosshair }] : []),
    { label: 'Conflicts', path: '/conflicts', icon: TriangleAlert, badge: conflictCount },
    { label: 'Objections', path: '/objections', icon: MessageSquareWarning, badge: objectionCount },
    ...(isOfficer ? [{ label: 'Officer Review', path: '/reviews', icon: ClipboardCheck }] : []),
    { label: 'Devices', path: '/devices', icon: RadioTower },
    { label: 'Survey Reports', path: '/reports/parcels/P-101', icon: FileText }
  ];

  return (
    <aside className="w-64 bg-forest-950 text-white flex flex-col justify-between p-4 contour-bg rounded-r-3xl shrink-0 min-h-screen">
      <div>
        {/* Logo Tile */}
        <div className="flex items-center gap-3 px-3 py-3 mb-6 bg-forest-900/80 rounded-2xl border border-forest-800">
          <div className="w-10 h-10 rounded-xl bg-tint-wheat text-forest-950 flex items-center justify-center font-bold shadow-sm">
            <Landmark className="w-5 h-5 text-forest-950" />
          </div>
          <div>
            <h1 className="font-bold text-base tracking-tight leading-none text-white">KshetraProof</h1>
            <span className="text-[11px] font-mono text-brand-400 mt-1 block">SIH26010 Resurvey</span>
          </div>
        </div>

        {/* Village Indicator */}
        <div className="px-3 py-2 mb-4 bg-forest-900/40 rounded-xl border border-forest-800/60 flex items-center justify-between text-xs">
          <span className="text-ink-400">Target Village:</span>
          <span className="font-bold text-harvest-400">Rampur (VIL-001)</span>
        </div>

        {/* Navigation */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                    isActive
                      ? 'bg-harvest-400 text-forest-950 shadow-md font-bold'
                      : 'text-ink-300 hover:bg-forest-800 hover:text-white'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="bg-harvest-400 text-forest-950 text-[10px] font-bold font-mono px-2 py-0.5 rounded-md shadow-sm">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Info & Logout */}
      <div className="pt-4 border-t border-forest-800">
        <div className="bg-forest-900/60 p-3 rounded-2xl border border-forest-800 mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-brand-500 text-forest-950 font-bold flex items-center justify-center text-xs">
              {user?.name ? user.name[0] : 'U'}
            </div>
            <div className="overflow-hidden">
              <span className="font-semibold text-xs text-white block truncate">{user?.name || 'Sunil Varma'}</span>
              <span className="text-[10px] text-brand-400 capitalize font-mono block">Role: {user?.role || 'surveyor'}</span>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-red-300 hover:bg-red-950/40 border border-red-900/30 transition"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
