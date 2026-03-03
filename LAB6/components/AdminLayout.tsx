import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  FileText, 
  Calendar, 
  Users, 
  Settings, 
  LogOut,
  PenTool
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
    { icon: PenTool, label: 'Content', path: '/admin/content' },
    { icon: Calendar, label: 'Bookings', path: '/admin/bookings' },
    { icon: FileText, label: 'Blog', path: '/admin/blog' },
    { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-slate-900 text-slate-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex-shrink-0 flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <span className="font-display font-bold text-xl tracking-tighter text-brand-500">FITFORGE ADMIN</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive 
                    ? 'bg-brand-600 text-white font-medium' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Icon size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <Link to="/" className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors">
            <LogOut size={20} />
            Back to Site
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center px-8 justify-between">
           <h1 className="text-xl font-semibold text-white">
             {navItems.find(i => i.path === location.pathname)?.label || 'Dashboard'}
           </h1>
           <div className="flex items-center gap-4">
             <div className="h-8 w-8 rounded-full bg-brand-600 flex items-center justify-center font-bold">A</div>
           </div>
        </header>
        <div className="flex-1 overflow-y-auto p-8 bg-slate-900">
          {children}
        </div>
      </main>
    </div>
  );
};