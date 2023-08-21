// "use strict";
// const nodemailer = require("nodemailer");
// const kafka = require('./streams/kafka');
// const client = require('./DAL/MongoDatabase');
// const consumer = kafka.consumer({ groupId: "mailer-group" });


// const topic = process.env.OFFER_SENT_TOPIC;



// // async..await is not allowed in global scope, must use a wrapper
// async function main() {

//     console.log("Kafka environment variable:" + process.env.KAFKA_BROKER_SERVER)

//     // Generate test SMTP service account from ethereal.email

//     // Only needed if you don't have a real mail account for testing

//     let testAccount = await nodemailer.createTestAccount();

//     // create reusable transporter object using the default SMTP transport

//     let transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: "otis.roob@ethereal.email", // generated ethereal user
//             pass: "DUfN38ctSxPNWVzT8q", // generated ethereal password
//         },
//     });

//     await consumer.connect();
//     await consumer.subscribe({ topics: ['chatEvent'] })
//     await consumer.run({
//         eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {
//             if (message.key.toString() == "Account-created") {
//                 let createdUser = JSON.parse(message.value.toString());

//                 let MyClient = await client.connect;
//                 const database = MyClient.db("HypermediaGames");
//                 const MyUsers = database.collection("MUsers");
//                 createdUser.id = (await MyUsers.find({}).toArray()).length();
//                 await MyUsers.insertOne(createdUser);
//                 let info = await transporter.sendMail({
//                     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                     to: createdUser.email, // list of receivers
//                     subject: "Offer Made", // Subject line
//                     text: "An offer for a game has been made to you", // plain text body
//                     html: "<b>An offer for a game has been made to you</b>", // html body
//                 });




//                 console.log("Message sent: %s", info.messageId);
//                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//                 // Preview only available when sending through an Ethereal account
//                 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//             } else if (message.key.toString() == "Offer-Accepted") {

//                 let info = await transporter.sendMail({
//                     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                     to: message.value.toString(), // list of receivers
//                     subject: "Offer Accepted", // Subject line
//                     text: "Your offer has been accepted", // plain text body
//                     html: "<b>Your offer has been accepted</b>", // html body
//                 });
//                 console.log("Message sent: %s", info.messageId);
//                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//                 // Preview only available when sending through an Ethereal account
//                 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//             } else if (message.key.toString() == "Offer-Declined") {

//                 let info = await transporter.sendMail({
//                     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                     to: message.value.toString(), // list of receivers
//                     subject: "Offer declined", // Subject line
//                     text: "Your offer has been declined", // plain text body
//                     html: "<b>Your offer has been declined</b>", // html body
//                 });

//                 console.log("Message sent: %s", info.messageId);
//                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//                 // Preview only available when sending through an Ethereal account
//                 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//             } else if (message.key.toString() == "Password-Changed") {

//                 let info = await transporter.sendMail({
//                     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//                     to: message.value.toString(), // list of receivers
//                     subject: "Changed Password", // Subject line
//                     text: "Your password has been updated", // plain text body
//                     html: "<b>Your password has been updated</b>", // html body
//                 });

//                 console.log("Message sent: %s", info.messageId);
//                 // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

//                 // Preview only available when sending through an Ethereal account
//                 console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
//                 // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

//             }



//         }
//     })
//     // send mail with defined transport object
//     // let info = await transporter.sendMail({
//     //     from: '"Fred Foo 👻" <foo@example.com>', // sender address
//     //     to: "bar@example.com, baz@example.com", // list of receivers
//     //     subject: "Hello ✔", // Subject line
//     //     text: "Hello world?", // plain text body
//     //     html: "<b>Hello world?</b>", // html body
//     // });



//     //

// }

// main().catch(console.error);
