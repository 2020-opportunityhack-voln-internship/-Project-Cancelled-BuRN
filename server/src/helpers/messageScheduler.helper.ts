import { ICampaign } from "../models/Campaign";
import { startSendingMessage } from "./messageSender.helper";

export class MessageScheduler {
  static timeouts: {
    [key: string]: NodeJS.Timeout
  } = {};

  static startCampaign(campaign: ICampaign): void {
    campaign.messages.forEach(message => {
      console.log("Message:", message);
      this.scheduleMessage(campaign._id, message.uuid, message.date);
    });
  }

  static scheduleMessage(campaign_id: string, message_id: string, date: number): void {
    console.log("Created message timeout!", date - Date.now());
    const timeout = setTimeout(
      () => startSendingMessage(campaign_id, message_id),
      date - Date.now()
    );
    this.timeouts[message_id] = timeout;
  }

  static removeScheduledMessage(message_id: string): void {
    clearTimeout(this.timeouts[message_id]);
    delete this.timeouts[message_id];
  }
}
