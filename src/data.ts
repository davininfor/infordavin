import { Profile, Experience, Skill, Project } from './types';

export const profileData: Profile = {
  name: 'Davin Pangestu Kusumo',
  email: 'dpangestuk@gmail.com',
  instagram: '@davinpangestuu',
  whatsapp: '081218811217',
  github: 'https://github.com/davininfor',
  tagline: 'Aspiring Developer & Esports Enthusiast',
  about: 'I am a student with a deep passion for technology and web development. Beyond coding, I am an active competitive gamer, having achieved notable success in the esports scene. I love combining technical precision with creative design.',
  location: 'Indonesia'
};

export const experiencesData: Experience[] = [
  {
    id: 1,
    title: 'Juara 3 SMALACUP 2k25',
    company: 'ESPORT PUBG Tournament',
    period: '2025',
    description: 'Achieved 3rd place in a prestigious high school PUBG tournament, demonstrating teamwork and strategic thinking.',
    image: 'smalacup.jpeg'
  }
];

export const skillsData: Skill[] = [
  { id: 1, name: 'HTML5', category: 'Frontend' },
  { id: 2, name: 'CSS3', category: 'Frontend' },
  { id: 3, name: 'JavaScript', category: 'Frontend' },
  { id: 4, name: 'React.js', category: 'Frontend' },
  { id: 5, name: 'Tailwind CSS', category: 'Styling' },
  { id: 6, name: 'SQLite', category: 'Database' },
  { id: 7, name: 'Node.js', category: 'Backend' },
  { id: 8, name: 'TypeScript', category: 'Frontend' }
];

export const projectsData: Project[] = [
  {
    id: 1,
    title: 'Personal Portfolio',
    description: 'A premium portfolio website built with React and SQLite.',
    image: 'https://picsum.photos/seed/portfolio/800/600',
    link: 'https://github.com/davininfor',
    tags: ['React', 'Tailwind', 'SQLite']
  },
  {
    id: 2,
    title: 'Esports Dashboard',
    description: 'A UI design concept for tracking tournament stats.',
    image: 'https://picsum.photos/seed/esports/800/600',
    link: '#',
    tags: ['UI Design', 'Figma']
  }
];
