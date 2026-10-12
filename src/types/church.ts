export interface Ministry {
  id: string;
  name: string;
  shortName: string;
  badge: string;
  leader: string;
  meetingTime: string;
  description: string;
  activities: string[];
  scripture: string;
  icon: string;
}

export interface Sermon {
  id: string;
  title: string;
  preacher: string;
  role: string;
  date: string;
  duration: string;
  passage: string;
  audioUrl: string;
  keyPoints: string[];
  summary: string;
  category: 'Sunday Service' | 'Holy Communion' | 'Midweek' | 'Youth' | 'Special';
}

export interface ChurchLeader {
  id: string;
  name: string;
  title: string;
  role: string;
  bio: string;
  department: string;
  phone?: string;
  image?: string;
}

export interface Announcement {
  id: string;
  title: string;
  category: 'Harambee' | 'Diocese' | 'Youth' | 'Mothers Union' | 'Service';
  date: string;
  time?: string;
  venue?: string;
  summary: string;
  details: string;
  highlight?: boolean;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Worship' | 'Choir' | 'Fellowship' | 'Youth' | 'Community';
  caption: string;
  date: string;
  imageUrl: string;
  fallbackGradient: string;
}

export interface GivingCategory {
  id: string;
  name: string;
  accountSuffix: string;
  description: string;
  popular?: boolean;
}
