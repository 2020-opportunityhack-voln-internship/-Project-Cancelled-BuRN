export class MessageScheduler {
  static timeouts: {
    [key:string]: NodeJS.Timeout
  }

  static scheduleMessage(campaign_id: string, message_id: string, date: number): void{
    const timeout = setTimeout((campaign_id, message_id) => {

    }, date - Date.now());
    this.timeouts[message_id] = timeout;
  }

  static removeScheduledMessage(message_id: string): void {
    clearTimeout(this.timeouts[message_id]);
    delete this.timeouts[message_id];
  }
}
