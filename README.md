# Project Description

This project demonstraits a simple token based auth system. The system will allow a user to register witha email and password. 
After registration it will allow the user to login using those credentials.

Endpoints such as update and delete are auth proteced and scoped to the users session only allowing you to update and delete your own user.

# Thought process
With the need for a logout flow, JWT's did not seem to me to be the way to go with this project. Instead I went with a token flow using a server side sessions tied to session id tokens. 
To quickly get the prject up, the seesion are only stored in memory and are not persisted to the database. This is not ideal for prodcution as each time the 
server needs to reboot, all user sessions would be lost.

## Why Node
I will start with just being up front abotut it. 
My background for the past few years has been in node, so I am comfortable with it.
That being said, I am confidiend that for a project like this node + express is a good way to. 
Node's async nature makes it fast and the ability for epxress to handel routing and middlware for you is a huge plus. 

# Set up

This project assumes that you have nodeJS and Postgres installed on your local box.

If you have not set up NodeJs check out this page for instructions: [https://nodejs.org/en/](https://nodejs.org/en/)  
If you have nto set up Postgres, check out this page for instructions: [https://www.robinwieruch.de/postgres-sql-macos-setup](https://www.robinwieruch.de/postgres-sql-macos-setup)

Before you start, will need to update the .env file with yoru database credentials and then run db up script. 

    npm run db-up

After everything is set up, import the postman collection, start the servers and use post man to hit the endpoints.

See the post man collection for more details.

# Start
To run local instance use the ```npm start``` command from the root of the project folder.
        
    npm start

# Start the local server and watch for file changes
If you are actively develping in the project and do not want to have to restart the server over and over again.
You can use the ```npm run watch``` command. While will watch the projects directory for file changes and reboot the server on change.
        
    npm run watch

# Tests

I only added a 2 small tests as an example of unit testing. 
Much more coverage would be needed to make this project production ready.
With that, I avoided doing some testing here with the intent of avoiding mocking out the database.

The test suite for this projects consists of:
  
mocha: [https://mochajs.org](https://mochajs.org)   
chai:   [https://www.chaijs.com](https://www.chaijs.com)  
istanbul:   [https://istanbul.js.org](https://istanbul.js.org)  

### Run Tests
To run unit tests for this project. Use the ```npm test``` command.
  
    npm test

# Project Notes

1. I have added a drietory called /postman to this project so that I could easily send the collection along with this project.

# Production Notes and Enhancements

1. To make the project prodcution ready we would want to configure the start scirpts for mulitpul environments.
2. In production we would want to have a registration varification flow, so that the user can confirm they own the email used.
3. In production we would want to store the user seesion in a database and not just in the applications memory.
4. A lot more and proper valiation would be needed.
5. A lot more unit tests.
6. A admin flow would be nice, to alow are super-user to modify records on behalf of antoher user or orgizaton.
7. Containers, one for the applcation and one for the database instance would be nice and could be quickly spun up using docker with compose files.
8. Spec docs, this API should be described in relation to a stadard such as Open API 3 (Swagger).

