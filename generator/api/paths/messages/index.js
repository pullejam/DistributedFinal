const client = require('../../../DAL/MongoDatabase.js')
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
        const MyGames = database.collection("Messages");
        let results = await MyGames.find({}).toArray();
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
        await producer.send({ topic: "chatEvent", messages: [{ key: "Message-Created", value: JSON.stringify(newMessage) }] })
        // await MyMessages.insertOne(newMessage)

        res.status(200).json(newMessage);
    }

    GET.apiDoc = {
        summary: "Gets all users",
        description: "returns all Messages that are stored",
        operationId: "get-messages",
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
        description: "User provides a id for themselevs and the group or user that they want to send messages to, along with a message.",
        operationId: "post-messages",
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