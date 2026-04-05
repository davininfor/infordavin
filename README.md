# Davin Portfolio 🚀

Website portfolio personal branding yang modern, aesthetic, dan premium dengan tema warna Maroon.

## 🛠️ Teknologi
- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **Animasi**: Framer Motion
- **Backend**: Express.js
- **Database**: SQLite (better-sqlite3)

## 📁 Struktur Folder (Premium Redesign)
- `src/`: Source code React (Frontend)
  - `App.tsx`: Main UI dengan desain premium baru.
  - `data.ts`: Data statis untuk fallback & referensi.
  - `types.ts`: Definisi tipe data TypeScript.
  - `index.css`: Styling premium (Glassmorphism, Maroon Theme).
- `server.ts`: Backend Express dengan API endpoints.
- `database.ts`: Inisialisasi & Seed Database SQLite.
- `public/`: Tempat menyimpan aset gambar & PDF.
  - `profilevin.jpeg`: Foto profil utama.
  - `smalacup.jpeg`: Foto prestasi SMALACUP.
  - `resume.pdf`: File CV/Resume.
- `vercel.json`: Konfigurasi deployment untuk Vercel.
- `index.php`: Placeholder file untuk kompatibilitas hosting tertentu.

## 🚀 Cara Setup Lokal
1. Clone repository ini.
2. Jalankan `npm install` untuk menginstall dependencies.
3. Jalankan `npm run dev` untuk memulai server development.
4. Buka `http://localhost:3000` di browser.

## 📸 Menambahkan Foto
Letakkan foto kamu di dalam folder `public/` dengan nama:
1. `profilevin.jpeg` (untuk foto profil utama)
2. `smalacup.jpeg` (untuk foto prestasi SMALACUP)

## 🌐 Cara Deploy ke GitHub & Hosting (Vercel/Netlify)
1. Buat repository baru di GitHub.
2. Push seluruh code ini ke repository tersebut.
3. Hubungkan repository GitHub kamu ke **Vercel** atau **Netlify**.
4. **PENTING**: Karena website ini menggunakan SQLite (file-based database), database akan ter-reset setiap kali ada deployment baru di platform serverless seperti Vercel. Untuk database yang permanen, disarankan menggunakan **Supabase** atau **MongoDB Atlas** di masa depan.

---
Dibuat oleh Davin Pangestu Kusumo.
