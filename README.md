# SmartPharma360\

Please Follow the below steps:
1. cd frontend
2. npm install
3. cd server
4. npm install

After installing node dependencies. create admin credentials from graphql playground. follow the below steps:
1. node index.js (in server)
2. go to http://localhost:5000/graphql
3. run the following code 
        mutation{
          create(email:"admin@admin.com" password:"admin")
        }
4. once the credentials are created you can login to the project and navigate accordingly
