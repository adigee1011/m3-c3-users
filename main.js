let express = require("express")
let bodyParser = require("body-parser");
const req = require("express/lib/request");
const res = require("express/lib/response");

let app = express();
app.use(bodyParser.json())

let PORT = 8000;

app.listen(PORT, function(){
    console.log("Application server started on 8000", PORT)
})

/*
USER WILL HAVE AN ID, NAME, AGE, JOB DETAILS, 
WHEN GETTING THE COMPLETE LIST OF USERS, DO NOT SHOW JOB DETAILS
*/

/**
 * Generates an id for the users
 * @returns id
 */

function generateId(){
    let id = Math.random() * 1000000;
    return parseInt(id);
}

/**
 * Initialize an array "db" as a storage of initial list 
 * of users
 */

db = [
    {
        "id": generateId(),
        "name": "James",
        "age":31,
        "job":"detective"
    },
    {
        "id":generateId(),
        "name": "Mary",
        "age":32,
        "job":"banker"
    }
]



//GET USERS DETAILS

/**
 * The following route get user details 
 * It does not get job details as part of this route
 */


app.get("/users", function(req,res){
    console.log("GET /users")
    let newArray = [];
    for(let i = 0;i<db.length;i++){
        let item = db[i];
        let copy = {};
        copy.id = item.id;
        copy.name = item.name;
        copy.age = item.age
        newArray.push(copy);
    }
    res.json(newArray);
})


//GET SINGLE USER DETAIL

/**
 * The following route get a singe user details 
 */


app.get("/users/:id", function(req,res){
    console.log("GET /todos/{id}", req.params.id)
    let found;
    for(let i = 0;i<db.length;i++){
        let item = db[i];
        if(item.id == req.params.id){
            found = item;
            break;
        }
    }
    if(found){
        res.json(found)
    } else {
        res.sendStatus(404);
    }

})


//ADD AN USER

/**
 * The following route add an user
 */

app.post("/users/", function(req,res){
    console.log("POST /users/")
    let item = req.body
    console.log("body", item)
    let copy = {}
    copy.id = generateId();
    copy.name = item.name;
    copy.age = item.age;
    copy.job = item.job;
    db.push(copy)
    res.json(copy)
})



//DELETE AN USER

/**
 * The following route deletes an user
 */

app.delete("/users/:id", function(req,res){
    console.log("DELETE /users/{id}", req.params.id)
    let found;
    let index;
    for (let i = 0;i<db.length;i++){
        let item = db[i]
        if(item.id = req.params.id){
            found = item;
            index = i;
            break;
        }
    }
    if(found){
        db.splice(index, 1)
    }
    res.json(found)
})

//UPDATE AN USER

/**
 * The following route updates an user
 */


app.put("/users/:id", function(req,res){
    console.log("PUT /users/{id}", req.params.id)
    let item = req.body;
    let found;
    for (let i = 0; i<db.length;i++){
        let copy = db[i]
        if(copy.id == req.params.id){
            found = copy;
            break;
        }
    }

    if(found) {
        found.name = item.name;
        found.age = item.age;
        found.job = item.job;
        res.json(found)
    } else {
        res.sendStatus(404) 
    }
})