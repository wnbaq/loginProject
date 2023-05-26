const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express(3000);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", function (req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    PASSWORD: password
                }
            }
        ]
    };
    const sednData = JSON.stringify(data);
    //url and auth apikey can be take mailchimp
    const url = "apiKey"
    const options = {
        method: "POST",
        auth: "auth"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })
    });
    request.write(sednData);
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");

});

app.listen(3000, function () {
    console.log("server is running");

});

