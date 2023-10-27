const nodemailer = require("nodemailer")
const express = require("express")
const opn = require("opn")

const transporter = nodemailer.createTransport({
    service: "qq",
    auth: {
        user: "your_qq_email@qq.com",
        pass: "your_qq_email_password"
    }
})

const mailOptions = {
    from: {
        name: "your_name",
        address: "your_qq_email@qq.com"
    },
    to: "recipient_email@example.com",
    cc: "cc_email@example.com",
    bcc: "bcc_email@example.com",
    subject: "example_subject",

    text: "example_text",
    html: "<a href=\"https://google.com\">Google</a>"
}

// transporter.sendMail(mailOptions, (err, info) => {
//     if(err) {
//         console.log("ERROR",err)
//     }
//     else {
//         console.log("Successful")
//     }
// })

const app = express()
const port = 3000

opn("https://google.com")

app.get("/api", (req,res)=>{
    res.send("test")
})

app.listen(port, () => {
    console.log("Successful")
})