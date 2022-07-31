const bodyParser = require("body-parser");
const express = require("express");

const app = express();
let items = ["Buy Food" , "Cook Food" , "Eat Food"];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}))
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

    
    var day = today.toLocaleDateString("en-US",options);

    res.render("list", {listTitle: day , newListItems : items});

});

app.post("/" , function(req, res){
    let item = req.body.newItem;
    
    items.push(item);

    res.redirect("/");
});


app.get("/work" , function(res , req){
    res.render("list" , {listTitle: "Work List" , newListItems : })
})

app.listen(3000, function (){
    console.log("Your server is running on port 3000");
});