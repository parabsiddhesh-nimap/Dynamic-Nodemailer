const nodemailer = require('nodemailer');
const ejs = require('ejs');
const path = require('path');
const filePathtillView = path.join(__dirname, '../view');
const filePathtillUpload = path.join(__dirname, '../uploads');

module.exports = async function sendEmail(req,res) { 
    const receiverData = req.body;

    var transporter = nodemailer.createTransport(({
        host: "smtp.ethereal.email",
        port: 587,
        auth: {
            user: 'zoie.dare@ethereal.email', //demo account
            pass: 'wMttaZy7HcD2uB1kdZ'        //demo password
            }
    }));
   
    ejs.renderFile(filePathtillView + "/test.ejs", { 
        name: receiverData.receiverEmail,
        file: req.file.filename ? filePathtillUpload+"\\"+req.file.filename : '',
    }, function (err, data) {
        if (err) console.log(err);
        else {
            var mailOptions = {
                from: 'zoie.dare@ethereal.email',
                to: receiverData.receiverEmail,
                subject: receiverData.subject,
                html : data,
            }

            if (receiverData.text){ 
                mailOptions.text = receiverData.text
            };

            if (req.file) {
                mailOptions.attachments = [        
                    {   
                        filename: req.file.filename,
                        path: req.file.destination+"/"+req.file.filename
                    }
                ]
            }
        
            transporter.sendMail(mailOptions, function(error, info){
                if (error) console.log(error);
                else {
                    res.json({success: `${info.response}`})
                    console.log('Email sent: ' + info.response);
                }
            });     
        }
    }
)};