import React, { createContext, useContext, useState, ReactNode } from 'react';
import { SiteData, CMSContextType, PageSection, Booking, BlogPost } from '../types';
import { INITIAL_DATA } from '../constants';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

export const CMSProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SiteData>(INITIAL_DATA);

  const updateSection = (pageKey: string, sectionId: string, updates: Partial<PageSection>) => {
    setData(prev => {
      const page = prev.pages[pageKey];
      if (!page) return prev;
      
      const newSections = page.sections.map(sec => 
        sec.id === sectionId ? { ...sec, ...updates } : sec
      );
      
      return {
        ...prev,
        pages: {
          ...prev.pages,
          [pageKey]: { ...page, sections: newSections }
        }
      };
    });
  };

  const toggleSectionVisibility = (pageKey: string, sectionId: string) => {
    setData(prev => {
        const page = prev.pages[pageKey];
        if (!page) return prev;
        
        const newSections = page.sections.map(sec => 
          sec.id === sectionId ? { ...sec, isVisible: !sec.isVisible } : sec
        );
        
        return {
          ...prev,
          pages: {
            ...prev.pages,
            [pageKey]: { ...page, sections: newSections }
          }
        };
      });
  };

  const addBooking = (booking: Omit<Booking, 'id' | 'status'>) => {
    const newBooking: Booking = {
      ...booking,
      id: Math.random().toString(36).substr(2, 9),
      status: 'pending'
    };
    setData(prev => ({ ...prev, bookings: [...prev.bookings, newBooking] }));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setData(prev => ({
      ...prev,
      bookings: prev.bookings.map(b => b.id === id ? { ...b, status } : b)
    }));
  };

  const addPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost: BlogPost = {
        ...post,
        id: Math.random().toString(36).substr(2, 9),
    };
    setData(prev => ({ ...prev, posts: [newPost, ...prev.posts]}));
  };

  const deletePost = (id: string) => {
    setData(prev => ({ ...prev, posts: prev.posts.filter(p => p.id !== id) }));
  }

  return (
    <CMSContext.Provider value={{ 
      data, 
      updateSection, 
      toggleSectionVisibility, 
      addBooking, 
      updateBookingStatus,
      addPost,
      deletePost
    }}>
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = () => {
  const context = useContext(CMSContext);
  if (!context) throw new Error('useCMS must be used within a CMSProvider');
  return context;
};