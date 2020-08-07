const sgmail= require('@sendgrid/mail')

const sendgridapikey = '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'

sgmail.setApiKey(sendgridapikey)

const sendwelcomeemail= (email,name)=>{
    sgmail.send({
to:email,
from:"guttikondasriram1234@gmail.com",
subject: "thanks for joining",
text: "welcome to app ${name}"

    })
}

const sendcancelationemail= (email,name)=>{
    sgmail.send({
to:email,
from:"guttikondasriram1234@gmail.com",
subject: "thanks for leaving",
text: "byee ${name}"

    })
}

module.exports={
    sendwelcomeemail
}