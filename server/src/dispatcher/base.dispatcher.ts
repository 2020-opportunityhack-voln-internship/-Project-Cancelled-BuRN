import { Preference } from "../models/Preference";
import { IMessage, ICampaign } from "../models/Campaign";

export abstract class BaseDispatcher {

  async shouldSendToUser(contact_method: string, contact_type: string) : Promise<boolean> {
    const preference = await Preference.findOne({
      contact_method,
      contact_type
    });
    return !preference.opt_out;
  }

  async abstract sendMessage(campaign: ICampaign, message: IMessage, contact_method: string): Promise<any>;
}
