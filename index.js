const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const OrderModel = require('./channelSchema/orderSchema');
const ServiceModel = require('./channelSchema/serviceSchema');
const FeedbackModel = require('./channelSchema/feedback');
const AdminModel = require('./channelSchema/adminSchema');
const ContactModel = require('./channelSchema/contactSchema');
const admin = require('firebase-admin');
// const creativeagency = require('./configs/creative-agency-work-firebase-adminsdk-ovdg9-6e8ce6578d.json');
const fs = require('fs-extra');
const cors = require('cors');
require('dotenv').config();


const app = express();
const port = 8000;

app.use(bodyParser.json());
app.use(cors());
app.use(express.static("images"));
app.use(fileUpload());


// for firebase token...
admin.initializeApp({
    credential: admin.credential.cert(creativeagency)
});



//connect with mongodb...
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@creativeagency.8rakjmz.mongodb.net/${process.env.DB_MONGONAME}?retryWrites=true&w=majority`;
const connectingParams = { useNewUrlParser: true, useUnifiedTopology: true };

mongoose
    .connect(uri, connectingParams)
    .then(() => console.log('connecting successfully'))
    .catch((err) => (console.log(err)));



// // 1. All Order Showing for Admin in dashboard serviceList...

app.get('/serviceList', async (req, res) => {
    try {
        const result = await OrderModel.find({});
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});



// 2.  his/her order showing in dashboard serviceList..

// app.get('/orderCategories', async (req, res) => {
//     const bearer = req.headers.authorization;
//     if (bearer && bearer.startsWith('Bearer ')) {
//         const idToken = bearer.split(' ')[1];
//         try {
//             const decodedToken = await admin.auth().verifyIdToken(idToken);
//             if (decodedToken.email == req.query.email) {
//                 try {
//                     const result = await OrderModel.find({ email: req.query.email })
//                     res.status(200).send(result)
//                 } catch (err) {
//                     res.status(500).send(err);
//                 }
//             }
//         } catch (err) {
//             console.log(err)
//             res.status(500).send(err);
//         };
//     }
// });



// // 3. only admin can create a new service...

// app.post('/createService', async (req, res) => {
//     const data = req.body;
//     const file = req.files.img;
//     const filePath = `${__dirname}/images/${file.name}`;

//     try {
//         await file.mv(filePath);
//         const newImg = fs.readFileSync(filePath);
//         const service = { ...data, img: Buffer.from(newImg.toString('base64')) }


//         let serviceModel = new ServiceModel(service);
//         const result = await serviceModel.save({});

//         fs.remove(filePath);

//         res.status(200).send(result);
//     }
//     catch (err) {
//         res.status(500).send({ msg: 'An error occurred' });
//     }
// });



// 4. create a new order which showing for serviceList(admin & customar)...

// app.post('/newOrder', async (req, res) => {
//     const data = req.body;
//     const file = req.files.projectDemoImg;

//     const filePath = `${__dirname}/images/${file.name}`;


//     try {
//         await file.mv(filePath);
//         const newImg = fs.readFileSync(filePath);
//         const order = { ...data, projectDemoImg: Buffer.from(newImg.toString('base64')) };

//         let orderModel = new OrderModel(order);
//         const result = await orderModel.save({});

//         fs.remove(filePath);

//         res.status(200).send(result);
//     }
//     catch (err) {
//         res.status(500).send({ msg: 'An error occurred' });
//     }
// });


// 5. get all services for home page...
app.get('/getProvidedServices', async (req, res) => {
    try {
        const result = await ServiceModel.find({});
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});



// 6. admin feedback from dashboard....

app.post('/feedback', async (req, res) => {
    try {
        let feedbackModel = new FeedbackModel(req.body);
        const result = await feedbackModel.save({})
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err)
    }
});



// 7. get feedbacks for showing in home page...

app.get('/clientsFeedback', async (req, res) => {
    try {
        const result = await FeedbackModel.find({});
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});



// 8. admin can create a new admin...
app.post('/createAdmin', async (req, res) => {
    try {
        let adminModel = new AdminModel(req.body);
        const result = await adminModel.save({})
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});


// 9. check admin or not...
app.post('/adminAccess', async (req, res) => {
    try {
        const result = await AdminModel.find({ email: req.body.email });
        res.status(200).send(result);
    }
    catch (err) {
        res.status(500).send(err);
    }
});



// 10. contact info get from customar
app.post('/contact', async (req, res) => {
    try {
        let contactModel = new ContactModel(req.body);
        const result = await contactModel.save({})
        res.status(200).send(result)
    }
    catch (err) {
        res.status(500).send({ msg: err })
    }
});



app.get('/', async (req, res) => {
    try {
        res.send("hello I'm running...")
    }
    catch (err) {
        res.status(500).send(err);
    }
});


app.listen(process.env.PORT || port, () => console.log('listening to port 8000'));