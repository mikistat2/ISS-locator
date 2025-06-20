import express from "express";
import axios from "axios";
import bodyparser from "body-parser";
import ejs from "ejs";

const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

const ISS_API = "https://api.wheretheiss.at/v1/satellites/2554";
let data = "";
let latitude="";
let altitude="";
let errorMessage = 0;
app.get("/", (req, res)=>{
    res.render("index.ejs", )
})

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.post("/check-location", async (req, res)=>{

    try{
        const result = await axios.get(ISS_API);
        data = result.data;
        latitude= data.latitude;
        altitude= result.data.altitude;
        console.log(latitude);
        res.render("result.ejs", { data , errorMessage});
    }catch(error){
        errorMessage = 1;
        res.render("result.ejs", {errorContent: error.message, data , errorMessage})

        console.log(error.message);
    }

})
  







app.listen(port, ()=>{
    console.log(`Server is running on port ${port}...`);
})