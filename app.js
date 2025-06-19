import express from "express";
import axios from "axios";
import bodyparser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));


app.get("/", (req, res)=>{
    res.render("index.ejs", {})
})











app.listen(port, ()=>{
    console.log(`Server is running on port ${port}...`);
})