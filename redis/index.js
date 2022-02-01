const redis = require("redis");
const { promisify } = require("util");

// Connection to redis
const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
});

client.on("error", function(error) {
    console.log(error);
});

client.on('connect', function (err) {
    console.log('Connected to redis successfully');
});

// Adding promisifying
const GET_ASYNC = promisify(client.get).bind(client);
const SET_ASYNC = promisify(client.get).bind(client);

module.exports = {
    client,
    GET_ASYNC,
    SET_ASYNC,
};