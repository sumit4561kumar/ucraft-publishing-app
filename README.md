# UCraft Publishing App
> This project was generated with Node Version "12.13.1"

## Installing / Getting started

A quick introduction of the minimal setup you need to get a UCraft Publish Application up &
running.

### Initial Configuration

Setup/Install Nodejs and NPM

### DB Setup

Download/Setup Postgres, create a Database:-
Define below environment variables in `.env` file:-

	DB_NAME - Name of database created(Default - ucraft)
	DB_USER - User for accessing DB(Default - postgres)
	DB_PASSWORD - Password for accessing DB(Default - password)
	DB_HOST - Host at which DB is instantiated(Default - localhost)
	DB_PORT - Port at which DB is instantiated(Default - 5432)

### Project Folder setup

Follow below steps to setup the project

```shell
git clone https://github.com/sumit4561kumar/ucraft-publishing-app.git
cd ucraft-publishing-app/
npm install
```

## Run Project

Follow below step to start project, please be on the root path of project:-

```shell
npm run start
```

Initiate two different session windows in two different browsers,
by accessing route:- http://localhost:4000/

Register different users and start publishing messages

## Test Project

Create a new database named `ucraft-test`,
and follow below step to start testing the application:-

```shell
npm run start
```