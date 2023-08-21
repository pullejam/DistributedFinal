const client = require('../../../DAL/MongoDatabase')
module.exports = function () {
    let operations = {
        GET,
        // PUT,
        POST,
        // DELETE
    }

    async function GET(req, res, next) {
        let MyClient = await client.connect;
        //prints out database names
        // let databasesList = await MyClient.db().admin().listDatabases();
        // console.log("Databases:");
        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        const database = MyClient.db("HypermediaGames");
        const MyMessages = database.collection("Messages");
        let results = await MyMessages.find({ userToId: req.params.id }).toArray();
        res.status(200).json(results);

    }

    async function POST(req, res, next) {

        let MyClient = await client.connect;
        const database = MyClient.db("HypermediaGames");
        const MyMessages = database.collection("Messages");


        let message = req.body.message;
        let timeStamp = Date.now();
        let groupId = req.body.name;

        let userToId = req.body.userToId;;
        let userFromId = req.body.myId;
        let newMessage = {
            message: message,
            timeStamp: timeStamp,
            groupId: groupId,
            userToId: userToId,
            userFromId: userFromId,
            id: (await MyMessages.find({}).toArray()).length + 1

        }
        MyMessages.insertOne(newMessage)

        res.status(200).json(newMessage);
    }

    GET.apiDoc = {
        summary: "Gets all messages sent to user and sent from user",
        description: "provide your id to get back all of the messages that you have sent and that have been sent to you.",
        operationId: "get-user-messages",
        responses:
        {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/message"
                            }
                        }
                    }
                }
            }
        }
    }
    POST.apiDoc = {
        summary: "Allows Users to send a message to a groupchat or individual",
        description: "User provides an email, password and name to register an account",
        operationId: "post-user-messages",
        responses:
        {
            200: {
                description: "OK",
            },
            400: {
                description: "Missing some information"
            }
        }
    }
    return operations;
}