import { Preference } from "../models/Preference";
import { IMessage, ICampaign } from "../models/Campaign";

export abstract class BaseDispatcher {

  async shouldSendToUser(contact_method: string, contact_type: string): Promise<boolean> {
    let preference = await Preference.findOne({
      contact_method,
      contact_type
    });

    if (!preference) {
      let newPreference = new Preference({
        contact_method,
        contact_type
      });
      await newPreference.save();

      preference = newPreference;
    }

    return !preference.opt_out;
  }

  async abstract sendMessage(campaign: ICampaign, message: IMessage, contact_method: string): Promise<any>;
}
