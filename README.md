# Getting Started with People app

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

---

## If you are using docker, you can run :

* Build image with name `people-image`

```bash
  docker build -t people-image .
```

* Run container with name `people-container` and deploy app on `localhost:3000`

```bash
  docker run -it -d \
--name people-container \
-v ${PWD}:/app \
-v /app/node_modules \
-p 3000:3000 \
-e CHOKIDAR_USEPOLLING=true \
people-image
```

* Show container logs

```bash
  docker container logs people-container
```

* Restart container

```bash
  docker container restart people-container
```

* Stop running container

```bash
  docker stop people-container
```

* Remove stopped  container

```bash
  docker rm people-container
```
