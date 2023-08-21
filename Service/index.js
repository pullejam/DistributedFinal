
const kafka = require('./streams/kafka');
const client = require('./DAL/MongoDatabase');
const consumer = kafka.consumer({ groupId: "mailer-group" });



const topic = process.env.OFFER_SENT_TOPIC;



// async..await is not allowed in global scope, must use a wrapper
async function main() {

    console.log("Kafka environment variable:" + process.env.KAFKA_BROKER_SERVER)
    await consumer.connect();
    await consumer.subscribe({ topics: ['chatEvent'] })
    await consumer.run({
        eachMessage: async ({ topic, partition, message, heartbeat, pause }) => {

            if (message.key.toString() == "Account-Created") {
                console.log("received user out of stream");
                let createdUser = JSON.parse(message.value.toString());
                console.log("Created User: " + createdUser);
                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyUsers = database.collection("MUsers");
                await MyUsers.insertOne(createdUser);
                console.log("created user");


            } else if (message.key.toString() == "Message-Created") {
                let createdMessage = JSON.parse(message.value.toString());

                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyMessages = database.collection("Messages");
                console.log("")
                createdMessage.id = (await MyMessages.find({}).toArray()).length() + 1;
                await MyGroups.insertOne(createdMessage);
                console.log("created message");


            } else if (message.key.toString() == "Invite-Created") {
                let createdInvite = JSON.parse(message.value.toString());

                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyInvites = database.collection("Invites");
                await MyInvites.insertOne(createdInvite);
                console.log("created invite");

            } else if (message.key.toString() == "Group-Created") {
                let createdGroup = JSON.parse(message.value.toString());

                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyGroups = database.collection("Groups");
                createdGroup.id = (await MyGroups.find({}).toArray()).length() + 1;
                await MyGroups.insertOne(createdGroup);
                console.log("created group");

            } else if (message.key.toString() == "Group-Deleted") {
                let groupId = JSON.parse(message.value.toString());
                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyGroups = database.collection("Groups");
                await MyGroups.deleteOne({ id: groupId });
                console.log("deleted group");

            } else if (message.key.toString() == "Group-Updated") {
                let updateParams = JSON.parse(message.value.toString());
                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyGroups = database.collection("Groups");
                let groupId = updateParams.id;
                let groupName = updateParams.name;
                let group = await MyGroups.find({ id: groupId }).toArray();
                if (group.length > 0) {
                    group[0].name = groupName;
                    await MyGroups.replaceOne({ id: groupId }, group[0])
                    console.log("updated group");
                }


            } else if (message.key.toString() == "Invite-Deleted") {
                let groupId = JSON.parse(message.value.toString());
                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyInvites = database.collection("Invites");
                await MyInvites.deleteOne({ id: groupId });
                console.log("deleted group");

            } else if (message.key.toString() == "Invite-Updated") {
                let updateParams = JSON.parse(message.value.toString());
                let MyClient = await client.connect;
                const database = MyClient.db("VideoGameHypermedia");
                const MyInvites = database.collection("Invites");
                let InviteId = Number(updateParams.inviteId);
                let userToId = Number(updateParams.userToId);
                let invite = await MyInvites.find({ id: InviteId }).toArray();
                if (invite.length > 0) {
                    invite[0].userToId = userToId;
                    await MyGroups.replaceOne({ id: InviteId }, invite[0])
                    console.log("updated group");
                }


            }


        }
    });

};

main().catch(console.error);
