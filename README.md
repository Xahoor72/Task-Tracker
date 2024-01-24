# My TaskTracker

Introducing My TaskTracker! This single-page web app built with React helps you conquer your to-do list while staying organized and productive. Create, manage, and complete tasks with ease, all in one convenient place.

## Technologies Used

* React
* ReactDOM
* Babel
* Mui icons
* Tailwind CSS

## Installation

To install this project, follow these steps:

1. Clone the project repository.

    ```bash
    git clone https://github.com/Xahoor72/Task-Tracker
    ```

2. Navigate to the project directory.

    ```bash
    cd Task-Tracker
    ```

3. Install the dependencies.

    ```bash
    npm install
    ```

4. Start the development server.

    ```bash
    npm start
    ```

5. Open http://localhost:3000 to start tracking!

Feel free to explore and enhance the app as needed. Happy task tracking!

## Tailwind CSS
You can check the documentation of Tailwind css at https://tailwindcss.com/docs/guides/create-react-app . 
Tips for easy Installaton of Tail wind :
Install it in your current working folder 
 ```bash
     npm install -D tailwindcss
     npx tailwindcss init
 ```
Make these changes to  tailwind.config file
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
Now replace index.css file with 
@tailwind base;
@tailwind components;
@tailwind utilities;
Now start the server
 ```bash
     npm start
 ```

## MUI Icons

 ```bash
     npm install @mui/icons-material @mui/material @emotion/styled @emotion/react
 ```

## React Beautifull DND

 ```bash
    npm i react-beautiful-dnd
 ```
## Author 
Zahoor Ahmad  [Xahoor72](https://github.com/Xahoor72)



