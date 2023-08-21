
const { Kafka } = require('kafkajs')
const { KAFKA_USERNAME: username, KAFKA_PASSWORD: password } = process.env;
const sasl = username && password ? { username, password, mechanism: 'plain' } : false;
const ssl = !!sasl;



const kafka = new Kafka({
    brokers: [process.env.KAFKA_BROKER_SERVER],
    clientId: 'chat-api-consumer',
    ssl,
    sasl
})

module.exports = kafka;