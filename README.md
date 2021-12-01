# Setting up frontend

### Required packages:

*note: Add **sudo** before the commands in linux if there is permission issue*

- nodeJS 

  > https://nodejs.org/en/download/

- npm 

  > Installed with nodeJS

- yarn 

  > After installing nodejs and after making sure npm is installed,
  >
  > run `npm install -g yarn`, 

- firebase cli

  > Installed to run the firebase functions locally. We are only interested in the firebase authentication and firebase functions module 
  >
  > Follow the official installation doc: https://firebase.google.com/docs/cli
  >
  > After installation run `firebase login` and login with the firebase account credentials	

- axios

  > Run `npm install axios`

### Setting up the frontend:

1. Clone the GitHub repository.

2. navigate to frontend folder 

3. run `yarn install`

   > This would install all the front end dependencies.

4. Navigate to the frontend/firebase/functions folder

5. run `npm install`

   > This would install all the dependencies for the firebase functions module. 

### Starting up the application:

To start up the application there are mainly two components that need to run.

1. Backend

   > This runs the server logic

   To run the server:

   1. navigate to the backend folder from the root folder.

   2. run `python ./run.py`

      >  This would start up the server. Make sure the application is running in localhost port 5000 as the frontend expects the application to be running in port 5000.

2. Frontend

   > This runs the user interface for the application

   To run the frontend in development mode:

   1. navigate to the frontend folder from the root folder.
   2. run the command `yarn start`

   To create the production/ build file mode:

   1. navigate to the frontend folder from the root folder.
   2. run the command `yarn build`

The Firebase functions are only required to set up the admin profile. This functionality is limited and is only required when the admin is to be created.

To start up the firebase function in the local emulator;

1. navigate to the  frontend/firebase/functions folder
2. run the command `firebase emulators:start --only functions`

