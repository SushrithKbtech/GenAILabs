import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Dumbbell, Menu, X, Instagram, Twitter, Facebook, User, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const isActive = (path: string) => location.pathname === path ? 'text-brand-500' : 'text-slate-300 hover:text-white';

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-brand-950 text-slate-50 font-sans selection:bg-brand-600 selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <Dumbbell className="h-8 w-8 text-brand-600 group-hover:rotate-12 transition-transform" />
              <span className="font-display font-bold text-2xl tracking-tighter uppercase">Fit<span className="text-brand-600">Forge</span></span>
            </Link>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <Link to="/" className={`font-medium transition-colors ${isActive('/')}`}>Home</Link>
              <Link to="/programs" className={`font-medium transition-colors ${isActive('/programs')}`}>Programs</Link>
              <Link to="/transformations" className={`font-medium transition-colors ${isActive('/transformations')}`}>Results</Link>
              <Link to="/blog" className={`font-medium transition-colors ${isActive('/blog')}`}>Blog</Link>
              <Link to="/contact" className={`font-medium transition-colors ${isActive('/contact')}`}>Contact</Link>
              
              {user ? (
                <div className="flex items-center gap-4">
                    {user.role === 'admin' ? (
                        <Link to="/admin" className="text-brand-500 font-bold uppercase text-sm hover:text-white">Admin Dashboard</Link>
                    ) : (
                        <span className="text-slate-300 text-sm">Hi, {user.name.split(' ')[0]}</span>
                    )}
                    <button onClick={handleLogout} className="text-slate-400 hover:text-white transition-colors" title="Logout">
                        <LogOut size={20} />
                    </button>
                    <Link to="/book" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-sm font-bold font-display uppercase tracking-wide transition-all transform hover:-translate-y-0.5">
                        Book Now
                    </Link>
                </div>
              ) : (
                <div className="flex items-center gap-6">
                    <Link to="/login" className="font-bold uppercase text-sm text-slate-300 hover:text-white">Login</Link>
                    <Link to="/book" className="bg-brand-600 hover:bg-brand-700 text-white px-6 py-2 rounded-sm font-bold font-display uppercase tracking-wide transition-all transform hover:-translate-y-0.5">
                        Start Now
                    </Link>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button onClick={toggleMenu} className="md:hidden p-2 text-slate-300 hover:text-white">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-brand-950 border-b border-slate-800">
            <div className="px-4 pt-2 pb-6 flex flex-col gap-4">
              <Link to="/" onClick={toggleMenu} className="block py-2 text-slate-300 hover:text-white font-medium">Home</Link>
              <Link to="/programs" onClick={toggleMenu} className="block py-2 text-slate-300 hover:text-white font-medium">Programs</Link>
              <Link to="/transformations" onClick={toggleMenu} className="block py-2 text-slate-300 hover:text-white font-medium">Results</Link>
              <Link to="/blog" onClick={toggleMenu} className="block py-2 text-slate-300 hover:text-white font-medium">Blog</Link>
              
              {user ? (
                  <>
                    {user.role === 'admin' && (
                        <Link to="/admin" onClick={toggleMenu} className="block py-2 text-brand-500 font-bold">Admin Dashboard</Link>
                    )}
                    <button onClick={handleLogout} className="block py-2 text-left text-slate-300 hover:text-white font-medium">Logout</button>
                  </>
              ) : (
                  <Link to="/login" onClick={toggleMenu} className="block py-2 text-slate-300 hover:text-white font-medium">Login</Link>
              )}
              
              <Link to="/book" onClick={toggleMenu} className="block w-full text-center bg-brand-600 py-3 rounded-sm font-bold uppercase">
                  {user ? 'Book Session' : 'Start Transformation'}
              </Link>
            </div>
          </div>
        )}
      </nav>

      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 pt-16 pb-8 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Dumbbell className="h-6 w-6 text-brand-600" />
                <span className="font-display font-bold text-xl tracking-tighter uppercase">Fit<span className="text-brand-600">Forge</span></span>
              </div>
              <p className="text-slate-400 mb-6">Forging elite physiques and resilient mindsets through data-driven coaching and proven science.</p>
              <div className="flex gap-4">
                <a href="https://instagram.com/fitforge" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 transition-colors"><Instagram size={18} /></a>
                <a href="https://twitter.com/fitforge" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 transition-colors"><Twitter size={18} /></a>
                <a href="https://facebook.com/fitforge" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-full hover:bg-brand-600 transition-colors"><Facebook size={18} /></a>
              </div>
            </div>
            
            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wide">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/programs" className="hover:text-brand-500 transition-colors">Training Programs</Link></li>
                <li><Link to="/transformations" className="hover:text-brand-500 transition-colors">Success Stories</Link></li>
                <li><Link to="/about" className="hover:text-brand-500 transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-brand-500 transition-colors">Contact</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wide">Support</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link to="/faq" className="hover:text-brand-500 transition-colors">FAQ</Link></li>
                <li><Link to="/terms" className="hover:text-brand-500 transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-brand-500 transition-colors">Privacy Policy</Link></li>
                <li>
                    {user ? (
                        <button onClick={handleLogout} className="hover:text-brand-500 transition-colors text-left">Logout</button>
                    ) : (
                        <Link to="/login" className="hover:text-brand-500 transition-colors">Login</Link>
                    )}
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-display font-bold text-lg mb-6 text-white uppercase tracking-wide">Newsletter</h4>
              <p className="text-slate-400 mb-4">Get training tips and nutrition guides weekly.</p>
              <div className="flex gap-2">
                <input type="email" placeholder="Enter email" className="bg-slate-800 border border-slate-700 text-white px-4 py-2 rounded-sm w-full focus:outline-none focus:border-brand-600" />
                <button className="bg-brand-600 px-4 py-2 rounded-sm font-bold hover:bg-brand-700 transition-colors">JOIN</button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} FitForge Performance. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};