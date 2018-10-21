import { Campaign } from "../models/Campaign";
import { MessageScheduler } from './messageScheduler.helper';
import { startSendingMessage, resumeSendingMessage } from './messageSender.helper';

async function startup() {
  const campaigns = await Campaign.find({ status: 'in-progress' });

  for (const campaign of campaigns) {
    for (const message of campaign.messages) {
      if (message.status == 'started') {
        // resume sending
        resumeSendingMessage(campaign.id, message.uuid);
      } else if (message.date <= new Date()) {
        // start sending
        startSendingMessage(campaign.id, message.uuid);
      } else {
        // set a timeout for sending
        MessageScheduler.scheduleMessage(campaign.id, message.uuid, message.date);
      }
    }
  }
}
