const config = require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = Number(config.website.port || process.env.PORT || 80);
const install = require('./module/install');

// checking config is OK
let accesstoken = config.fb.accessToken || process.env.ACCESSTOKEN;
if (!accesstoken) {
    throw new Error(`Please put "Access Token" to config file`);
}

app.listen(port, (err) => {
    if (err) {
        console.log(err);
    } else {
        // install all db schema if 1st time run
        install();
        console.log('建立 Server: ' + `http://localhost:${port}`);
    }
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());


// routing
app.use('/fbcrawler', require('./router/fbcrawler'));
app.use('/mutualfriend', require('./router/mutualfriend'));

