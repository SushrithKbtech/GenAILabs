import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { Dumbbell, Lock, Mail, ArrowLeft } from 'lucide-react';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      if (user.role === 'admin' && !from.includes('/admin')) {
        navigate('/admin', { replace: true });
      } else {
        navigate(from, { replace: true });
      }
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      // Navigation is handled by the useEffect above once user state updates
    } catch (err: any) {
      setError(err.message || 'Failed to log in');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-10" alt="Background" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-950 to-brand-950/80"></div>
      </div>

      <div className="relative z-10 w-full max-w-md bg-slate-900 border border-slate-800 p-8 rounded-lg shadow-2xl">
        <Link to="/" className="absolute top-4 left-4 text-slate-500 hover:text-white transition-colors">
            <ArrowLeft size={24} />
        </Link>
        <div className="text-center mb-8 mt-4">
           <Link to="/" className="inline-flex items-center gap-2 group mb-6">
              <Dumbbell className="h-8 w-8 text-brand-600" />
              <span className="font-display font-bold text-2xl tracking-tighter uppercase text-white">Fit<span className="text-brand-600">Forge</span></span>
            </Link>
            <h2 className="text-2xl font-bold text-white uppercase">Welcome Back</h2>
            <p className="text-slate-400">Sign in to access your dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white py-3 pl-10 pr-4 rounded-sm focus:border-brand-600 focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 text-slate-500" size={20} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 text-white py-3 pl-10 pr-4 rounded-sm focus:border-brand-600 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm bg-red-500/10 p-2 rounded border border-red-500/50">{error}</p>}

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-brand-600 text-white py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Don't have an account? <Link to="/signup" className="text-brand-500 font-bold hover:text-brand-400">Join Now</Link>
        </div>
        
        <div className="mt-6 pt-6 border-t border-slate-800 text-center">
             <p className="text-xs text-slate-600">Admin Demo: admin@fitforge.com / password</p>
        </div>
      </div>
    </div>
  );
};