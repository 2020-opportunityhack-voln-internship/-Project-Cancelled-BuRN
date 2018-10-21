import { BaseDispatcher } from "./base.dispatcher";
import { IMessage, ICampaign } from "../models/Campaign";
import { Delivery } from '../models/Delivery';

const accountSid = process.env.TWILIO_SID || 'AC4447dae75e7ac5a11184cff1face0eaf';
const authToken = process.env.TWILIO_AUTH_TOKEN || 'eb432eec044be3626e7914ac8ff2972b';
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

export class TwilioDispatcher extends BaseDispatcher{
    async sendMessage(campaign: ICampaign, message: IMessage, contact_method: string){
        if (this.shouldSendToUser(contact_method, 'phone')){
            sendMessage(message.text, {
                phoneNumber: contact_method
            });
        } else {
            const delivery = new Delivery({
                campaign: campaign.id,
                user: contact_method,
                message: message.uuid,
                messageBody: message.text,
                date: new Date(),
                status: 'Opted Out'
            });
            delivery.save();
        }
    }
}
