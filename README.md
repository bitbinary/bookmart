#

## Environmental setup

create a `.env.local` file and fill in the following configuration values
[Firebase Configs](https://console.firebase.google.com/project/bookmart-32ab5/settings/general/web:ZTcxMWMyZmUtYTE1OC00OGNiLThjOGYtOTc4MGIzNjBiNzBh)

```
REACT_APP_FIREBASE_API_KEY = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_AUTH_DOMAIN = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_PROJECT_ID = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_STORAGE_BUCKET = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_MESSAGING_SENDER_ID = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_APP_ID = <FIREBASE CONFIG VALUE>
REACT_APP_FIREBASE_MEASUREMENT_ID = <FIREBASE CONFIG VALUE>

```

#### Install firebase CLI

`npm install -g firebase-tools`

- Then Sign in to Google ( Use the team credentials used for firebase)
  ` firebase login`
- Initiate your project
  Run this command from your app’s root directory:
  ` firebase init`
- When you’re ready, deploy your web app
  Put your static files (e.g., HTML, CSS, JS) in your app’s deploy directory (the default is “public”). Then, run this command from your app’s root directory:
  `firebase deploy`
