import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Users, DollarSign, Calendar, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export const AdminDashboard: React.FC = () => {
  const { data } = useCMS();

  const stats = [
    { title: 'Active Clients', value: '42', icon: Users, change: '+12%' },
    { title: 'Monthly Revenue', value: '$12,450', icon: DollarSign, change: '+8%' },
    { title: 'Pending Bookings', value: data.bookings.filter(b => b.status === 'pending').length.toString(), icon: Calendar, change: '0%' },
    { title: 'Site Visits', value: '1,203', icon: TrendingUp, change: '+24%' },
  ];

  const chartData = [
    { name: 'Mon', leads: 4 },
    { name: 'Tue', leads: 7 },
    { name: 'Wed', leads: 5 },
    { name: 'Thu', leads: 12 },
    { name: 'Fri', leads: 8 },
    { name: 'Sat', leads: 3 },
    { name: 'Sun', leads: 2 },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-slate-950 p-6 rounded-lg border border-slate-800">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 bg-brand-900/20 rounded-lg">
                <stat.icon className="text-brand-600" size={24} />
              </div>
              <span className={`text-sm font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-slate-500'}`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-slate-400 text-sm font-medium uppercase tracking-wide">{stat.title}</h3>
            <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart */}
        <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Lead Generation (Last 7 Days)</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '4px' }}
                  itemStyle={{ color: '#f1f5f9' }}
                  cursor={{fill: '#1e293b'}}
                />
                <Bar dataKey="leads" fill="#e11d48" radius={[4, 4, 0, 0]} barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-slate-950 p-6 rounded-lg border border-slate-800">
          <h3 className="text-lg font-bold text-white mb-6">Recent Booking Requests</h3>
          <div className="space-y-4">
            {data.bookings.slice(0, 4).map(booking => (
              <div key={booking.id} className="flex items-center justify-between p-4 bg-slate-900 rounded-md border border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-400">
                    {booking.clientName.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{booking.clientName}</p>
                    <p className="text-xs text-slate-500">{booking.serviceId === 's1' ? 'Personal Training' : 'Consultation'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-1 text-xs font-bold uppercase rounded-sm ${
                    booking.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                    booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    {booking.status}
                  </span>
                  <p className="text-xs text-slate-500 mt-1">{booking.date}</p>
                </div>
              </div>
            ))}
            {data.bookings.length === 0 && <p className="text-slate-500 text-sm">No bookings yet.</p>}
          </div>
        </div>
      </div>
    </div>
  );
};