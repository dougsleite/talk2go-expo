## Start Project
npm start

## Configuring EXP 
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

## Publishing to Expo
exp publish

## Generating APK or IPA

Android: exp build:android
iOS:     exp build:ios

Wait for it to finish building then visit printed URL or:

  exp build:status