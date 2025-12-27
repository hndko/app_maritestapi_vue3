<div align="center">
  <img src="public/favicon.svg" alt="API Tools Dashboard" width="80" height="80">

# 🚀 API Tools Dashboard

[![Vue.js](https://img.shields.io/badge/Vue.js-3.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)](https://vuejs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

**Dashboard modern untuk kumpulan API Tools dengan desain minimalist dan user-friendly**

[🌐 Website](https://pitucode.com) · [📖 Documentation](#-dokumentasi) · [🐛 Report Bug](https://github.com/hndko/app_maritestapi_vue3/issues) · [✨ Request Feature](https://github.com/hndko/app_maritestapi_vue3/issues)

</div>

---

## 📋 Daftar Isi

- [✨ Fitur](#-fitur)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Instalasi](#-instalasi)
- [⚙️ Konfigurasi](#️-konfigurasi)
- [🚀 Menjalankan Project](#-menjalankan-project)
- [📁 Struktur Folder](#-struktur-folder)
- [🤝 Kontribusi](#-kontribusi)
- [📝 Cara Menambahkan Fitur Baru](#-cara-menambahkan-fitur-baru)
- [📄 License](#-license)

---

## ✨ Fitur

| Fitur                    | Deskripsi                                              |
| ------------------------ | ------------------------------------------------------ |
| 🔍 **Instagram Stalker** | Dapatkan informasi profil Instagram dari username      |
| 💳 **E-Wallet Check**    | Cek nama pemilik akun e-wallet (DANA, GoPay, OVO, dll) |
| 📱 **Telegram Logging**  | Notifikasi log ke Telegram untuk setiap request        |
| 🌙 **Dark Mode**         | Desain gelap yang nyaman di mata                       |
| 📱 **Responsive**        | Tampilan optimal di semua ukuran layar                 |
| ⚡ **Fast & Modern**     | Dibangun dengan Vite untuk performa maksimal           |

---

## 🛠️ Tech Stack

<table>
  <tr>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vue" width="48" height="48" alt="Vue.js" />
      <br>Vue.js 3
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=vite" width="48" height="48" alt="Vite" />
      <br>Vite 7
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=tailwind" width="48" height="48" alt="TailwindCSS" />
      <br>TailwindCSS 4
    </td>
    <td align="center" width="96">
      <img src="https://skillicons.dev/icons?i=js" width="48" height="48" alt="JavaScript" />
      <br>JavaScript
    </td>
  </tr>
</table>

### Dependencies

```json
{
  "vue": "^3.5.x",
  "vue-router": "^4.x",
  "axios": "^1.x",
  "@fortawesome/fontawesome-free": "^6.x"
}
```

---

## 📦 Instalasi

### Prerequisites

Pastikan Anda sudah menginstall:

- ✅ **Node.js** >= 18.x ([Download](https://nodejs.org/))
- ✅ **npm** >= 9.x atau **yarn** >= 1.22.x
- ✅ **Git** ([Download](https://git-scm.com/))

### Clone Repository

```bash
# Clone repository
git clone https://github.com/hndko/app_maritestapi_vue3.git

# Masuk ke direktori project
cd app_maritestapi_vue3

# Install dependencies
npm install
```

---

## ⚙️ Konfigurasi

### 1. Setup Environment Variables

```bash
# Copy file .env.example ke .env
cp .env.example .env
```

### 2. Edit file `.env`

```env
# API Configuration
VITE_API_BASE_URL=https://api.pitucode.com
VITE_API_KEY=your_api_key_here

# Telegram Notification (Optional)
VITE_TELEGRAM_BOT_TOKEN=your_bot_token_here
VITE_TELEGRAM_CHAT_ID=your_chat_id_here
```

### 3. Mendapatkan API Key

1. Kunjungi [Pitucode API](https://pitucode.com)
2. Daftar atau login ke akun Anda
3. Generate API Key dari dashboard
4. Copy API Key ke file `.env`

### 4. Setup Telegram Notification (Opsional)

1. Buat bot baru via [@BotFather](https://t.me/BotFather)
2. Dapatkan Chat ID via [@userinfobot](https://t.me/userinfobot)
3. Masukkan Bot Token dan Chat ID ke file `.env`

---

## 🚀 Menjalankan Project

### Development Mode

```bash
npm run dev
```

Buka browser: `http://localhost:5173`

### Production Build

```bash
# Build untuk production
npm run build

# Preview build
npm run preview
```

---

## 📁 Struktur Folder

```
app_maritestapi_vue3/
├── 📂 public/
│   └── favicon.svg
├── 📂 src/
│   ├── 📂 layouts/
│   │   └── DefaultLayout.vue      # Layout utama dengan sidebar
│   ├── 📂 pages/
│   │   ├── Home.vue               # Halaman dashboard
│   │   ├── 📂 stalker/
│   │   │   └── InstagramStalker.vue
│   │   └── 📂 tools/
│   │       └── EWalletCheck.vue
│   ├── 📂 router/
│   │   └── index.js               # Vue Router configuration
│   ├── 📂 services/
│   │   ├── api.js                 # Axios API service
│   │   └── telegram.js            # Telegram notification service
│   ├── App.vue
│   ├── main.js
│   └── style.css                  # Global styles dengan TailwindCSS
├── .env.example
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

---

## 🤝 Kontribusi

Kami sangat terbuka untuk kontribusi! Project ini **open source** dan dapat dikembangkan lebih lanjut.

### Cara Berkontribusi

1. **Fork** repository ini
2. **Clone** fork Anda
   ```bash
   git clone https://github.com/YOUR_USERNAME/app_maritestapi_vue3.git
   ```
3. Buat **branch** baru
   ```bash
   git checkout -b feature/NamaFiturBaru
   ```
4. **Commit** perubahan Anda
   ```bash
   git commit -m "✨ Add: fitur baru yang keren"
   ```
5. **Push** ke branch Anda
   ```bash
   git push origin feature/NamaFiturBaru
   ```
6. Buat **Pull Request**

### Commit Convention

| Emoji | Type       | Deskripsi               |
| ----- | ---------- | ----------------------- |
| ✨    | `feat`     | Fitur baru              |
| 🐛    | `fix`      | Bug fix                 |
| 📝    | `docs`     | Dokumentasi             |
| 💄    | `style`    | Styling/UI              |
| ♻️    | `refactor` | Refactoring code        |
| ⚡    | `perf`     | Performance improvement |

---

## 📝 Cara Menambahkan Fitur Baru

### 1. Buat File Page Baru

```bash
# Sesuaikan folder dengan kategori
src/pages/tools/NamaFiturBaru.vue
# atau
src/pages/stalker/NamaFiturBaru.vue
```

### 2. Tambahkan Route

Edit `src/router/index.js`:

```javascript
import NamaFiturBaru from "../pages/tools/NamaFiturBaru.vue";

const routes = [
  // ... existing routes
  {
    path: "/nama-fitur-baru",
    name: "NamaFiturBaru",
    component: NamaFiturBaru,
    meta: {
      title: "Nama Fitur Baru",
      icon: "icon-name",
    },
  },
];
```

### 3. Tambahkan API Service (jika diperlukan)

Edit `src/services/api.js`:

```javascript
export const namaFiturBaru = async (params) => {
  const requestParams = { ...params };
  try {
    const response = await api.get("/endpoint-baru", {
      params: requestParams,
    });
    logApiRequest("Nama Fitur Baru", requestParams, true);
    return response.data;
  } catch (error) {
    logApiRequest("Nama Fitur Baru", requestParams, false, error.message);
    throw error.response?.data || error.message;
  }
};
```

### 4. Tambahkan Menu di Sidebar

Edit `src/layouts/DefaultLayout.vue`, tambahkan di dropdown yang sesuai.

---

## 🔗 Links

- 🌐 **Website**: [pitucode.com](https://pitucode.com)
- 📚 **API Documentation**: [Pitucode API Docs](https://pitucode.com/docs)
- 💬 **Discord**: [Join Community](https://discord.gg/yourserver)

---

## 👨‍💻 Author

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/hndko">
        <img src="https://github.com/hndko.png" width="100px;" alt="Handoko"/>
        <br />
        <sub><b>Handoko</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 📄 License

Project ini dilisensikan di bawah **MIT License** - lihat file [LICENSE](LICENSE) untuk detail.

```
MIT License

Copyright (c) 2025 Mari Partner

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software...
```

---

<div align="center">

**⭐ Jika project ini membantu, jangan lupa kasih star! ⭐**

Made with ❤️ by [Mari Partner](https://maripartner.com)

</div>
