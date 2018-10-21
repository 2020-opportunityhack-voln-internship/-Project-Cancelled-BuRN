import { Campaign, IMessage } from "../models/Campaign";
import { Delivery, IDelivery } from "../models/Delivery";
import { TwilioDispatcher } from "../dispatcher/twilio.dispatcher";

export async function startSendingMessage(campaign_id: string, message_id: string): Promise<void> {
  const campaign = await Campaign.findById(campaign_id);
  const messages = campaign.messages.filter(m => m.uuid == message_id)
  let index = await indexOfMessageSearch(messages, message_id);
  if (index == -1) {
    throw 'No message found!';
  }
  let message = messages[index];
  campaign.messages[index].status = 'started';
  await campaign.save();
  campaign.users.map(user => {
    if (user.email) {
      // Send message via email dispatcher
      // new EmailDispatcher().sendMessage(campaign, message, user.email)
      //   .then(()=>{
      //     const delivery = new Delivery({
      //       campaign_id,
      //       user: user.email,
      //       message: message.text,
      //       date: new Date(),
      //       status: 'Success'
      //     });
      //     delivery.save();
      //   })
      //   .catch(()=>{
      //     const delivery = new Delivery({
      //       campaign_id,
      //       user: user.email,
      //       message: message.text,
      //       date: new Date(),
      //       status: 'Failed!'
      //     });
      //     delivery.save();
      //   });

    }
    if (user.phone) {
      // Send message via phone dispatcher
      new TwilioDispatcher().sendMessage(campaign, message, user.email)
        .then(() => {
          const delivery = new Delivery({
            campaign_id,
            user: user.phone,
            message: message.text,
            date: new Date(),
            status: 'Success'
          });
          delivery.save();
        })
        .catch(() => {
          const delivery = new Delivery({
            campaign_id,
            user: user.phone,
            message: message.text,
            date: new Date(),
            status: 'Failed!'
          });
          delivery.save();
        });
    }
  });

  campaign.messages[index].status = 'complete';
  campaign.save();
}

export async function resumeSendingMessage(campaign_id: string, message_id: string): Promise<void> {

  const [campaign, deliveriesArr] = await Promise.all(
    [
      Campaign.findById(campaign_id).exec(),
      Delivery.find({
        campaign_id,
        message_id
      }).exec()
    ]);

  const messages = campaign.messages.filter(m => m.uuid == message_id);
  const [deliveries, index] = await Promise.all([createDeliveriesMap(deliveriesArr), indexOfMessageSearch(messages, message_id)]);
  if (index == -1) {
    throw 'No message found!';
  }
  let message = messages[index];

  campaign.users.forEach(user => {
    if (user.email) {
      if (!deliveries[user.email]) {
        // Send message via email dispatcher
        // new EmailDispatcher().sendMessage(campaign, message, user.email)
        //   .then(()=>{
        //     const delivery = new Delivery({
        //       campaign_id,
        //       user: user.email,
        //       message: message.text,
        //       date: new Date(),
        //       status: 'Success'
        //     });
        //     delivery.save();
        //   })
        //   .catch(()=>{
        //     const delivery = new Delivery({
        //       campaign_id,
        //       user: user.email,
        //       message: message.text,
        //       date: new Date(),
        //       status: 'Failed!'
        //     });
        //     delivery.save();
        //   });
      }
    }
    if (user.phone) {
      if (!deliveries[user.phone]) {
        // Send message via phone dispatcher
        new TwilioDispatcher().sendMessage(campaign, message, user.email)
          .then(() => {
            const delivery = new Delivery({
              campaign_id,
              user: user.phone,
              message: message.text,
              date: new Date(),
              status: 'Success'
            });
            delivery.save();
          })
          .catch(() => {
            const delivery = new Delivery({
              campaign_id,
              user: user.phone,
              message: message.text,
              date: new Date(),
              status: 'Failed!'
            });
            delivery.save();
          });
      }
    }
  });

  campaign.messages[index].status = 'complete';
  campaign.save();
}

export async function indexOfMessageSearch(messages: IMessage[], uuid: string): Promise<number> {
  for (let i = 0; i < messages.length; i++) {
    let message = messages[i];
    if (messages[i].uuid == uuid) {
      return i
    }
  }
  return -1;
}

async function createDeliveriesMap(deliveriesArr: IDelivery[]): Promise<{
  [key: string]: IDelivery
}> {
  const deliveries: {
    [key: string]: IDelivery
  } = {};

  for (const delivery of deliveriesArr) {
    deliveries[delivery.user] = delivery;
  }
  return deliveries;
}

