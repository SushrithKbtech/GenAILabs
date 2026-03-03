import { SiteData } from './types';

export const INITIAL_DATA: SiteData = {
  services: [
    {
      id: 's1',
      title: '1-on-1 Personal Training',
      description: 'Elite coaching tailored to your specific physiology and goals. We analyze your mechanics, strength curve, and recovery capacity to build the ultimate physique.',
      price: '$85 / session',
      features: ['Custom Hypertrophy Programming', 'Real-time Form Correction', 'Nutritional Periodization', '24/7 Coach Access', 'Biometric Tracking'],
      image: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=800',
      category: 'training'
    },
    {
      id: 's2',
      title: 'Online Performance Coaching',
      description: 'Remote programming for athletes who need structure and accountability. Perfect for those who know how to lift but need a master plan.',
      price: '$200 / month',
      features: ['Weekly Video Check-ins', 'Form Analysis via App', 'Custom App Access', 'Macro & Meal Planning', 'Peak Week Prep'],
      image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=800',
      category: 'online'
    },
    {
      id: 's3',
      title: '12-Week Transformation',
      description: 'Our signature intensive program designed to radically change your physique. This is not for the faint of heart.',
      price: '$1200 / program',
      features: ['Complete Diet Overhaul', 'High-Frequency Training Block', 'Supplement Protocol', 'Sleep Optimization Guide', 'Guaranteed Results'],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800',
      category: 'training'
    }
  ],
  trainers: [
    {
      id: 't1',
      name: 'Alex "The Forge" Mercer',
      role: 'Head Coach & Founder',
      bio: 'Former powerlifter turned functional hypertrophy specialist. With 10+ years forging elite physiques, Alex combines biomechanics with old-school intensity.',
      image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?auto=format&fit=crop&q=80&w=600',
      specialties: ['Hypertrophy', 'Strength Mechanics', 'Injury Rehab']
    }
  ],
  testimonials: [
    {
      id: 'tm1',
      clientName: 'Sarah Jenkins',
      result: 'Lost 25lbs in 12 Weeks',
      quote: 'FitForge didn’t just change my body, it changed my mindset. The coaching is next level. I learned how to fuel my body properly and lift with intention.',
      beforeImage: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?auto=format&fit=crop&q=80&w=400',
      afterImage: 'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'tm2',
      clientName: 'Mike Thompson',
      result: 'Added 40lbs to Bench Press',
      quote: 'I was stuck at a plateau for years. One month with Alex and I crushed my PR. His understanding of leverage and mechanics is unmatched in the industry.',
      beforeImage: 'https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80&w=400',
      afterImage: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'tm3',
      clientName: 'David Chen',
      result: 'Competition Ready in 16 Weeks',
      quote: 'From average gym-goer to stage ready. The precision in the nutrition plan made the cut almost effortless. Highly recommend the 12-week transformation.',
      beforeImage: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=400',
      afterImage: 'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&q=80&w=400'
    }
  ],
  posts: [
    {
      id: 'p1',
      title: 'Why You Aren\'t Building Muscle',
      excerpt: 'Stop wasting time with junk volume. Here is the science of hypertrophy and mechanical tension.',
      content: 'Most people in the gym are just moving weight from point A to point B. They aren\'t actually training the muscle. Hypertrophy requires mechanical tension, metabolic stress, and muscle damage.\n\n If you are doing 3 sets of 10 but leaving 5 reps in the tank, you aren\'t growing. You need to train close to failure with perfect form. At FitForge, we focus on standardized rep execution—controlling the eccentric, pausing at the stretch, and exploding on the concentric.\n\nStop ego lifting. Drop the weight, control the movement, and force the muscle to adapt.',
      author: 'Alex Mercer',
      date: '2023-10-15',
      category: 'Training',
      image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800',
      slug: 'why-you-arent-building-muscle'
    },
    {
      id: 'p2',
      title: 'Nutrition Myths Busted: Carbs Are Friends',
      excerpt: 'Carbs are not the enemy. Learn how to fuel your performance and recovery.',
      content: 'The demonization of carbohydrates has destroyed more physiques than it has helped. Carbs are your body\'s primary fuel source for high-intensity anaerobic work—lifting weights.\n\nWithout adequate glycogen stores, your training intensity drops, your recovery slows down, and your cortisol levels rise. The goal shouldn\'t be to eliminate carbs, but to time them around your training window.\n\nEat complex carbs 2 hours before training and fast-digesting carbs immediately after. Fuel the work.',
      author: 'Sarah Jenkins',
      date: '2023-10-20',
      category: 'Nutrition',
      image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800',
      slug: 'nutrition-myths-busted'
    },
    {
      id: 'p3',
      title: 'The Importance of Sleep Optimization',
      excerpt: 'You grow in your sleep, not in the gym. Master your circadian rhythm.',
      content: 'If you are training hard but sleeping 5 hours a night, you are wasting your time. Sleep is when growth hormone is released and neural recovery happens.\n\nCreate a sleep sanctuary: blackout curtains, temperature at 65-68 degrees, and no blue light 1 hour before bed. Supplements like Magnesium Glycinate and Zinc can also support deep REM sleep.\n\nPrioritize recovery as much as you prioritize the bench press.',
      author: 'Alex Mercer',
      date: '2023-11-05',
      category: 'Recovery',
      image: 'https://images.unsplash.com/photo-1511296933631-18b93d3dabd4?auto=format&fit=crop&q=80&w=800',
      slug: 'sleep-optimization'
    }
  ],
  bookings: [
    {
      id: 'b1',
      clientName: 'John Doe',
      email: 'john@example.com',
      serviceId: 's1',
      date: '2023-11-01',
      time: '10:00',
      status: 'pending',
      notes: 'Interested in strength training.'
    }
  ],
  pages: {
    home: {
      seo: {
        title: 'FitForge | Elite Personal Training',
        description: 'Transform your body and mind with FitForge Performance.',
        slug: '/'
      },
      sections: [
        {
          id: 'hero',
          type: 'hero',
          title: 'FORGE YOUR ULTIMATE PHYSIQUE',
          subtitle: 'Elite coaching. Data-driven plans. Real results. Start your transformation today.',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=1920',
          isVisible: true,
          order: 0
        },
        {
          id: 'trust',
          type: 'features',
          title: 'WHY FITFORGE?',
          subtitle: 'We don\'t guess. We measure, analyze, and execute.',
          isVisible: true,
          order: 1
        },
        {
          id: 'services',
          type: 'services',
          title: 'OUR PROGRAMS',
          subtitle: 'Choose your path to greatness.',
          isVisible: true,
          order: 2
        },
        {
          id: 'transformations',
          type: 'transformations',
          title: 'REAL RESULTS',
          subtitle: 'See what our clients have achieved.',
          isVisible: true,
          order: 3
        },
        {
          id: 'cta',
          type: 'cta',
          title: 'READY TO START?',
          subtitle: 'Book your free consultation now.',
          isVisible: true,
          order: 4
        }
      ]
    }
  }
};