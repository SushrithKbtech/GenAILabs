export interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  features: string[];
  image: string;
  category: 'training' | 'nutrition' | 'online';
}

export interface Trainer {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  specialties: string[];
}

export interface Testimonial {
  id: string;
  clientName: string;
  result: string;
  quote: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

export interface Booking {
  id: string;
  clientName: string;
  email: string;
  serviceId: string;
  date: string;
  time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  notes?: string;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'features' | 'services' | 'testimonials' | 'cta' | 'transformations' | 'text';
  title?: string;
  subtitle?: string;
  content?: string;
  image?: string;
  isVisible: boolean;
  order: number;
}

export interface PageSEO {
  title: string;
  description: string;
  slug: string;
}

export interface SiteData {
  services: Service[];
  trainers: Trainer[];
  testimonials: Testimonial[];
  posts: BlogPost[];
  bookings: Booking[];
  pages: Record<string, {
    seo: PageSEO;
    sections: PageSection[];
  }>;
}

export interface CMSContextType {
  data: SiteData;
  updateSection: (pageKey: string, sectionId: string, updates: Partial<PageSection>) => void;
  toggleSectionVisibility: (pageKey: string, sectionId: string) => void;
  addBooking: (booking: Omit<Booking, 'id' | 'status'>) => void;
  updateBookingStatus: (id: string, status: Booking['status']) => void;
  addPost: (post: Omit<BlogPost, 'id'>) => void;
  deletePost: (id: string) => void;
}