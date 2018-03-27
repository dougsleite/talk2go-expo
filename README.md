## Start Project
npm start

## Publish to Expo
https://expo.io/@dougsleite/talk2go

### 1. Install exp
npm install -g exp

### 2. Configure app.json

{
  "expo": {
   "name": "Talk2Go",
   "icon": "./assets/icons/talk2go-logo.png",
   "version": "1.0.0",
   "slug": "talk2go",
   "sdkVersion": "25.0.0",
   "ios": {
     "bundleIdentifier": "com.talk2go"
   },
   "android": {
     "package": "com.talk2go"
   }
  }
}

### 3. Start the build

Android: exp build:android
iOS:     exp build:ios

### 4. Wait for it to finish building

Visit printed URL or

exp build:status