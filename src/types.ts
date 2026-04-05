export interface Profile {
  name: string;
  email: string;
  instagram: string;
  whatsapp: string;
  github: string;
  tagline: string;
  about: string;
  location: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  image: string;
}

export interface Skill {
  id: number;
  name: string;
  category: 'Frontend' | 'Backend' | 'Styling' | 'Database' | 'Soft Skill';
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  tags: string[];
}
