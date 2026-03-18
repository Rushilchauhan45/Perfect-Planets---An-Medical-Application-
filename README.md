# 🌍 Perfect Planets — A Medical & Wellness Application

<p align="center">
  <img src="assets/icon.png" alt="Perfect Planets Logo" width="120" height="120" style="border-radius: 20px"/>
</p>

<p align="center">
  <strong>Cosmic Wellness & Astrology — Garbh Sanskar Medical App</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Platform-Android-green?style=for-the-badge&logo=android" />
  <img src="https://img.shields.io/badge/Built%20With-React%20Native-blue?style=for-the-badge&logo=react" />
  <img src="https://img.shields.io/badge/Expo-SDK%2051-black?style=for-the-badge&logo=expo" />
  <img src="https://img.shields.io/badge/Version-1.0.0-orange?style=for-the-badge" />
</p>

---

## 📖 About the App

**Perfect Planets** is a specialized medical and wellness application focused on **Garbh Sanskar**, **Astrology-based fertility guidance**, and **women's health**. The app provides ancient Indian wisdom combined with modern medical knowledge to guide expecting mothers and those planning a family through their journey.

---

## ✨ Features

### 🔐 Authentication
- Secure Sign In / Sign Up with email & password
- Google Sign-In integration
- Remember Me functionality

### 🏠 Dashboard
- Personalized welcome with user name
- 7 specialized service modules
- Research Paper access
- Contact Us section

### 📊 Make BirthChart
- Complete birth detail form
- Date of Birth with native calendar picker
- Birth Time with native clock picker
- Birth Place input
- Gender selection
- Infertility cause selection (Known / Unexplained)

### 🌟 Nakshtra Vichar
- All 27 Nakshtras listed with unique icons
- PDF viewer for each Nakshtra
- Portrait PDF reading with page navigation
- Previous / Next page buttons
- Real-time page counter

### 🏥 Frequent Miscarriage
- Complete obstetric history form
- Gravida, Parous, Abortion, Live/Dead child inputs
- Multi-select: Type of Miscarriages
- Multi-select: Identified Causes
- Miscarriage Timing selection
- Document upload support

### 🌬️ Svara Vigyan
- Month-by-month guidance (1st to 9th Month)
- Grah & Devta sections per month
- Strotam list with Play / Pause music player
- Auto-stop when switching tracks
- Music availability indicator

### 🚧 Coming Soon Modules
- Kashta Prasava Yog
- Garbhasanskar
- Tips for Garbhini
- Research Papers

### 📞 Contact Us
- Agency contact information
- Social media links

---

## 🛠️ Tech Stack

| Technology | Usage |
|------------|-------|
| React Native | Core Framework |
| Expo SDK | Development Platform |
| React Navigation v6 | Screen Navigation |
| Expo AV | Audio Playback |
| react-native-pdf | PDF Viewer |
| React Native Paper | UI Components |
| @expo/vector-icons | Icons (Ionicons, MaterialCommunityIcons) |
| expo-document-picker | File Upload |
| @react-native-community/datetimepicker | Date & Time Picker |
| React Native Reanimated | Animations |

---

## 📁 Project Structure

```
PerfectPlanets/
├── assets/
│   ├── audio/              ← Strotam audio files (MP3/M4A)
│   ├── pdfs/               ← 27 Nakshtra PDF files
│   ├── icon.png            ← App Icon (1024x1024)
│   ├── splash-icon.png     ← Splash Screen Logo
│   └── adaptive-icon.png   ← Android Adaptive Icon
├── navigation/
│   └── AppNavigator.js     ← Stack Navigation Setup
├── screens/
│   ├── SplashScreen.js     ← Animated Splash Screen
│   ├── auth/
│   │   └── AuthScreen.js   ← Login / Signup Screen
│   ├── dashboard/
│   │   └── DashboardScreen.js ← Main Dashboard
│   └── services/
│       ├── BirthChartScreen.js
│       ├── NakshtraScreen.js
│       ├── MiscarriageScreen.js
│       ├── SvaraVigyanScreen.js
│       └── ContactScreen.js
├── theme.js                ← Global Colors, Spacing, Radius
├── App.js                  ← Root Component
├── app.json                ← Expo Configuration
└── package.json
```

---

## 🎨 Design Theme

| Element | Color |
|---------|-------|
| Background | `#FFF0F5` (Light Pink) |
| Primary Text / Headings | `#1B5E20` (Dark Green) |
| Form Labels / Body Text | `#424242` (Dark Gray) |
| Input Placeholders | `#81C784` (Light Green) |
| Buttons | `#2E7D32` (Deep Green) |
| Cards | `#FFFFFF` (White) |

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18
- npm or yarn
- Expo CLI
- Android Studio (for emulator) or Android device with Expo Go

### Installation

```bash
# Clone the repository
git clone https://github.com/Rushilchauhan45/Perfect-Planets---An-Medical-Application-.git

# Navigate to project
cd PerfectPlanets

# Install dependencies
npm install

# Install Expo packages
npx expo install react-native-pdf react-native-blob-util expo-av expo-document-picker @react-native-community/datetimepicker
```

### Running the App

```bash
# Start development server
npx expo start

# Run on Android
npx expo start --android

# Run on Web (Preview only)
npx expo start --web
```

### Building APK

```bash
# Install EAS CLI
npm install -g eas-cli

# Login to Expo
eas login

# Configure build
eas build:configure

# Build APK
eas build -p android --profile preview
```

---

## 📱 Screenshots

> Screenshots will be added after the first production build.

---

## 🔊 Audio Files (Svara Vigyan — 1st Month)

| File | Strotam |
|------|---------|
| `g1_svastik_vanchan.mp3` | Svastik Vanchan |
| `g2_shukra_kavach.mp3` | Shukra Kavach |
| `g3_shukra_satvaraj_strotam.mp3` | Shukra Satvaraj Strotam |
| `g4_shukra_astotar_nama_strotam.mp3` | Shukra Astotar Nama Strotam |
| `d1_parshuram_strotam.m4a` | Parshuram Strotam |
| `d2_parshuram_stuti.mp3` | Parshuram Stuti |
| `d3_parshuram_astotar_nama_strotam.mp3` | Parshuram Astotar Nama Strotam |
| `d4_santan_gopal_strotam.m4a` | Santan Gopal Strotam |
| `d5_amrit_sanjivani_strotam.m4a` | Amrit Sanjivani Strotam |

---

## 📄 Nakshtra PDFs

All 27 Nakshtra PDFs are stored in `assets/pdfs/`:

`ashwini.pdf` • `bharani.pdf` • `krittika.pdf` • `rohini.pdf` • `mrigashira.pdf` • `ardra.pdf` • `punarvasu.pdf` • `pushya.pdf` • `ashlesha.pdf` • `magha.pdf` • `purva_phalguni.pdf` • `uttara_phalguni.pdf` • `hasta.pdf` • `chitra.pdf` • `swati.pdf` • `vishakha.pdf` • `anuradha.pdf` • `jyeshtha.pdf` • `mula.pdf` • `purva_ashadha.pdf` • `uttara_ashadha.pdf` • `shravana.pdf` • `dhanishta.pdf` • `shatabhisha.pdf` • `purva_bhadrapada.pdf` • `uttara_bhadrapada.pdf` • `revati.pdf`

---

## 🏢 Built By

<p align="center">
  <strong>Pixora Graphics</strong><br/>
  Premium UI/UX & Mobile App Development Agency
</p>

| | |
|--|--|
| 📧 Email | pixoragraphics.work@gmail.com |
| 📞 Phone | +91 9054364058 |
| 🌐 Specialty | React Native • UI/UX Design • Mobile Apps |

---

## 👨‍💻 Developer

**Rushil Chauhan**
- GitHub: [@Rushilchauhan45](https://github.com/Rushilchauhan45)

---

## 📜 License

This project is proprietary software developed by **Pixora Graphics** for the client. All rights reserved.

```
© 2025 Pixora Graphics. All Rights Reserved.
Unauthorized copying, distribution, or modification is strictly prohibited.
```

---

## 🙏 Acknowledgements

- Ancient Indian Garbh Sanskar wisdom
- React Native & Expo community
- All open-source library contributors

---

<p align="center">
  Made with ❤️ by <strong>Pixora Graphics</strong>
</p>
<p align="center">
  <em>✨ Perfect Planets — Cosmic Wellness & Astrology ✨</em>
</p>