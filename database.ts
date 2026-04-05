import Database from 'better-sqlite3';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'portfolio.db');
const db = new Database(dbPath);

export function initDb() {
  // Create tables
  db.exec(`
    CREATE TABLE IF NOT EXISTS profile (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      email TEXT,
      instagram TEXT,
      whatsapp TEXT,
      github TEXT,
      tagline TEXT,
      about TEXT,
      location TEXT
    );

    CREATE TABLE IF NOT EXISTS experiences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      company TEXT,
      period TEXT,
      description TEXT,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS skills (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      category TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      image TEXT,
      link TEXT,
      tags TEXT
    );
  `);

  // Seed data if empty
  const profileCount = db.prepare('SELECT count(*) as count FROM profile').get() as { count: number };
  if (profileCount.count === 0) {
    db.prepare(`
      INSERT INTO profile (name, email, instagram, whatsapp, github, tagline, about, location)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      'Davin Pangestu Kusumo',
      'dpangestuk@gmail.com',
      '@davinpangestuu',
      '081218811217',
      'https://github.com/davininfor',
      'Aspiring Developer & Esports Enthusiast',
      'I am a student with a deep passion for technology and web development. Beyond coding, I am an active competitive gamer, having achieved notable success in the esports scene. I love combining technical precision with creative design.',
      'Indonesia'
    );

    const experiences = [
      ['Juara 3 SMALACUP 2k25', 'ESPORT PUBG Tournament', '2025', 'Achieved 3rd place in a prestigious high school PUBG tournament, demonstrating teamwork and strategic thinking.', 'smalacup.jpeg']
    ];
    const insertExp = db.prepare('INSERT INTO experiences (title, company, period, description, image) VALUES (?, ?, ?, ?, ?)');
    experiences.forEach(exp => insertExp.run(...exp));

    const skills = [
      ['HTML5', 'Frontend'],
      ['CSS3', 'Frontend'],
      ['JavaScript', 'Frontend'],
      ['React.js', 'Frontend'],
      ['Tailwind CSS', 'Styling'],
      ['SQLite', 'Database'],
      ['Node.js', 'Backend'],
      ['TypeScript', 'Frontend']
    ];
    const insertSkill = db.prepare('INSERT INTO skills (name, category) VALUES (?, ?)');
    skills.forEach(skill => insertSkill.run(...skill));

    const projects = [
      ['Personal Portfolio', 'A premium portfolio website built with React and SQLite.', 'https://picsum.photos/seed/portfolio/800/600', 'https://github.com/davininfor', JSON.stringify(['React', 'Tailwind', 'SQLite'])],
      ['Esports Dashboard', 'A UI design concept for tracking tournament stats.', 'https://picsum.photos/seed/esports/800/600', '#', JSON.stringify(['UI Design', 'Figma'])]
    ];
    const insertProject = db.prepare('INSERT INTO projects (title, description, image, link, tags) VALUES (?, ?, ?, ?, ?)');
    projects.forEach(proj => insertProject.run(...proj));
  }
}

export default db;
