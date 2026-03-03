import React from 'react';
import { HashRouter as Router, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { AdminLayout } from './components/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute'; // Import ProtectedRoute
import { Home } from './pages/Home';
import { Booking } from './pages/Booking';
import { Programs } from './pages/Programs';
import { Blog } from './pages/Blog';
import { BlogPost } from './pages/BlogPost';
import { Transformations } from './pages/Transformations';
import { Contact } from './pages/Contact';
import { About } from './pages/About';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminContent } from './pages/admin/AdminContent';
import { AdminBookings } from './pages/admin/AdminBookings';
import { AdminBlog } from './pages/admin/AdminBlog';
import { AdminSettings } from './pages/admin/AdminSettings';

// Wrapper for public routes to apply the public navbar/footer
const PublicLayout = () => (
  <Layout>
    <Outlet />
  </Layout>
);

// Wrapper for admin routes
const AdminRoutes = () => {
    const { user, isLoading } = useAuth();
    
    if (isLoading) return <div className="h-screen bg-slate-900 flex items-center justify-center text-white">Loading...</div>;

    if (!user || user.role !== 'admin') {
        return <Navigate to="/login" replace />;
    }

    return (
        <AdminLayout>
            <Outlet />
        </AdminLayout>
    );
};

const App: React.FC = () => {
  return (
    <CMSProvider>
      <AuthProvider>
        <Router>
            <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/programs" element={<Programs />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/transformations" element={<Transformations />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/about" element={<About />} />
                <Route path="/faq" element={<Navigate to="/contact" replace />} />
                <Route path="/privacy" element={<div className="pt-32 text-center text-white pb-32"><h1>Privacy Policy</h1><p className="text-slate-400 mt-4">We respect your privacy. Data is used solely for coaching.</p></div>} />
                <Route path="/terms" element={<div className="pt-32 text-center text-white pb-32"><h1>Terms of Service</h1><p className="text-slate-400 mt-4">Standard coaching terms apply. No refunds after 7 days.</p></div>} />
                
                {/* Protected Client Routes */}
                <Route path="/book" element={
                  <ProtectedRoute>
                    <Booking />
                  </ProtectedRoute>
                } />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin" element={<AdminRoutes />}>
                <Route index element={<AdminDashboard />} />
                <Route path="content" element={<AdminContent />} />
                <Route path="bookings" element={<AdminBookings />} />
                <Route path="blog" element={<AdminBlog />} />
                <Route path="settings" element={<AdminSettings />} />
            </Route>
            </Routes>
        </Router>
      </AuthProvider>
    </CMSProvider>
  );
};

export default App;