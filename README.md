# HSPC
**Authors: Daniel J. Bell, Kyle C. Fairfax, Joseph E. Webster**  
**Date: August 2018 - May 2019**
*********************************************************************************************************
The intended audience includes High school Students, Advisors, and KSU Computer Science Administration.
*********************************************************************************************************
# Environment
**Ubuntu Linux v.19.04**          
**Node v.10.15.3**         
**NPM v.6.4.1**        
**React v.16.6.1**  
**React-Boostrap v.0.32.4**  
*********************************************************************************************************
## Getting Started Locally
1. Open a new terminal window and type "npm -v" to check the version of NPM and type "node -v" to check the version of node. Both of the programs must be properly installed and be at or above the versions listed above.
2. Download/Clone the repository into a new directory.
3. Within the "api" folder run "npm install"
4. Run the command "npm start". If the program displays port numbers, the API is running successfully.
5. In a new terminal window, open the "client" folder run "npm install".
6. Run the command "npm start" just like the above.

At this point of the installation the project will automatically open in your default web browser! All functionally relating to login, registration, and data retrieval won't be opperational. This requires setting up the database locally. To complete this, follow the steps below.
*********************************************************************************************************
### Installing Docker
1. sudo apt update
2. sudo apt install curl
3. sudo curl -sSL https://get.docker.com/ | sh

Alternative Installation Method
1. sudo apt install apt-transport-https ca-certificates curl software-properties-common
2. curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
3. sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu bionic test"
4. sudo apt update
5. sudo apt install docker-ce

### USEFUL DOCKER COMMANDS

1. View Running Databases:	docker ps
2. Start Database Instance:	docker start <database_name>
3. Stop Database Instance: docker stop <database_name>
4. Remove Database Instance: (Only while database is inactive):	docker rm <database_name>

### INSTALLING MSSQL CONTAINER

1. sudo docker pull mcr.microsoft.com/mssql/server:2017-latest
2. sudo docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=hspc2018!" -p 1433:1433 --name=hspc_database -d mcr.microsoft.com/mssql/server:2017-latest

### CONNECTING TO MSSQL

1. Within dbeaver click on "Create New Connection".
2. Select "Microsoft SQL Server" and then click next
3. Within the "General" tab select "Edit Driver Settings" and download the latest drivers.
4. Back within the "General" tab, use "SA" and "hspc2018!" for the username and password respectively
5. Select Test Connection, if no errors occur then Finish.

### SETTING UP DATABASE

1. Open the terminal and type "sudo docker ps" to ensure the database container is running.
2. Right click the newly created connect and select "SQL Editor".
3. Within the "API" folder of the repo, copy the SQL code found within the "Database" folder into the dbeaver SQL editor.
4. Run the commands to create the database and the list of tables.
5. Refresh the list of databases within the connection and ensure "hspc_database" is set to actice.

At this point the database setup is complete and ready to use!

*********************************************************************************************************
### SETTING UP TEST USERS

This program features 6 different access levels that provide access to different portals. The access levels for these are numbered 1 through 6, representing "student", "volunteer", "judge", "advisor", "admin", and "master" respectively. Go to the registration page and create a new user. If an account level is selected as anything other than "student", the program will warn the user and apply the requested access level for later approval by an admin account. For the first couple accounts, users will have to be created as students. These accounts can then have their access level upgraded directly by manipulating the database within dbeaver.

*********************************************************************************************************
