# Storefront Backend API Project

_This is a backend API for Storefront Built with NodeJs and Postgres_

## Installation

- Clone this repository
- Open the cloned repo on your terminal and type _`npm install`_
- Create the _`.env`_ file in your `root dir`. You Can find the configuration for the _`.env`_ file below.
- You need to setup the `storefront` database see the process below.
- Then you can type _`npm start`_ to run the application on _`localhost port 3000`_.
- You can check _`package.json`_ to find all the necessary scripts required for testing, building, e.t.c


## Setting Up The Databse PSQL

The Following Instructions is to help you setup the `database` for development on your local machine.

1. **Open Your Terminal To Launch PSQL**
    ```sh
    psql -U 'YOUR DEFAULT USER'
    ```
2. **Create A New DB With The Name Of Your New User**
    ```sql
    CREATE DATABASE storefront_admin;
    ```
3. **Create A New User**
    ```sql
    CREATE USER storefront_admin WITH PASSWORD 'password123';
    ```
4. **Create Your Backend Database And Test Database**
    ```sql
    CREATE DATABASE storefront;
    CREATE DATABASE storefront_test;
    ```
5. **Grant All Privileges To User(storefront_admin) Of Both Databases**
    ```sql
    GRANT ALL PRIVILEGES ON DATABASE storefront TO storefront_admin;  
    GRANT ALL PRIVILEGES ON DATABASE storefront_test TO storefront_admin;  
    ```

_Your Database && User is all setup._
## Environment variables

This repo contains some environment variable and here are the variables.

```s
POSTGRES_HOST=127.0.0.1
POSTGRES_DB=storefront
POSTGRES_TEST_DB=storefront_test
POSTGRES_USER=storefront_admin
POSTGRES_PASSWORD=password123
POSTGRES_PORT=5432
SERVER_PORT=3000
BCRYPT_PASSWORD=spiceGirls123
SALTROUND=10
JWTSECRET=SpiceBoys
ENV=test
```

_Note: change your **`ENV`** varaible to **`test`** when testing and **`dev`** when developing_

_*Made with love Favour Aniogor*_
