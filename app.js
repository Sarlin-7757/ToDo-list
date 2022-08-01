const bodyParser = require("body-parser");
const express = require("express");

const app = express();
let items = ["Buy Food", "Cook Food", "Eat Food"];

let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res) {

    let today = new Date();
    var currentDay = today.getDay();
    var day = "";



    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };


    var day = today.toLocaleDateString("en-US", options);

    res.render("list", { listTitle: day, newListItems: items });

});

app.post("/", function (req, res) {
    let item = req.body.newItem;
    if (req.body.list === "Work") {
        workItems.push(item);

        res.redirect("/work");

    } else {

        items.push(item);

        res.redirect("/");
    }


});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });

})

app.post("/work", function (res, req) {
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
})

app.get("/about" , function(res, req){
    res.render("/about");
})

app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});