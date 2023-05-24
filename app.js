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
    
    const url = "https://us21.api.mailchimp.com/3.0/9feb9fc375";
    const options = {
        method: "POST",
        auth: "Binan:7dd0717e1ca235d501c3d5df494c8a9f-us21"
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


//9feb9fc375