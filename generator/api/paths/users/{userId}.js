const client = require('../../../DAL/MongoDatabase.js')



module.exports = function () {
    let operations = {
        GET,
        // PUT,
        //POST,
        // DELETE
    }


    async function GET(req, res, next) {
        let MyClient = await client.connect;

        const database = MyClient.db("VideoGameHypermedia");
        const MyGames = database.collection("MUsers");
        let results = await MyGames.find({ id: Number(req.params.userId) }).toArray();
        res.status(200).json(results);

    }


    GET.apiDoc = {
        summary: "Gets a user",
        description: "returns the user that is stored",
        operationId: "get-user",
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

    return operations;
}