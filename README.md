# HSPC
**Authors: Daniel J. Bell, Kyle C. Fairfax, Joseph E. Webster**  
**Date: August 2018 - May 2019**

This project was created fusing the [React-Bootstrap Libraries](https://react-bootstrap.github.io/).  
The intended audience includes High school Students, Advisors, and KSU Computer Science Administration.

# Environment
**Ubuntu Linux Distribution v.19.04**  
**Node v.11.1.0**  
**React v.16.6.1**  
**React-Boostrap v.0.32.4**  

## PREREQUSITE: Install Docker
1. sudo apt get install docker. NOTE: If docker is not found, execute the command below.

2. sudo curl -sSL https://get.docker.com/ | sh

### INSTALLING MSSQL CONTAINER

1. sudo docker pull mcr.microsoft.com/mssql/server:2017-latest

2. sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=<PASSWORD>" -p 1433:1433 --name=hspc_database -d mcr.microsoft.com/mssql/server:2017-latest

### CONNECTING TO MSSQL

1. Within dbeaver click on "Create New Connection".

2. Select MSSQL and install drivers if applicable

3. Click Test Connection, then Finish.

### DOCKER COMMANDS

1. View Running Databases:	docker ps

2. Start Database Instance:	docker start HCI_database

3. Stop Database Instance: 	docker stop HCI_database

4. Remove Database Instance: (Only while database is inactive):	docker rm HCI_database

5. Run Docker on startup: sudo systemctl enable docker

6. Auto restart docker container on startup: docker update --restart=always <CONTAINER ID>

*********************************************************************************************************

## Getting Started

1. Download/Clone the repository into a new directory.

2. Run the "npm install" command within the folder to ensure the latest version.

3. Execute one of the available scripts below.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the server in the development mode.<br>
The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

*********************************************************************************************************
