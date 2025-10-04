# 📋 Todo App (React + Vite)

Todo App sederhana untuk mengelola daftar tugas dengan fitur:
- ✅ Tambah tugas baru
- 🔄 Tandai tugas selesai / belum selesai
- ❌ Hapus tugas individu
- 🗑️ Hapus semua tugas
- 🧹 Hapus tugas yang sudah selesai
- 📊 Statistik tugas (aktif, selesai, total)
- 💾 Data tersimpan di localStorage (persisten)
- 🎨 UI modern dengan TailwindCSS + custom CSS

---

## 🚀 Demo
👉 Live Demo: https://lann747.github.io/todo-app

---

## 📦 Teknologi
- React + Vite
- TailwindCSS
- LocalStorage
- gh-pages (untuk deploy)

---

## ⚙️ Cara Install & Jalankan

1. Clone repo:
   ```bash
   git clone https://github.com/USERNAME/todo-app.git
   cd todo-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Jalankan server development:
   ```bash
   npm run dev
   ```

4. Build untuk production:
   ```bash
   npm run build
   ```

---

## 🌐 Deploy ke GitHub Pages

1. Tambahkan `homepage` di `package.json`:
   ```json
   "homepage": "https://lann747.github.io/todo-app"
   ```

2. Tambahkan script deploy di `package.json`:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

3. Edit `vite.config.js`:
   ```js
   export default defineConfig({
     plugins: [react()],
     base: "/todo-app/", // ganti dengan nama repo kamu
   });
   ```

4. Push project ke GitHub:
   ```bash
   git init
   git remote add origin https://github.com/USERNAME/todo-app.git
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git push -u origin main
   ```

5. Deploy:
   ```bash
   npm run deploy
   ```

6. Aktifkan GitHub Pages di repo:
   - Buka **Settings → Pages**
   - Pilih branch: `gh-pages`
   - Save

7. Akses app di:
   ```
   https://lann747.github.io/todo-app
   ```

---

## ✨ Author
Dibuat dengan ❤️ oleh lann747
