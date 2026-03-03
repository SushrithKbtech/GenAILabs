import React from 'react';
import { useCMS } from '../../context/CMSContext';
import { Check, X, Clock } from 'lucide-react';

export const AdminBookings: React.FC = () => {
  const { data, updateBookingStatus } = useCMS();

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Booking Management</h2>
        <p className="text-slate-400">Review and manage incoming session requests.</p>
      </div>

      <div className="bg-slate-950 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-900 border-b border-slate-800">
                <th className="p-4 text-xs font-bold uppercase text-slate-500">Client</th>
                <th className="p-4 text-xs font-bold uppercase text-slate-500">Service</th>
                <th className="p-4 text-xs font-bold uppercase text-slate-500">Date/Time</th>
                <th className="p-4 text-xs font-bold uppercase text-slate-500">Status</th>
                <th className="p-4 text-xs font-bold uppercase text-slate-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {data.bookings.map(booking => (
                <tr key={booking.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-white">{booking.clientName}</div>
                    <div className="text-sm text-slate-500">{booking.email}</div>
                  </td>
                  <td className="p-4 text-slate-300">
                     {data.services.find(s => s.id === booking.serviceId)?.title || 'Unknown Service'}
                  </td>
                  <td className="p-4 text-slate-300">
                    <div>{booking.date}</div>
                    <div className="text-sm text-slate-500">{booking.time}</div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-sm text-xs font-bold uppercase ${
                      booking.status === 'confirmed' ? 'bg-green-500/10 text-green-500' :
                      booking.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                      'bg-amber-500/10 text-amber-500'
                    }`}>
                      {booking.status === 'pending' && <Clock size={12} />}
                      {booking.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    {booking.status === 'pending' && (
                      <>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'confirmed')}
                          className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500/20 rounded-sm transition-colors"
                          title="Confirm"
                        >
                          <Check size={16} />
                        </button>
                        <button 
                          onClick={() => updateBookingStatus(booking.id, 'cancelled')}
                          className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 rounded-sm transition-colors"
                          title="Reject"
                        >
                          <X size={16} />
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {data.bookings.length === 0 && (
            <div className="p-8 text-center text-slate-500">No bookings found.</div>
          )}
        </div>
      </div>
    </div>
  );
};