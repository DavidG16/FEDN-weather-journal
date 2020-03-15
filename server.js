const express = require("express");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path")

// middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("website"));


let projectData = {};


// app.get("/", (req, res) => res.sendFile(path.join(__dirname,
//     "website/index.html")));

app.get('/showdata', function (req, res) {
    res.send(projectData);
});

app.post('/add', function(req, res) {
    projectData.temperature = req.body.temperature;
    projectData.date = req.body.date;
    projectData.userContent = req.body.userContent;
    res.send(projectData);
})

app.listen(port, listening);

function listening() {
    console.log(`Listening on port ${port}`);
}
