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
        const MyGames = database.collection("groups");
        let results = await MyGames.find({}).toArray();
        res.status(200).json(results);

    }

    async function POST(req, res, next) {

        let MyClient = await client.connect;
        const database = MyClient.db("HypermediaGames");
        const MyGroups = database.collection("groups");

        let groupName = req.body.groupName;;
        let creatorId = req.body.myId;
        let newGroup = {
            name: groupName,
            memberIds: [],
            creatorId: creatorId,
            messageId: [],
            id: (await MyGroups.find({}).toArray()).length + 1

        }


        // await MyGroups.insertOne(newGroup)
        await producer.send({ topic: "chatEvent", messages: [{ key: "Group-Created", value: JSON.stringify(NewUser) }] })

        res.status(200).json(newGroup);
    }

    async function PUT(req, res, next) {
        let groupId = req.body.groupId;
        let groupName = req.body.name;
        let updateParams = {
            groupId: groupId,
            groupName: groupName
        }
        await producer.send({ topic: "chatEvent", messages: [{ key: "Group-Updated", value: JSON.stringify(updateParams) }] })
        res.status(200).json(updateParams);

    }

    async function DELETE(req, res, next) {

        let groupId = req.body.groupId;

        await producer.send({ topic: "chatEvent", messages: [{ key: "Group-Deleted", value: groupId }] })

        res.status(200).json("Chat has been deleted");

    }


    GET.apiDoc = {
        summary: "Gets all groups",
        description: "returns all groups that are stored",
        operationId: "get-groups",
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
        summary: "Allows Users to create groups",
        description: "Users can create groups with a name,",
        operationId: "post-groups",
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
        summary: "Allows Users to update groups",
        description: "Users can update groups with a name,",
        operationId: "put-groups",
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
        summary: "Allows Users to delete groups",
        description: "Users can delete groups with a name,",
        operationId: "delete-groups",
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