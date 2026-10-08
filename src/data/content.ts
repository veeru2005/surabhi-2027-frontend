export const REGISTER_URL = 'https://klusurabhi.in/';
export const INSTAGRAM_URL = 'https://www.instagram.com/klsurabhi/';
/** Fest start: 12 March 2027, 09:00 IST */
export const FEST_START = new Date('2027-03-12T09:00:00+05:30');

export interface FestEvent {
  icon: string;
  name: string;
  category: string;
  blurb: string;
  group: 'Performing' | 'Creative' | 'Competitive';
}

export const EVENTS: FestEvent[] = [
  { icon: '🎶', name: 'Raaga', group: 'Performing', category: 'Music', blurb: 'Classical, light and western vocals and instrumentals.' },
  { icon: '💃', name: 'Nrithya', group: 'Performing', category: 'Dance', blurb: 'Classical, folk and western — solo and group.' },
  { icon: '👗', name: 'Vastranaut', group: 'Performing', category: 'Fashion Show', blurb: 'Themed runway walks with original concepts.' },
  { icon: '🎨', name: 'Chitrakala', group: 'Creative', category: 'Art & Painting', blurb: 'Landscape painting, Bhavishya Bharata and more.' },
  { icon: '📜', name: 'Sahitya', group: 'Creative', category: 'Literature', blurb: 'Elocution with rebuttal and short story writing.' },
  { icon: '🎬', name: 'Cine Carnival', group: 'Creative', category: 'Short Film & Photography', blurb: 'Tell your story through the lens.' },
  { icon: '🎭', name: 'Dramatics', group: 'Performing', category: 'Theatre', blurb: 'Stage plays, skits and mime.' },
  { icon: '🎮', name: 'Kurukshetra', group: 'Competitive', category: 'eSports', blurb: 'Battle it out on the digital battlefield.' },
  { icon: '🏛️', name: 'Mock Parliament', group: 'Competitive', category: 'National Mock Parliament', blurb: 'Debate policy on a real parliament floor.' },
];

export const STATS = [
  { value: '20,000+', label: 'attendees at the 2026 finale' },
  { value: '11+', label: 'competition categories' },
  { value: '6', label: 'days of competitions in 2026' },
  { value: 'Pan-India', label: 'colleges and universities' },
];

export interface DayPlan {
  day: string;
  date: string;
  items: string[];
}

export const SCHEDULE: DayPlan[] = [
  {
    day: 'Day 1',
    date: 'Friday, 12 March 2027',
    items: ['Inauguration ceremony', 'Sahitya – Literature', 'Chitrakala – Art', 'Raaga – Music', 'Nrithya – Dance prelims'],
  },
  {
    day: 'Day 2',
    date: 'Saturday, 13 March 2027',
    items: ['Vastranaut – Fashion Show', 'Dramatics', 'Kurukshetra – eSports finals', 'Mock Parliament', 'Grand Finale & prize ceremony'],
  },
];

export const WHY_ATTEND = [
  { icon: '🏆', title: 'Cash prizes', text: '1st, 2nd and 3rd prizes in every category.' },
  { icon: '🎤', title: 'A big stage', text: 'Perform in front of thousands of students.' },
  { icon: '🤝', title: 'Meet India', text: 'Connect with students from across the country and abroad.' },
  { icon: '📜', title: 'Certificates', text: 'Participation certificates for every competitor.' },
  { icon: '🏨', title: 'Accommodation', text: 'Stay arranged for outstation participants.' },
  { icon: '💻', title: 'Go virtual', text: "Can't travel? Virtual participation is enabled." },
];

export const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/events', label: 'Events' },
  { to: '/schedule', label: 'Schedule' },
  { to: '/contact', label: 'Contact' },
];

export const CONTACT = {
  addressLines: ['KL University (Koneru Lakshmaiah Education Foundation)', 'Green Fields, Vaddeswaram, Guntur District', 'Andhra Pradesh 522302'],
  organizer: 'Student Activity Centre (SAC), KL University',
  // TODO: replace with the official Surabhi email & phone numbers
  email: 'surabhi@kluniversity.in',
  phones: ['+91 00000 00000'],
};

export const EVENT_GROUPS = ['All', 'Performing', 'Creative', 'Competitive'] as const;

/** The five "rasas" (art forms) shown as arched panels on the home page. */
export const RASAS = [
  { name: 'Music', native: 'Sangeet', icon: '🎶', color: '#e98a2b', text: 'Ragas, rock and everything between: classical, light and western, vocal and instrumental.' },
  { name: 'Dance', native: 'Nritya', icon: '💃', color: '#d6336c', text: 'Bharatanatyam to hip-hop. Solo, duet and group stages for every style.' },
  { name: 'Art', native: 'Kala', icon: '🎨', color: '#1c7ed6', text: 'Canvas, colour and craft. Paint India’s future live on campus.' },
  { name: 'Drama', native: 'Natya', icon: '🎭', color: '#c92a2a', text: 'Stage plays, street plays, skits and mime that move a crowd.' },
  { name: 'Fashion', native: 'Vastra', icon: '👗', color: '#7048e8', text: 'Themed runways where heritage weaves meet bold new silhouettes.' },
];
