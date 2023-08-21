const client = require('../../../DAL/MongoDatabase.js');
const groups = require('../groups/index.js');
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
        const MyInvites = database.collection("invites");
        let results = await MyInvites.find({}).toArray();
        res.status(200).json(results);

    }

    async function POST(req, res, next) {

        let MyClient = await client.connect;
        const database = MyClient.db("HypermediaGames");
        const MyInvites = database.collection("invites");
        const MyUsers = database.collection("MUsers");
        const MyGroups = database.collection("Groups");

        let inviteId = req.body.inviteId;
        let accept = req.body.accept;

        let invite = await MyInvites.find({ id: inviteId }).toArray();
        if (invite.length > 0) {
            if (accept) {
                invite[0].status = "Accepted";
                await MyInvites.replaceOne({ id: inviteId }, invite[0]);
                let group = MyGroups.find({ id: invite[0].groupId }).toArray();
                let updateGroup = group[0];
                updateGroup.memberId.push(req.params.userId)
                await MyGroups.replaceOne({ id: invite[0].groupId }, updateGroup)
                res.status(200).json(invite[0])
            } else {
                invite[0].status = "Declined";
                await MyInvites.replaceOne({ id: inviteId }, invite[0]);
                res.status(200).json(invite[0])
            }
        } else {
            res.status(200).json("No invite could be found with that id")
        }
    }

    GET.apiDoc = {
        summary: "Gets all invites to a user",
        description: "returns all invites to a user that are stored",
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
        summary: "Allows Users accept or decline invites",
        description: "User provides a id for themselevs and boolean and id for theoffer that they was to accept of decline",
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
    return operations;
}