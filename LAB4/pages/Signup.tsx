import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { Dumbbell, Lock, Mail, User, ArrowLeft, Info } from 'lucide-react';

export const Signup: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setInfoMessage('');
    try {
        await signup(name, email, password);
        // If the code reaches here, signup didn't throw.
        // If the user isn't immediately logged in (user effect above doesn't trigger), 
        // it means email confirmation is likely required.
        setInfoMessage('Account created! Please check your email to confirm your account before logging in.');
    } catch (err: any) {
        setError(err.message || 'Failed to create account');
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-950 flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1920" className="w-full h-full object-cover opacity-10" alt="Background" />
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
            <h2 className="text-2xl font-bold text-white uppercase">Start Your Journey</h2>
            <p className="text-slate-400">Create an account to track your progress</p>
        </div>

        {infoMessage ? (
          <div className="bg-brand-900/30 border border-brand-600 rounded-lg p-6 text-center">
            <Info className="mx-auto text-brand-500 mb-4" size={48} />
            <h3 className="text-white font-bold text-xl mb-2">Check Your Email</h3>
            <p className="text-slate-300 mb-6">{infoMessage}</p>
            <Link to="/login" className="block w-full bg-brand-600 text-white py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-brand-700 transition-colors">
              Go to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 text-slate-500" size={20} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-700 text-white py-3 pl-10 pr-4 rounded-sm focus:border-brand-600 focus:outline-none"
                  placeholder="John Doe"
                />
              </div>
            </div>

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
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>
        )}

        {!infoMessage && (
          <div className="mt-6 text-center text-sm text-slate-400">
            Already have an account? <Link to="/login" className="text-brand-500 font-bold hover:text-brand-400">Sign In</Link>
          </div>
        )}
      </div>
    </div>
  );
};