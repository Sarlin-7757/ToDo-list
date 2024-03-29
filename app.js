// this is the backend file
const bodyParser = require("body-parser");
const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://localhost:27017/todolistDB", { useNewUrlParser: true });
const app = express();

// ITEMS SCHEMA 
const itemsSchema = new mongoose.Schema({
    name: String
});

//MONGOOSE MODEL FOR ITEMS SCHEMA

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your todolist"
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<------ Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

const listSchema = new mongoose.Schema({
    name: String,
    items: [itemsSchema]
});

const List = mongoose.model("List" , listSchema);
// let items = ["Buy Food", "Cook Food", "Eat Food"];

// let workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"));

app.get("/", function (req, res) {
//  this find method will return an list of array
    Item.find({}, function (err, foundItems) {

        if (foundItems.length === 0) {
            Item.insertMany(defaultItems, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("successfully inserted into database.");
                }
            });

            res.redirect("/");
        } else {
            res.render("list", { 
                listTitle: "Today", 
                newListItems: foundItems });
        }
    });
});

// custom params 
app.get("/:customListName", function(req, res){
   const customListName = _.capitalize(req.params.customListName);

    // this method will return single object 

    List.findOne({name:customListName}, function(err , foundList){
        if(!err){
            if(!foundList){
                // create a new list
                const list = new List({
                    name : customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/"+customListName);
            }else{
                // path to show an existing list 
                res.render("list",{ listTitle: foundList.name,newListItems: foundList.items})
        }
    }
  });
});
app.post("/", function (req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item({
        name: itemName
    });
    if(listName === "Today"){
        item.save();
        res.redirect("/");     
    }else{
        List.findOne({name:listName},function(err , foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/"+ listName);
        });
    } 
});
// delete tasks from the task list 
app.post("/delete", function(req , res){
    const checkedItemId = req.body.checkbox;
    const listName = req.body.listName; 

    if(listName ==="Today"){
         Item.findByIdAndRemove(checkedItemId , function(err){
        if(!err){
            console.log("Succesfully deleted the checked item.");
            res.redirect("/");
        }
    });
    }else{
        List.findOneAndUpdate({name:listName} , {$pull:{items:{_id:checkedItemId}}},function(err , foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }
    // REMOVING THE CHECKED ITEM
   
});



app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(3000, function () {
    console.log("Your server is running on port 3000");
});