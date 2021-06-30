## Running Locally
### Dependencies
1. Run `npm install` to download all project devDependencies
1. [Install MongoDB](https://docs.mongodb.com/manual/installation/)

### Configuration
If you would like to customize the port, duplicate `.env.sample` and modify the value for `PORT`. Changes to this file require the app to be restarted

Before the app can be run locally, edit `api/swagger/swagger.yml` and uncomment `http` under `schemes`.

### Start the App
After installing all dependencies and starting the MongoDB daemon (`mongod --dbpath=./data` _or_ `npm run db`), simply run `npm start` to start the application.

### Developing Locally
To run the app in dev, run `npm run dev` from one shell tab and `npm run db` in another. The first task will start the app and then monitor for changes via [Nodemon](https://github.com/remy/nodemon). When a change is detected, Nodemon will restart the application. The second task will start the Mongo daemon.


## Contributing
Find a bug? Have a feature you'd like to request? See our [Contributing Guidelines](.github/CONTRIBUTING.md) to get started.

[Wat](./data/mongoinit.token)
