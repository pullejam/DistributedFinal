const client = require('../../../DAL/MongoDatabase.js')
const kafka = require('../../streams/kafka')


const producer = kafka.producer();
module.exports = function () {
    let operations = {
        GET,
        PUT,
        POST,
        DELETE
    }

    async function GET(req, res, next) {
        let MyClient = await client.connect;
        //prints out database names
        // let databasesList = await MyClient.db().admin().listDatabases();
        // console.log("Databases:");
        // databasesList.databases.forEach(db => console.log(` - ${db.name}`));
        const database = MyClient.db("VideoGameHypermedia");
        const Myinvites = database.collection("Invites");
        let results = await Myinvites.find({}).toArray();
        res.status(200).json(results);

    }

    async function POST(req, res, next) {

        let MyClient = await client.connect;
        await producer.connect();
        const database = MyClient.db("VideoGameHypermedia");
        const MyInvites = database.collection("invites");



        let groupId = req.body.groupId;

        let userToId = req.body.userToId;;
        let userFromId = req.body.userFromId;



        let newInvite = {
            userToId: "localhost:9040/users/" + userToId,
            userFromId: "localhost:9040/users/" + userFromId,
            groupId: "localhost:9040/groups/" + groupId,
            status: "Pending",
            id: (await MyInvites.find({}).toArray()).length + 1

        }

        await producer.send({ topic: "chatEvent", messages: [{ key: "Invite-Created", value: JSON.stringify(newInvite) }] })

        res.status(200).json("Invite Made");
    }
    async function PUT(req, res, next) {
        let InviteId = req.body.InviteId;
        let userToId = req.body.userToId;
        let updateParams = {
            InviteId: InviteId,
            UserToId: userToId
        }
        await producer.send({ topic: "chatEvent", messages: [{ key: "Group-Updated", value: JSON.stringify(updateParams) }] })
        res.status(200).json(updateParams);

    }

    async function DELETE(req, res, next) {

        let InviteId = req.body.InviteId;

        await producer.send({ topic: "chatEvent", messages: [{ key: "Group-Deleted", value: InviteId }] })

        res.status(200).json("Chat has been deleted");

    }


    GET.apiDoc = {
        summary: "Gets all invites",
        description: "returns all invites that are stored",
        operationId: "get-Invites",
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
        operationId: "post-invite",
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
    PUT.apiDoc = {
        summary: "Allows Users to send a message to a groupchat or individual",
        description: "User provides a id for The invite they want to update",
        operationId: "put-invite",
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
    DELETE.apiDoc = {
        summary: "Allows Users to delete an invite",
        description: "User provides a id for the invite they want to delete.",
        operationId: "delete-invite",
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