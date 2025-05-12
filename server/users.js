var mongoClient = require("mongodb").MongoClient;
var express  = require("express");
var cors = require("cors");

var constr = "mongodb://127.0.0.1:27017";

var app = express();
app.use(cors());

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.get("/users", (req, res)=>{
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorialdb");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("/videos", (req, res)=>{
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorialdb");
        database.collection("videos").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.post("/registeruser", (req, res)=>{
    var user = {
        "UserId": req.body.UserId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Email": req.body.Email,
        "Age": parseInt(req.body.Age),
        "Mobile": req.body.Mobile
    }
    mongoClient.connect(constr).then((obj)=>{
         var database = obj.db("tutorialdb");
         database.collection("users").insertOne(user).then(()=>{
            console.log("Record Inserted");
            res.redirect("/users");
         })
    })
});

app.listen(5000);
console.log(`Server Started : http://127.0.0.1:5000`);