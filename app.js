const express = require('express')
var fs = require("fs")
const app = express()
const port = 3000
app.use('/', express.static('src'))

console.log("[INFO] 连接数据库...");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

app.get('/data', (req, res) => {
    MongoClient.connect(url, function (err, db) {
        if (err) throw err;
        var dbo = db.db("DATA");
        dbo.collection("music").find({}).toArray(function (err, result) {
            if (err) throw err;
            res.send(result);
            db.close();
        });
    });

})

app.listen(port, () => {
    console.log(`[INFO] 已经运行至端口:${port}`)
})