# PFE AV2 Backend
Developed as a Node.js REST API exercise project. This project focuses on building a simple RESTful API using Node.js, Express, and MySQL.

## Dependencies
- Express
- MySQL2
- Joi
- Bcrypt
- UUID

## Requirements
- Node.js (v20 or later)
- Docker (for running MySQL in a container, optional)

## Installation

1. Install the dependencies.
    ```
    npm install
    ```

## Getting Started

Before you start the application, make sure that the MySQL server is running. If you don't have MySQL installed locally, you can use a Docker container.

### MySQL Server

If you don't have MySQL installed, you can run a MySQL container using Docker:

```bash
docker run -d --name mysql8.0 -e MYSQL_ROOT_PASSWORD=root -p 3306:3306 mysql:8.0 --default-authentication-plugin=mysql_native_password
```

This command will start a MySQL container with the root password set to `root`.

### Database Setup

Ensure that the required tables are created in your MySQL database. You can use a MySQL client or the provided SQL scripts to set up the database schema.

## Running the Application

To run the application using the command line, follow these steps:

1. Open a terminal and navigate to the project directory.

2. Run the application with the following command:

    ```bash
    source env.sh
    ```

This will start the application on the port specified in the `env` file (default is 3000).

## API Endpoints

### Register a new Client
- **URL**: `/register`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "name": "João Silva",
        "cpf": "123.456.789-01",
        "birthDate": "1990-01-01",
        "civilStatus": "Solteiro(a)",
        "education": "Ensino Superior Completo",
        "email": "joao.silva@example.com",
        "password": "securePassword123"
    }
    ```

### Login
- **URL**: `/login`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "joao.silva@example.com",
        "password": "securePassword123"
    }
    ```

### Change Password
- **URL**: `/login/change-password`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "email": "joao.silva@example.com",
        "oldPassword": "securePassword123",
        "newPassword": "newSecurePassword123"
    }
    ```

### List services
- **URL**: `/service`
- **Method**: `GET`

### List client services
- **URL**: `/service/clientId`
- **Method**: `GET`

### Register a new Service
- **URL**: `/service`
- **Method**: `POST`
- **Body**:
    ```json
    {
        "name": "Service Example",
        "price": "150.00"
    }
    ```

### Update Client Service Requests
- **URL**: `/service/request`
- **Method**: `POST`
- **Body**:
    ```json
    [
        {
            "price": 150.00,
            "serviceDeadline": 7,
            "scheduledDate": "2023-12-01",
            "status": "Pending",
            "requestDate": "2023-11-01",
            "requestNumber": 12345,
            "clientId": "uuid-of-the-client",
            "serviceId": 1
        },
        {
            "price": 200.00,
            "serviceDeadline": 5,
            "scheduledDate": "2023-12-02",
            "status": "Pending",
            "requestDate": "2023-11-02",
            "requestNumber": 12346,
            "clientId": "uuid-of-the-client",
            "serviceId": 2
        }
    ]
    ```

## License
This project is licensed under the MIT License.
