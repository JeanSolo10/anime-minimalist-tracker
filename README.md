# Anime Minimalist Tracker

<img src="https://github.com/JeanSolo10/anime-minimalist-tracker/blob/master/app_gif/animetracker.gif" width="290" height="580"/>

## This app is hosted at: 
- https://anime-minimalist-tracker.herokuapp.com/

## Demo video: 
- https://www.youtube.com/watch?v=BRvmm6jlZb8&ab_channel=JeanSolo


**Note:** This application followed a mobile first approach. For the intended experience, please use mobile devices.

## What is Anime Minimalist Tracker?

Users can keep track of anime shows they are watching on sites like MyAnimeList. However, these type of sites contain a lot of information that is overwhelming for both new and veteran anime fans. 

As a new anime fan, you might be interested in recently released shows and might not want to browse through the thousands of anime available.
As an avid anime viewer, you might be tracking your favorite shows on sites where abundant information persists.

Anime minimalist tracker focuses solely on the current and upcoming season shows and provides minimal data about a show you might want to watch. Additionally, you can add any show for track keeping, update its status from "watching" to "completed" and delete it from your lists with a single click.

# How to use it

- Sign up for a free account
- Click on an anime to view details
- Click on "Add to watchlist" to add the anime into your watchlist
- Click on the navigation icon on the top right of the screen
- Click on "WatchList"
  - Click on "Mark As Completed" when you finish watching the show
  - Click on "Delete" to remove it from your watchlist
- Once an anime is marked as completed, you can click on "Delete" to remove it from your watchlist
- Add other anime that you might find interesting

### Check other user's watch list
- Click on the navigation icon on the top right of the screen
- Click on "Users"
- Click on any user from the list to see their watch list
- Click on the name of any anime in the list to get more information
- Add anime to your own list if interested

# For Developers

## Getting Started

### Prerequisites

You will need Node.js installed with a package manger such as npm and a PostgreSQL database available locally to install.

After starting PostgreSQL, create a database from the command line

```
CREATE DATABASE anime_db
```
### Environmental variables (```.env``` file)
- Create a ```.env``` file in the root directory of your project and paste your PSQL, Firebase and ```NODE_ENV``` (production, development) values into it.
  * follow the ```.env.example``` structure found in the root directory


### Setup & Installation

Browse to a folder where this project will be saved and open a command line.

```
git clone <repo-url>
```

Install dependencies

```
npm install
```

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

### Development
- run ```npm start``` in the terminal to start the server
  * **Note:** Database migrations and data seeding are executed automatically. If you want to disable these, remove them from ```index.js``` file or set your ```NODE_ENV``` value to something other than development.
- run ```npm hack``` to start the react app 
  * **Note:** Keep in mind that a proxy is setup on ```package.json``` in order to send requests to the backend. Update the url according to the PORT used in your server. 


## Built With

### Front-End

- React
- Redux / Redux Toolkit
- Firebase


### Back-End

- Node.js / Express
- PostgresSQL
- Knex.js
- Firebase-admin
