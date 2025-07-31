
# Warehouse Activity Management (WAM)

Designed as an efficient helper to facilitate tasks within a Warehouse context, the aim is to simplify and regulate the tasks assignments so that the Management can plan much more effectively.



## Run Locally on localhost
- Make sure to have [Node.js](https://nodejs.org/en/download) and [Git](https://git-scm.com/downloads) installed, use any terminal to run the following:
Clone the project

```bash
  git clone https://github.com/Enzo-Leone17/SE-PT-WA-SG-coursework.git
```

Go to the project directory

```bash
  cd ./MiniProjects/MiniProject3
```

Install dependencies

```bash
  npm install
```

Start the server using nodemon package

```bash
  npm start
```

Edit the values inside dotenv file then rename the file to .env
Hostname and password is the root username and password for local MySQL server
Ensure the DB_NAME value is the same as the local database name in MySQL

```dotenv
  NODE_ENV=
  DB_HOSTNAME=
  DB_HOSTPASSWORD=
  DB_NAME=
  PORT=  
```

On any browser, go to the following url. Port value is the same as defined in .env file, default 8000:

```http
  http://localhost:${port}

  e.g http://localhost:8000   
```
## Features

- CRUD operations on multiple API routes
- Login/logout 
- Auth
 



## Acknowledgements

Readme file made with the help of [readme.so](https://readme.so)