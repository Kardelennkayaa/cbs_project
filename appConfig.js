var developmentDatabase = {
    postgres: {
    host: 'ec2-50-16-241-192.compute-1.amazonaws.com',
    port: 5432,
    database: 'dfi0sjr09l4c3i',
    user: 'iqxmiqdffxvlgu',
    password: '02cdf7e7b9b469e9a5448d33a038728100f85288fbfb3a3478155c247d45103a'
    }
    }
    var connectionString = "postgres://iqxmiqdffxvlgu:02cdf7e7b9b469e9a5448d33a038728100f85288fbfb3a3478155c247d45103a@ec2-50-16-241-192.compute-1.amazonaws.com:5432/dfi0sjr09l4c3i";
    if (process.env.NODE_ENV == 'production') {
    //Production mode
    if (process.env.DATABASE_URL) {
    developmentDatabase =
    parseConnectionString(process.env.DATABASE_URL);
    } else {
    console.log("process.env.DATABASE_URL empty, connectionStringvariable used");
    developmentDatabase = parseConnectionString(connectionString);
    }
    }else{
    //Development mode
    developmentDatabase = parseConnectionString(connectionString);
    }
    function parseConnectionString(connectionString) {
    if (connectionString) {
    var myRegexp = /(\w+):(\w+)@(.+):(\w+)\/(\w+)/g;
    var match = myRegexp.exec(connectionString);
    if (match.length == 6) {
    developmentDatabase.postgres.user = match[1];
    developmentDatabase.postgres.password = match[2];
    developmentDatabase.postgres.host = match[3];
    developmentDatabase.postgres.port = Number(match[4]);
    developmentDatabase.postgres.database = match[5];
    developmentDatabase.postgres.ssl = true;
    return developmentDatabase;
    }
    }
    console.log("connectionString cannot be parsed");
    return null;
    }
    module.exports = {
    hostname: "http://localhost",
    port: 5656,
    database: {
    postgres: developmentDatabase.postgres
    }
    }
 