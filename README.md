# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Thought process

I decided to use Vite and React just to get something up and running quickly. It's also what I'm most used to and comfortable with.

During the initial stages of development, I encountered some CORS issues. To address this, I implemented a middleware solution using Node/Express, based on suggestions from TL's forums.

Currently, the initial data fetch operation is slow. This performance issue could be mitigated by implementing caching strategies or serving the data statically. This approach assumes that the data does not require real-time updates. However, considering the nature of the data (bus stops), it is unlikely that real-time updates would be necessary in a practical use-case scenario. Therefore, the proposed solutions should be suitable for improving the performance of the initial data fetch operation.

Given the limited scope and time constraints of this project, I chose not to incorporate testing and TypeScript. However, for a full-scale project, the use of both testing and TypeScript would be vital.

# Setup

Create a `.env` file in the root of your project with the following variables:

`PORT=3000`
`API_KEY=yourapikey`

To avoid CORS issues you have to run this small node server. From the root run the following command:

`node ./server/app.js`

To start the React application navigate to the root and run:

`npm run dev`
