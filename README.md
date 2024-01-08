# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Setup

Create a `.env` file in the root of your project with the following variables:

`PORT=3000`
`API_KEY=yourapikey`

To avoid CORS issues you have to run this small node server. From the root run the following command:

`node ./server/app.js`

To start the React application navigate into the root folder and run the command:

`npm run dev`
