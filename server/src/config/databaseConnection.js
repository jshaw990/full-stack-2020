const MongoClient = require('mongodb').MongoClient;

let mongoDB;

const setupDB = callback => {
    const uri = 'mongodb+srv://jayden:0I4K4bM6Cc4RBGPi@full-stack-i3jbq.mongodb.net/test?retryWrites=true&w=majority'

    MongoClient.connect(
        uri,
        { useNewURLParser: true, useUnifiedTopology: true },
        (err, client) => {
            mongoDB = client.db('full-stack');

            if (err) {
                return callback(err);
            } else {
                return callback('DB OKAY');
            }
        }
    );
};

const getDB = () => {
    return mongoDB;
};

module.exports = { setupDB, getDB };