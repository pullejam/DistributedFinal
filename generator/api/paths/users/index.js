const client = require('../../../DAL/MongoDatabase.js')
const kafka = require('../../streams/kafka')
const uuid = require('uuid')

const producer = kafka.producer();
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
        const database = MyClient.db("VideoGameHypermedia");
        const MyGames = database.collection("MUsers");
        let results = await MyGames.find({}).toArray();
        res.status(200).json(results);

    }

    async function POST(req, res, next) {
        await producer.connect();
        let MyClient = await client.connect;
        const database = MyClient.db("VideoGameHypermedia");
        const MyUsers = database.collection("MUsers");
        let SEmail = req.body.email;
        let SPassword = req.body.password;
        let SName = req.body.name;
        let SAddress = req.body.address;
        let NewUser = {
            name: SName,
            email: SEmail,
            password: SPassword,
            address: SAddress,
            groupIds: [],
            id: (await MyUsers.find({}).toArray()).length() + 1


        }
        await producer.send({ topic: "chatEvent", messages: [{ key: "Account-Created", value: JSON.stringify(NewUser) }] })


        res.status(200).json("Account Created");
    }

    GET.apiDoc = {
        summary: "Gets all users",
        description: "returns all users that are stored",
        operationId: "get-users",
        responses:
        {
            200: {
                description: "OK",
                content: {
                    "application/json": {
                        schema: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/user"
                            }
                        }
                    }
                }
            }
        }
    }
    POST.apiDoc = {
        summary: "Allows a user to register an account",
        description: "User provides an email, password and name to register an account",
        operationId: "post-user",
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