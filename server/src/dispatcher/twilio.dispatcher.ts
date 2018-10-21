const accountSid = 'AC4447dae75e7ac5a11184cff1face0eaf';
const authToken = 'eb432eec044be3626e7914ac8ff2972b';
const client = require('twilio')(accountSid, authToken);
const twilioFromNumber = '+14805315337';

function sendMessage(msg: string, reciever: { phoneNumber: string}) {
    client.messages
        .create({
            body: msg,
            from: twilioFromNumber,
            to: reciever.phoneNumber
        })
        .then((message: any) => console.log(message.sid))
        .done();
}

export default {
    sms: {
        sendMessage
    }
}
