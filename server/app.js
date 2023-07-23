const express = require("express")
const mongoose = require("mongoose")
const Information = require("./models/info")
const cors = require("cors")
const multer = require("multer")
const path = require("path")
const app = express()

app.use(express.json())

const PORT = 3001;

app.use(cors({
    origin: 'http://localhost:3000'
}));

mongoose.connect("mongodb://localhost:27017/fileUpload")
.then(() => {
    console.log("Database connected sucessfully")
}).catch((err) => {
    Console.log("Failed to connect database")
})

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, 'public/resumes'))
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '_' + file.originalname)
    }
  })
  
  const upload = multer({ storage : storage })


app.post("/pushData", upload.single('myFile'), async (req, res) => {
    try{
        let resume = (req.file) ? req.file.filename : null;

        console.log(req.file)
        console.log(req.body)
        console.log(resume)
        const {name} = req.body;
        console.log(name)
        const user = new Information({name, resume})
        const result = await user.save();
        res.status(201).send(result)
    }catch(err){
        console.log("Something went wrong while pushing the data")
        res.status(400).send(err)
    }
})

app.get("/", (req, res) => {
    res.status(200).json({
        status : "Success",
        message : "File uploading system"
    })
})

app.listen(PORT, () => {
    console.log("App running on port 30001")
})