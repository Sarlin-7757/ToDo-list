// this is the backend file
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");

mongoose.set('strictQuery',false );
mongoose.connect("mongodb://localhost:27017/todolistDB" , {useNewUrlParser: true});
const app = express();

// ITEMS SCHEMA 
const itemsSchema = new mongoose.Schema({
    name: String
});

//MONGOOSE MODEL FOR ITEMS SCHEMA

const Item = mongoose.model("Item",itemsSchema);

const item1 = new Item({
    name:"Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name:"<------ Hit this to delete an item."
});

const defaultItems = [item1 , item2 , item3];

Item.insertMany(defaultItems , function(err){
    if(err){
        console.log(err);
    }else{
        console.log("successfully inserted into database.");
    }
});



// let items = ["Buy Food", "Cook Food", "Eat Food"];

// let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.render("list", { listTitle: "Today", newListItems: items });

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

app.get("/about", function (req, res) {
    res.render("about");
})

app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});