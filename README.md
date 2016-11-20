# Budget Buddy

## Description
Budget Buddy is a web application that integrates with a customer's bank account in order to examine past and present spending habits. By comparing these spending habits to other people in the consumer's demographic and location, they are able to obtain advice about how to save money in the future.

More specifically, the website analyzes the amount and frequency of purchases in different categories, and compares them to other's in order to encourage users to "optimize" their spending habits. 

##Program Requirements
In order to run the program, please download MongoDB from `https://www.mongodb.com/`. The program requires this in order to run.

##Program Dependencies
Navigate to the project folder in command line. Once in the project folder, call `cd WebServer`, then `npm install`. You will have to wait as the dependencies are installed.

##Running the Program
Open two different command lines in the project folder. In one, run `cd WebServer` and then `npm start`, to initialize localhost. Next, to initialize MongoDB, open the file system and run `StartMongoDB.bat` in the folder `WebServer`. Then, in the other command line window (leaving the first open and running), enter `cd Webserver`, followed by `mongod --dbpath="./db"`. This will allow for the database folder to be recognized, and the database to run.

Lastly, go to `http://localhost:8000` in order to view the page.
