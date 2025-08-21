# Habits Tracker App

A mobile application built with React Native and Expo that helps users track their daily habits. Features a tab-based navigation system, authentication, and habit streak tracking capabilities. The app uses Appwrite as a backend service and supports both light and dark themes.

## Technologies

- **TypeScript** & **JavaScript**: Core programming languages
- **React Native** & **Expo Router**: For mobile app development and navigation
- **TailwindCSS** & **NativeWind**: For styling
- **Appwrite**: Backend services and authentication
- **Expo**: Development and build tooling

## Project Structure

- `/app`: Main application routes and screens
- `/components`: Reusable UI components
- `/contexts`: React context providers
- `/lib`: Third-party service configurations
- `/schemas`: Data validation schemas
- `/types`: TypeScript type definitions

## Scripts

- `npm start`: Launch Expo development server
- `npm run android`: Run on Android device/emulator
- `npm run ios`: Run on iOS simulator/device
- `npm run web`: Run in web browser
- `npm run lint`: Check code style
- `npm run prettier:write`: Format code with Prettier
- `npm test`: Run tests

## Setup

1. Clone the repository:
```bash
git clone https://github.com/JanSzewczyk/react-native-project.git
```
2. Install dependencies:
```bash
npm install
```
  
3. Start development server:
```bash
npm start
```

## Building
* Android: npm run build:android
* iOS: npm run build:ios
* Web: npm run build

The app is configured to run on iOS (including tablets), Android (with edge-to-edge support), and web platforms.