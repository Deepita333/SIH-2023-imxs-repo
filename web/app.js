require('dotenv').config();
const express = require('express');
const bp = require('body-parser');

const nodemailer = require('nodemailer');

const app = express();

app.use(express.json());

app.use(bp.json());

app.use(bp.urlencoded({ extended: true }));

app.use(express.static('public'));
 
app.get('/',(req,res)=>{
    res.sendFile(__dirname + '/public/index.html');
})



const Mongoclient = require('mongodb').MongoClient;
const uri = process.env.URL;
const client = new Mongoclient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


client.connect((err) => {
    if(err)
    console.log(err);
    else{
        console.log('Connected to database');
    }

})


app.post('/addData',(req,res)=>{
const data = req.body;
const {email} = req.body;
const collection = client.db('mydb').collection('formdata') 
collection.insertOne(data,(err,result)=>{
    if (err) {
        console.error('Error inserting data:', err);
        res.status(500).json({ error: 'Failed to insert data' });
      } else {
        res.status(200).json({ message: 'Data inserted successfully' });
      }
});
let mailOptions = {
    from:process.env.USER,
    to:email,
    subject: 'Nodemailer Project',
    text: 'Hello from nodemailer',

}

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        type:'OAUTH2',
        user:process.env.USER,
        pass:process.env.PASS,
        clientId:process.env.CLIENT,
        clientSecret:process.env.CLIENT_SECR,
        refreshToken:process.env.REFRESH_TOKEN,
    }
});

transporter.sendMail(mailOptions,(err,data)=>{
    if(err)
    console.log('Error Occurs',err);
    else
    console.log('Email sent!!!');
    })
})



app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})

// Path: public/index.html