import express from "express";
let configViewEngine = (app)=>{
    app.use(express.static("./src/public"));
    app.set("view engine","ejs");// if else,... in html = blade
    app.set("views","./src/views");
}
module.exports= configViewEngine;