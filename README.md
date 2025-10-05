<div align="center">

# 🎯 Habits Tracker App

![License](https://img.shields.io/github/license/JanSzewczyk/habits-tracker-app?style=flat-square)
![Stars](https://img.shields.io/github/stars/JanSzewczyk/habits-tracker-app?style=flat-square)
![Version](https://img.shields.io/badge/version-1.0.0-blue?style=flat-square)
![Expo](https://img.shields.io/badge/expo-53.0.22-blue?style=flat-square)
![React Native](https://img.shields.io/badge/react--native-0.79.5-blue?style=flat-square)

**A powerful cross-platform mobile application to build better habits and track your daily progress**

[Features](#-features) • [Getting Started](#-getting-started) • [Documentation](#-table-of-contents) • [Technologies](#️-technologies) • [Contributing](#-contributing)

</div>

---

## 👋 Welcome to Habits Tracker App

Welcome to **Habits Tracker App** - your personal companion for building lasting habits and achieving your goals! 🚀

This modern mobile application helps you track your daily habits, maintain streaks, and visualize your progress over time. Built with React Native and Expo, the app delivers a seamless native experience on both iOS and Android platforms, featuring a beautiful interface that adapts to your system's light or dark theme.

### 💡 Why Habits Tracker App?

Building and maintaining habits is challenging. This app solves that problem by:

- 📊 **Visualizing Progress**: See your habit streaks and stay motivated
- 🔐 **Secure Authentication**: Your data is protected with Appwrite backend
- 🎨 **Beautiful UI**: Enjoy a modern, intuitive interface built with NativeWind (TailwindCSS for React Native)
- 📱 **Cross-Platform**: Works seamlessly on iOS, Android, and web
- ⚡ **Fast & Responsive**: Leverages React Native's new architecture for optimal performance

### ✨ What Makes It Special?

- **Tab-Based Navigation**: Intuitive navigation system with dedicated screens for viewing habits, adding new ones, and tracking streaks
- **Real-Time Sync**: All your habits are synced instantly across devices using Appwrite
- **Theme Support**: Automatic light/dark mode that follows your system preferences
- **Offline-First**: Continue tracking your habits even without internet connection
- **Type-Safe**: Built with TypeScript for better code quality and developer experience

---

## ✨ Features

### 🎯 Core Technologies
- ⚛️ **React Native 0.79.5** with **Expo 53.0.22** for cross-platform development
- 🎨 **NativeWind 4.1** (TailwindCSS for React Native) for modern styling
- 📱 **Expo Router 5.1** for file-based routing
- 🔐 **Appwrite** for backend services and authentication
- 📝 **TypeScript 5.8** for type safety
- 🎭 **React 19.0** with latest features

### 🎨 User Experience
- 🌗 Automatic light/dark theme support
- 💫 Smooth animations with Reanimated
- 🎯 Tab-based navigation for easy access
- 📊 Habit streak tracking and visualization
- 🔔 Haptic feedback for better interaction
- 🖼️ Optimized image loading with expo-image

### 📋 Code Quality
- 🔍 **ESLint** with Expo config for code linting
- ✨ **Prettier** for consistent code formatting
- 📝 **TypeScript** strict mode enabled
- 🎯 **Zod** for runtime schema validation
- 🔗 **React Hook Form** for form management

### 🚀 Developer Experience
- 🔥 Hot reload with Expo Dev Client
- 📁 File-based routing with typed routes
- 🛠️ TypeScript path aliases support
- 📦 Modern Metro bundler configuration
- 🎨 Tailwind IntelliSense support

### 🏗️ Build & Deployment
- 📱 EAS Build support for development, preview, and production
- 🔧 Multiple app variants (dev, preview, production)
- 🌐 Web support with static output
- 🍎 iOS support (iPhone & iPad)
- 🤖 Android support with edge-to-edge display

---

## 📖 Table of Contents

- [Welcome to Habits Tracker App](#-welcome-to-habits-tracker-app)
- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Environment Variables](#-environment-variables)
- [Scripts](#-scripts)
- [Project Structure](#-project-structure)
- [Technologies](#️-technologies)
- [Styling & Design](#-styling--design-system)
- [Screenshots/Demo](#️-screenshotsdemo)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)
- [Contact/Author](#-contactauthor)

---

## 🎯 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: version 18.x or higher ([Download](https://nodejs.org/))
- **npm**: version 9.x or higher (comes with Node.js)
- **Expo CLI**: Install globally with `npm install -g expo-cli`
- **iOS Simulator** (Mac only): Install via Xcode
- **Android Studio**: For Android emulator ([Download](https://developer.android.com/studio))
- **EAS CLI** (optional, for building): `npm install -g eas-cli`

### Installation

Follow these steps to get your development environment set up:

#### 1️⃣ Clone the repository

```bash
git clone https://github.com/JanSzewczyk/habits-tracker-app.git
cd habits-tracker-app
```

#### 2️⃣ Install dependencies

```bash
npm install
```

#### 3️⃣ Configure environment variables

Create a `.env` file in the root directory and add your Appwrite credentials:

```bash
cp .env.example .env
```

Then edit the `.env` file with your Appwrite project details (see [Environment Variables](#-environment-variables) section).

#### 4️⃣ Start the development server

```bash
npm start
```

This will start the Expo development server. You can then:

- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Press `w` to open in web browser
- Scan the QR code with Expo Go app on your physical device

#### 5️⃣ Run on specific platforms

```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

#### 6️⃣ Build for production (optional)

```bash
# Prebuild native directories
npm run prebuild

# Build with EAS (requires EAS CLI)
eas build --platform ios
eas build --platform android
```

---

## 🔐 Environment Variables

The application requires the following environment variables to connect to Appwrite backend services.

### Required Variables

Create a `.env` file in the root directory with these variables:

```env
# Appwrite Configuration
EXPO_PUBLIC_APPWRITE_PROJECT_ID=your_project_id_here
EXPO_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint_here
```

### Getting Your Appwrite Credentials

1. Create an account at [Appwrite Cloud](https://cloud.appwrite.io/) or set up your own Appwrite instance
2. Create a new project
3. Copy your Project ID from the project settings
4. Use the Appwrite endpoint (e.g., `https://cloud.appwrite.io/v1` for Appwrite Cloud)

### Validation

Environment variables are validated at runtime using Zod schemas to ensure type safety and catch configuration errors early. If any required variables are missing or invalid, the app will display an error message.

### Example Configuration

```env
# Example .env file
EXPO_PUBLIC_APPWRITE_PROJECT_ID=65abc123def456
EXPO_PUBLIC_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
```

---

## 📃 Scripts

The project includes the following npm scripts, organized by category:

### 🚀 Development

```bash
# Start Expo development server
npm start

# Start with specific platform
npm run android    # Launch on Android device/emulator
npm run ios        # Launch on iOS simulator/device
npm run web        # Launch in web browser
```

### ✨ Code Quality

```bash
# Lint code with ESLint
npm run lint

# Check code formatting with Prettier
npm run prettier:check

# Format code with Prettier
npm run prettier:write
```

### 🏗️ Build & Deployment

```bash
# Generate native directories for iOS and Android
npm run prebuild

# Build with EAS Build (requires EAS CLI)
eas build --platform ios
eas build --platform android
eas build --platform all
```

---

## 📁 Project Structure

```
habits-tracker-app/
├── 📱 app/                      # Application routes (Expo Router)
│   ├── (tabs)/                 # Tab-based navigation group
│   │   ├── _layout.tsx        # Tabs layout configuration
│   │   ├── index.tsx          # Home screen (habits list)
│   │   ├── add-habit.tsx      # Add new habit screen
│   │   └── streaks.tsx        # Streaks tracking screen
│   ├── _layout.tsx            # Root layout
│   ├── auth.tsx               # Authentication screen
│   └── global.css             # Global styles
│
├── 🎨 assets/                   # Static assets
│   ├── fonts/                 # Custom fonts
│   └── images/                # Images, icons, splash screens
│
├── 🧩 components/               # Reusable UI components
│   └── habit-card.tsx         # Habit card component
│
├── 🔄 contexts/                 # React Context providers
│   └── auth-context.tsx       # Authentication context
│
├── 🔧 lib/                      # Third-party service configurations
│   └── appwrite.ts            # Appwrite client setup
│
├── 📋 schemas/                  # Data validation schemas (Zod)
│   └── habit.ts               # Habit schema definitions
│
├── 📝 types/                    # TypeScript type definitions
│
├── ⚙️ Configuration Files
│   ├── .env.example           # Environment variables template
│   ├── app.config.ts          # Expo configuration
│   ├── babel.config.js        # Babel configuration
│   ├── eas.json               # EAS Build configuration
│   ├── eslint.config.js       # ESLint configuration
│   ├── metro.config.js        # Metro bundler configuration
│   ├── prettier.config.js     # Prettier configuration
│   ├── tailwind.config.ts     # Tailwind CSS configuration
│   └── tsconfig.json          # TypeScript configuration
│
└── 📦 package.json             # Project dependencies and scripts
```

### 📂 Directory Descriptions

- **`/app`**: Contains all application screens and routing logic using Expo Router's file-based routing
- **`/components`**: Reusable React components used throughout the app
- **`/contexts`**: React Context providers for global state management (authentication, theme, etc.)
- **`/lib`**: Third-party service configurations and utility functions
- **`/schemas`**: Zod schemas for data validation and type inference
- **`/types`**: TypeScript type definitions and interfaces
- **`/assets`**: Static assets like images, fonts, and icons

### 🎯 Naming Conventions

- **Components**: PascalCase (e.g., `HabitCard.tsx`)
- **Utilities**: camelCase (e.g., `formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_ENDPOINT`)
- **Types/Interfaces**: PascalCase (e.g., `Habit`, `User`)

---

## 🛠️ Technologies

### 📱 Framework & Core

- **[Expo](https://expo.dev/)** (53.0.22) - Universal React applications platform
- **[React Native](https://reactnative.dev/)** (0.79.5) - Build native apps using React
- **[React](https://react.dev/)** (19.0.0) - JavaScript library for building user interfaces
- **[TypeScript](https://www.typescriptlang.org/)** (5.8.3) - Typed superset of JavaScript

### 🎨 Styling & UI

- **[NativeWind](https://www.nativewind.dev/)** (4.1.23) - Tailwind CSS for React Native
- **[Tailwind CSS](https://tailwindcss.com/)** (3.4.17) - Utility-first CSS framework
- **[React Native Paper](https://callstack.github.io/react-native-paper/)** (5.14.5) - Material Design for React Native
- **[Expo Vector Icons](https://docs.expo.dev/guides/icons/)** (14.1.0) - Icon library

### 🧭 Navigation & Routing

- **[Expo Router](https://docs.expo.dev/router/introduction/)** (5.1.5) - File-based routing
- **[React Navigation](https://reactnavigation.org/)** (7.1.6) - Navigation library
  - Bottom Tabs (7.3.10)
  - Native Stack

### 🔐 Backend & Authentication

- **[Appwrite](https://appwrite.io/)** (react-native-appwrite 0.11.0) - Backend-as-a-Service platform
- **[Expo Constants](https://docs.expo.dev/versions/latest/sdk/constants/)** (17.1.7) - System constants

### 📝 Forms & Validation

- **[React Hook Form](https://react-hook-form.com/)** (7.62.0) - Performant form library
- **[Hookform Resolvers](https://github.com/react-hook-form/resolvers)** (5.2.1) - Validation resolvers
- **[Zod](https://zod.dev/)** (4.0.14) - TypeScript-first schema validation

### 🎭 Animations & Interactions

- **[React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)** (3.17.4) - Animations library
- **[React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/)** (2.24.0) - Touch handling
- **[Expo Haptics](https://docs.expo.dev/versions/latest/sdk/haptics/)** (14.1.4) - Haptic feedback

### 🖼️ Media & Assets

- **[Expo Image](https://docs.expo.dev/versions/latest/sdk/image/)** (2.4.0) - Optimized image component
- **[Expo Font](https://docs.expo.dev/versions/latest/sdk/font/)** (13.3.2) - Custom font loading
- **[Expo Splash Screen](https://docs.expo.dev/versions/latest/sdk/splash-screen/)** (0.30.10) - Splash screen API

### 🛠️ Development & Code Quality

- **[ESLint](https://eslint.org/)** (9.25.0) - JavaScript linter
  - eslint-config-expo (9.2.0)
- **[Prettier](https://prettier.io/)** (3.6.2) - Code formatter
  - @szum-tech/prettier-config (1.6.2)
- **[Babel](https://babeljs.io/)** (7.25.2) - JavaScript compiler

### 📦 Other Dependencies

- **[classnames](https://github.com/JedWatson/classnames)** (2.5.1) - Conditional className utility
- **[Expo Blur](https://docs.expo.dev/versions/latest/sdk/blur-view/)** (14.1.5) - Blur effect component
- **[Expo WebView](https://docs.expo.dev/versions/latest/sdk/webview/)** (13.13.5) - WebView component
- **[Expo Web Browser](https://docs.expo.dev/versions/latest/sdk/webbrowser/)** (14.2.0) - In-app browser
- **[Expo Symbols](https://docs.expo.dev/versions/latest/sdk/symbols/)** (0.4.5) - SF Symbols support
- **[React Native Safe Area Context](https://github.com/th3rdwave/react-native-safe-area-context)** (5.4.0) - Safe area handling

### 🏗️ Build & Deployment

- **[EAS CLI](https://docs.expo.dev/eas/)** - Build and submit apps
- **[Metro](https://facebook.github.io/metro/)** - JavaScript bundler

---

## 🎨 Styling & Design System

### NativeWind + Tailwind CSS

This project uses **NativeWind** (v4.1), which brings the power of Tailwind CSS to React Native. This allows you to style components using familiar Tailwind utility classes.

#### Example Usage

```tsx
import { View, Text } from 'react-native';

export default function HabitCard() {
  return (
    <View className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
      <Text className="text-xl font-bold text-gray-900 dark:text-white">
        Daily Exercise
      </Text>
      <Text className="text-sm text-gray-600 dark:text-gray-300 mt-2">
        Keep up the streak! 🔥
      </Text>
    </View>
  );
}
```

### Theme Support

The app automatically adapts to your device's light/dark theme settings:

- ✅ Automatic theme detection
- 🌗 Light and dark mode support for all screens
- 🎨 Consistent color palette across themes
- 💫 Smooth theme transitions

### Design Tokens

Tailwind configuration is customized in `tailwind.config.ts` to match the app's design system. The configuration includes:

- Custom color palette
- Typography scales
- Spacing system
- Border radius values
- Shadow definitions

---

## 🖼️ Screenshots/Demo

### 📱 Live Demo

[ADD YOUR DEMO LINK HERE - e.g., Expo Snack, TestFlight, APK download]

### 📸 Screenshots

[TODO: Add screenshots of your app here]

```
+-------------------+  +-------------------+  +-------------------+
|                   |  |                   |  |                   |
|   Habits List     |  |   Add Habit       |  |   Streaks         |
|   Screen          |  |   Screen          |  |   Screen          |
|                   |  |                   |  |                   |
+-------------------+  +-------------------+  +-------------------+
```

_Screenshots coming soon! 📷_

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help make Habits Tracker App even better:

### How to Contribute

1. **Fork the repository**
   ```bash
   # Click the 'Fork' button on GitHub
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/habits-tracker-app.git
   cd habits-tracker-app
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

4. **Make your changes**
   - Write clean, maintainable code
   - Follow the existing code style
   - Add tests if applicable

5. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing feature"
   ```

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Go to the original repository
   - Click "New Pull Request"
   - Describe your changes in detail

### Contribution Guidelines

- ✅ Follow the existing code style (use `npm run prettier:write` before committing)
- ✅ Write clear, descriptive commit messages
- ✅ Add comments for complex logic
- ✅ Update documentation if needed
- ✅ Test your changes thoroughly on both iOS and Android
- ✅ Keep PRs focused on a single feature or fix

### Code Style

This project uses:
- **Prettier** for code formatting
- **ESLint** for code linting
- **TypeScript** for type safety

Run these commands before submitting:

```bash
npm run prettier:write  # Format code
npm run lint           # Check for linting errors
```

### Found a Bug? 🐛

If you find a bug, please create an issue with:
- A clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Device/platform information

---

## 📜 License

This project is licensed under the **MIT License**.

The MIT License is a permissive license that allows you to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the software, with minimal restrictions. See the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

This project wouldn't be possible without these amazing open-source tools and communities:

### 🛠️ Key Technologies

- **[Expo](https://expo.dev/)** - For making React Native development a breeze
- **[React Native](https://reactnative.dev/)** - For enabling cross-platform mobile development
- **[NativeWind](https://www.nativewind.dev/)** - For bringing Tailwind CSS to React Native
- **[Appwrite](https://appwrite.io/)** - For providing an excellent backend-as-a-service platform
- **[React Hook Form](https://react-hook-form.com/)** - For simplifying form management
- **[Zod](https://zod.dev/)** - For runtime type validation

### 👥 Community

- The **React Native** community for continuous innovation
- The **Expo** team for excellent documentation and tools
- All open-source contributors who make projects like this possible

### 💡 Inspiration

Special thanks to the habit-tracking app community and productivity enthusiasts who inspired this project.

---

## 📧 Contact/Author

**Created by [Jan Szewczyk](https://github.com/JanSzewczyk)**

A passionate developer focused on creating useful tools that help people improve their daily lives. This Habits Tracker App is built to help you build better habits and achieve your goals! 🚀

### 🔗 Connect With Me

- 🐙 GitHub: [@JanSzewczyk](https://github.com/JanSzewczyk)
- 💼 [More Projects](https://github.com/JanSzewczyk?tab=repositories)

### 💬 Support & Issues

- 🐛 Found a bug? [Create an issue](https://github.com/JanSzewczyk/habits-tracker-app/issues)
- 💡 Have a feature request? [Open a discussion](https://github.com/JanSzewczyk/habits-tracker-app/discussions)
- ⭐ Like this project? Give it a star on GitHub!

---

<div align="center">

**Made with ❤️ by [Jan Szewczyk](https://github.com/JanSzewczyk)**

If this project helped you, please consider giving it a ⭐ on GitHub!

[⬆ Back to Top](#-habits-tracker-app)

</div>
