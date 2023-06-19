# Express Node.js Application
This repository contains a Node.js application built with Express framework. This README file provides instructions on how to set up and run the application.

## Prerequisites
Before running the application, ensure that you have the following installed:

- Node.js 18 or later
- MongoDB
- Mailgun account (for email client integration)

## Installation
Clone this repository to your local machine.
Navigate to the project directory.

```sh
$ git clone https://github.com/ZenTheAsmodius/node-example.git
$ cd node-example
```

Install the dependencies using npm.

```sh
$ npm install
```

## Configuration

The application's environment variables are defined in a .env file. Rename the .env.example file to .env and provide the necessary values for the variables.

```sh
$ cp .env.example .env
$ nano .env
```

Modify the file to include your specific configuration:

```
PORT=3000
MONGO_URI=mongodb://localhost:27017/your_database_name
MAILGUN_API_KEY=your_mailgun_api_key
MAILGUN_DOMAIN=your_mailgun_domain
NODE_ENV=development
JWT_CIPHER=some_cipher
JWT_DURATION=3600
DEFAULT_EMAIL=email@example.com
```

Save the changes and exit the text editor.

## Running the Application

To start the server and run the application, use the following command:

```sh
$ npm start
```
This will launch the Express application on the specified port (default: 3000) and connect to the MongoDB database using the provided URL.

Access the application by opening a web browser and navigating to http://localhost:3000 (or the specified port).

Running Tests
To run the tests, execute the following command:

```sh
$ npm test
```

This command will execute the test suites defined in the project and provide feedback on their success or failure.



License
This project is UNLICENCED.