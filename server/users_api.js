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
        var database = obj.db("tutorial");
        database.collection("users").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.get("/admins", (req, res)=>{
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorial");
        database.collection("admins").find({}).toArray().then(documents=>{
            res.send(documents);
            res.end();
        })
    })
});

app.post("/videos", (req, res)=>{
    var video = {
        "VideoId": parseInt(req.body.VideoId),
        "Title": req.body.Title,
        "Description": req.body.Description,
        "Url": req.body.Url,
        "Likes": parseInt(req.body.Likes),
        "Dislikes": parseInt(req.body.Dislikes),
        "Views": parseInt(req.body.Views),
        "Category": parseInt(req.body.Category),
    }
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorial");
        database.collection("videos").insertOne(video).then(()=>{
            console.log("Video Details Added");
            res.redirect("/videos");
        })
    })
});

app.post("/registeruser", (req, res)=>{
    var user = {
        "UserId": req.body.UserId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Age": parseInt(req.body.Age),
        "Mobile": req.body.Mobile,
        "Email": req.body.Email
    }
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorial");
        database.collection("users").insertOne(user).then(()=>{
            console.log("Record Inserted");
            res.redirect("/users");
        })
    })
});

app.post("/registeradmin", (req, res)=>{
    var admin = {
        "UserId": req.body.UserId,
        "UserName": req.body.UserName,
        "Password": req.body.Password,
        "Mobile": req.body.Mobile,
        "Email": req.body.Email
    }
    mongoClient.connect(constr).then((obj)=>{
        var database = obj.db("tutorial");
        database.collection("admins").insertOne(admin).then(()=>{
            console.log("Record Inserted");
            res.redirect("/admins");
        })
    })
});

app.listen(5000);
console.log(`Server Started : http://127.0.0.1:5000`);