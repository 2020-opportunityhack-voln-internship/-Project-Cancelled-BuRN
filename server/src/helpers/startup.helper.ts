import { Campaign } from "../models/Campaign";
import { MessageScheduler } from './messageScheduler.helper';

async function startup(){
  const campaigns = await Campaign.find({complete: false});

  for (const campaign of campaigns){
    for (const message of campaign.messages){
      if (message.status == 'started'){
        // resume sending
      } else if (message.date <= new Date()){
        // start sending
      } else {
        // set a timeout for sending
        MessageScheduler.scheduleMessage(campaign.id, message.uuid, message.date);
      }
    }
  }
}
