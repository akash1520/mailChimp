const express = require("express")
const bodyParser = require("body-parser")
const request = require("request")
const https = require("https");
const {
    json
} = require("body-parser");


const app = express()

app.use(express.static("public"))
app.use(bodyParser.urlencoded({
    extended: true
}))


app.get("/", (req, res) => {
    res.sendFile(__dirname + "/signup.html")

})

app.post("/", (req, res) => {
    const firstName = req.body.fName
    const lastName = req.body.lName
    const email = req.body.mailId

    var data = {
        members: [{
            email_address: email,
            status: "subscribed",
            merge_fields: {
                FNAME: firstName,
                LNAME: lastName
            }
        }]
    }
    const jsonData = JSON.stringify(data)
    const url = "https://us20.api.mailchimp.com/3.0/lists/f21698cbfd"
    const options = {
        method: "POST",
        auth: "akash:2bbee0ee16ea1e913835890e87a884a8"
    }
    const request = https.request(url, options, function (response) {
        response.on("data", (data) => {
            const successData = JSON.parse(data)
            if (successData.error_count == '0') {
                res.sendFile(__dirname+"/successful.html")
            } else {
                res.sendFile(__dirname+"/failure.html")
            }
        })
    })
    request.write(jsonData)
    request.end()

})


app.listen(process.env.PORT || 3000, () => {
    console.log("server is running on 3000")
})







///f21698cbfd

// https://mandrillapp.com/api/1.0/allowlists/add \-d '{"key":"","email":"","comment":""}'