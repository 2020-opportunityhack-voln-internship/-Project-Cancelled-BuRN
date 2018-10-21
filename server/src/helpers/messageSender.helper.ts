import { Campaign } from "../models/Campaign";

export async function startSendingMessage(campaign_id: string, message_id: string) : Promise<void> {
  const campaign = await Campaign.findById(campaign_id);
}
