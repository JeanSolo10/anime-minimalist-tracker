# Anime Minimalist Tracker

![](https://github.com/JeanSolo10/anime-minimalist-tracker/blob/master/app_gif/animetracker.gif)

Live link: [Anime Minimalist Tracker](https://anime-minimalist-tracker.herokuapp.com/)

**Note:** This application followed a mobile first approach. For the intended experience, please use mobile devices.

# Introduction

Users can keep track of anime shows they are watching on sites like MyAnimeList. However, these type of sites contain a lot of information that is overwhelming for both new and veteran anime fans. 

As a new anime fan, you might be interested in recently released shows and might not want to browse through the thousands of anime available.
As an avid anime viewer, you might be tracking your favorite shows on sites where abundant information persists. You might also have to add descriptions, number of episodes, show status, rating and more in order to add a new show.

Anime minimalist tracker focuses solely on the current and upcoming season shows and provides minimal data so that you can search for a show you might want to watch. Additionally, you can add any show for track keeping, update its status from "watching" to "completed" and delete it from your lists with a single click.

# Getting Started

# Set it up locally

## Installation and configuration

To clone and run this application, you'll need Git and Node.js (which comes with npm) installed on your computer.

### Copy project and install
From the command line:
- Fork and clone from Github
- ```cd``` into the root directory and run ```npm install```

### Firebase setup
- Create a Firebase account if you don't alreay have one
- Go to Firebase console [Firebase Console](https://console.firebase.google.com/)
- Create a project
- Go to your project overview and add Firebase project to web application
- On the **Add Firebase SKD** section copy and your web app's Firebase configuration values
  * These values will be used in the ```.env``` files starting with ```REACT_APP_FIREBASE_```
- From the left sidebar click on Build -> Authentication and click on Get Started
- Select Email/Password and save
- Go to project settings and click on Service accounts
- Generate a new private key with Node.js
  * These values will be used in the ```.env``` files starting with ```FIREBASE_```
  * For the "private_key" values, remove the double quotes from the beginning and end of the string (" ") and copy the value to the ```.env``` in the following format ```-------BEGIN PRIVATE KEY-----\n....\n-----END PRIVATE KEY-----\n```

### .env file
- Create a .env file in the root directory of your project and paste your PSQL, Firebase and ```NODE_ENV``` (production, development) values into it.
  * follow the ```.env.example``` structure found in the root directory


## Development
- run ```npm start``` in the terminal to start the server
  * **Note:** Database migrations and data seeding are executed automatically. If you want to disable these, remove them from ```index.js``` file or set your ```NODE_ENV``` value to something other than development.
- run ```npm hack``` to start the react app 
  * **Note:** Keep in mind that a proxy is setup on ```package.json``` in order to send requests to the backend. Update the url according to the PORT used in your server. 


# Tech Stack

## Front-End

- ### Node.js / Express
- ### PostgresSQL
- ### Knex.js
- ### Firebase-admin

## Back-End

- ### React
- ### Redux / Redux Toolkit
- ### Firebase