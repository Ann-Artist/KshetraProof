import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Landmark, ArrowRight, ShieldCheck, Lock, Mail, Compass } from 'lucide-react';
import SimTag from '../components/SimTag';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('surveyor@demo.com');
  const [password, setPassword] = useState('demo123');
  const [role, setRole] = useState('surveyor');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password, role);
    setLoading(false);
    navigate('/dashboard');
  };

  const setDemoCredentials = (roleType) => {
    if (roleType === 'surveyor') {
      setEmail('surveyor@demo.com');
      setRole('surveyor');
    } else if (roleType === 'officer') {
      setEmail('officer@demo.com');
      setRole('officer');
    } else {
      setEmail('admin@demo.com');
      setRole('admin');
    }
  };

  return (
    <div className="min-h-screen bg-backdrop flex items-center justify-center p-4 font-sans">
      <div className="bg-forest-900 p-2 sm:p-3 rounded-3xl shadow-2xl max-w-4xl w-full border border-forest-800">
        <div className="bg-white rounded-[24px] overflow-hidden grid grid-cols-1 md:grid-cols-2 shadow-card">
          
          {/* Left Hero (Contour Dark Theme) */}
          <div className="contour-bg p-8 text-white flex flex-col justify-between relative overflow-hidden">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-tint-wheat text-forest-950 flex items-center justify-center font-bold shadow-md">
                  <Landmark className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-xl font-bold tracking-tight">KshetraProof</h1>
                  <p className="text-xs font-mono text-brand-400">SIH26010 Land Survey Control</p>
                </div>
              </div>

              <div className="space-y-3 mt-8">
                <SimTag label="Prototype Proof of Concept" />
                <h2 className="text-2xl font-extrabold text-white leading-tight">
                  Survey. Verify.<br />Resolve.
                </h2>
                <p className="text-xs text-ink-300 leading-relaxed">
                  Software control and verification layer for hardware-assisted rural land resurvey with drone imagery, RTK/CORS GNSS, smart boundary markers, and officer review workflows.
                </p>
              </div>
            </div>

            {/* Decorative Survey Motifs */}
            <div className="my-8 p-4 rounded-2xl bg-forest-900/80 border border-forest-800 text-xs">
              <div className="flex items-center gap-2 text-harvest-400 font-semibold mb-1">
                <Compass className="w-4 h-4" />
                <span>Rampur Village Pilot (SIH Demonstration)</span>
              </div>
              <p className="text-[11px] text-ink-300">
                P-101 area mismatch scenario pre-loaded with simulated RTK boundary evidence & citizen objections.
              </p>
            </div>

            <p className="text-[11px] text-ink-400 font-mono">
              © 2026 KshetraProof System • Non-legal prototype
            </p>
          </div>

          {/* Right Form */}
          <div className="p-8 bg-white flex flex-col justify-between">
            <div>
              <div className="mb-6">
                <h3 className="text-xl font-bold text-ink-900">Sign In to Dashboard</h3>
                <p className="text-xs text-ink-500 mt-1">Select demo persona or enter credentials below.</p>
              </div>

              {/* Quick Persona Selector Pills */}
              <div className="mb-6">
                <label className="label">Quick Demo Role Selector</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setDemoCredentials('surveyor')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      role === 'surveyor'
                        ? 'bg-forest-950 text-white border-forest-950 shadow-sm'
                        : 'bg-ink-100 text-ink-700 border-ink-200 hover:bg-ink-200'
                    }`}
                  >
                    Surveyor
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoCredentials('officer')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      role === 'officer'
                        ? 'bg-forest-950 text-white border-forest-950 shadow-sm'
                        : 'bg-ink-100 text-ink-700 border-ink-200 hover:bg-ink-200'
                    }`}
                  >
                    Revenue Officer
                  </button>
                  <button
                    type="button"
                    onClick={() => setDemoCredentials('admin')}
                    className={`py-2 px-2 text-xs font-semibold rounded-xl border transition ${
                      role === 'admin'
                        ? 'bg-forest-950 text-white border-forest-950 shadow-sm'
                        : 'bg-ink-100 text-ink-700 border-ink-200 hover:bg-ink-200'
                    }`}
                  >
                    Admin
                  </button>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="label">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input pl-9"
                    />
                    <Mail className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                  </div>
                </div>

                <div>
                  <label className="label">Password</label>
                  <div className="relative">
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input pl-9"
                    />
                    <Lock className="w-4 h-4 text-ink-400 absolute left-3 top-3" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary h-11 text-sm font-semibold rounded-xl mt-2"
                >
                  {loading ? 'Authenticating...' : 'Sign In to Rampur Pilot'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Demo credentials box */}
              <div className="mt-6 p-3 rounded-xl bg-ink-100 border border-ink-200 text-xs">
                <span className="font-mono font-bold text-forest-950 block mb-1">Demo Credentials:</span>
                <div className="font-mono text-ink-600 space-y-0.5 text-[11px]">
                  <div>Surveyor: <span className="text-ink-900 font-semibold">surveyor@demo.com / demo123</span></div>
                  <div>Officer: <span className="text-ink-900 font-semibold">officer@demo.com / demo123</span></div>
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="text-[10px] text-ink-400 text-center mt-6 leading-tight">
              Disclaimer: Fictional demonstration data. Does not establish legal ownership or update official revenue records.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
