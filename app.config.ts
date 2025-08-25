import { ConfigContext, ExpoConfig } from "@expo/config";

const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "pl.szumtech.habitstrackerapp.dev";
  }

  if (IS_PREVIEW) {
    return "pl.szumtech.habitstrackerapp.preview";
  }

  return "pl.szumtech.habitstrackerapp";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Habits Tracker (Dev)";
  }

  if (IS_PREVIEW) {
    return "Habits Tracker (Preview)";
  }

  return "Habits Tracker";
};

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: getAppName(),
  slug: "habits-tracker-app",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "reactnativeproject",
  userInterfaceStyle: "automatic",
  newArchEnabled: true,
  ios: {
    supportsTablet: true,
    bundleIdentifier: getUniqueIdentifier(),
    userInterfaceStyle: "automatic"
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff"
    },
    userInterfaceStyle: "automatic",
    edgeToEdgeEnabled: true,
    package: getUniqueIdentifier()
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png"
  },
  plugins: [
    "expo-router",
    [
      "expo-splash-screen",
      {
        image: "./assets/images/splash-icon.png",
        imageWidth: 200,
        resizeMode: "contain",
        backgroundColor: "#ffffff"
      }
    ]
  ],
  experiments: {
    typedRoutes: true,
    tsconfigPaths: true
  },
  extra: {
    router: {},
    eas: {
      projectId: "355eb74f-7890-419e-bdb4-8636c9c386f6"
    }
  },
  owner: "szum-tech"
});
