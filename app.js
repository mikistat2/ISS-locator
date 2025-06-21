import express from "express";
import axios from "axios";
import bodyparser from "body-parser";
import ejs from "ejs";
import {readFileSync} from "fs";

const app = express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: true}));
app.use(express.static("public"));

const googleMap_API = readFileSync('apikey.txt', 'utf8').trim()

const ISS_API = "https://api.wheretheiss.at/v1/satellites/25544";

let data = "";
let latitude="";
let longitude="";
let issLocation = {
    lat: latitude,
    lng: longitude
}
let errorMessage = 0;
app.get("/", (req, res)=>{
    res.render("index.ejs", )
    console.log(googleMap_API);
})

app.get("/about", (req, res)=>{
    res.render("about.ejs");
});

app.post("/check-location", async (req, res)=>{

    try{
        const result = await axios.get(ISS_API);
        data = result.data;
        latitude= data.latitude;
        longitude= result.data.longitude;
        console.log(longitude);
        console.log(latitude);
        res.render("result.ejs", { data });
    }catch(error){
        errorMessage = 1;
        res.render("result.ejs", {errorContent: error.message, data })

        console.log(error.message);
    }

})



app.post("/map", async (req, res) => {
    try {
        const result = await axios.get(ISS_API);
        data = result.data;
        latitude = data.latitude;
        longitude = result.data.longitude;
        console.log(longitude);
        console.log(latitude);
        const issLocation = {
            lat: Number(data.latitude),
            lng: Number(data.longitude)
        };
        res.render("map.ejs", { data, issLocation, apikeycontent: googleMap_API });
    } catch (error) {
        errorMessage = 1;
        res.render("result.ejs", { errorContent: error.message, data });
        console.log(error.message);
    }
});





app.listen(port, ()=>{
    console.log(`Server is running on port ${port}...`);
})