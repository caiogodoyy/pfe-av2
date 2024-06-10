# PFE AV2 Project

This repository contains a full-stack project with separate directories for the backend and frontend components. The backend is a Node.js REST API, and the frontend is a React application.

## Project Structure

- **backend/**: Contains the Node.js REST API.
- **frontend/**: Contains the React frontend application.

## Requirements

- Node.js (v20 or later)
- Docker (for running MySQL in a container, optional)

## Setting Up the Project

### Clone the Repository

First, clone the repository to your local machine:

```bash
git clone https://github.com/caiogodoyy/pfe-av2
cd pfe-av2
```

### Backend Setup

Navigate to the backend directory and install the dependencies:

```bash
cd pfe-av2-backend
npm install
```

Ensure that the MySQL server is running. If you don't have MySQL installed locally, you can use Docker to run a MySQL container:

```bash
docker run -d --name mysql8.0 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password
```

Set up the database schema using the provided SQL scripts or a MySQL client.

Run the backend application:

```bash
source env.sh
```

### Frontend Setup

Navigate to the frontend directory and install the dependencies:

```bash
cd pfe-av2-frontend
npm install
```

Run the frontend application:

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the frontend application in your browser.

## Running the Project

1. Start the MySQL server if it's not already running.
2. Start the backend application by running the `env.sh` script in the `backend` directory.
3. Start the frontend application by running `npm start` in the `frontend` directory.

## Additional Information

For more details on how to use and customize each part of the project, refer to the README files located in the `backend` and `frontend` directories.
