
// This is a ejs file 

exports.getDate = function (){
    const today = new Date();

    // var currentDay = today.getDay();
    // var day = "";



    const options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };


    return day = today.toLocaleDateString("en-US", options);
 
}


 exports.getDay = function (){
    const today = new Date();

    // var currentDay = today.getDay();
    // var day = "";



    const options = {
        weekday: "long",
    };


    return day = today.toLocaleDateString("en-US", options);


}