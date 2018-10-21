import BaseController from './base.controller';
import { Campaign, IUser, IMessage, ICampaign } from '../models/Campaign';
import { indexOfMessageSearch } from '../helpers/messageSender.helper';
import express, { Router, Request, Response, Application } from 'express';


export default class Main extends BaseController {
    constructor(app: Express.Application) {
        super(app);

        this.router.post('/campaign', this.createCampaign.bind(this));
        this.router.get('/campaign/:id', this.getCampaign.bind(this));
        this.router.get('/campaign/:campaignId/message/:messageId', this.getMessage.bind(this));
        this.router.post('/message', this.createMessage.bind(this));
    };

    async createCampaign(req: Request, res: Response, next: any): Promise<void> {
        let name = req.body.name;
        let users: IUser[] = [];

        // Do validation

        for (let user of req.body.users) {
            users.push({
                name: user.name,
                email: user.email,
                phone: user.phone
            });
        }

        let newCampaignObject = new Campaign({
            name,
            users
        });

        newCampaignObject.save((err, campaign) => {
            if (err) {
                this.handleError(next, "Error saving new campaign", err);
            }
        });

        this.sendResponse(res, newCampaignObject.id);
    }

    async getCampaign(req: Request, res: Response, next: any): Promise<void> {
        let retrievedCampaign = await Campaign.findById(req.params.id, err => {
            if (err) {
                this.handleError(
                    next,
                    "Error querying for campaign with id of " + req.params.id,
                    err
                );
            }
        });

        this.sendResponse(res, retrievedCampaign);
    }

    async createMessage(req: Request, res: Response, next: any): Promise<void> {
        let campaignId = req.body.campaignId;
        let text: string = req.body.text;

        let newMessage: IMessage = {
            text,
            uuid: undefined,
            date: undefined,
            status: undefined,
            responses: undefined
        };


        Campaign.findOneAndUpdate(
            { _id: campaignId },
            { $push: { messages: newMessage } },
            { new: true },
            (err, campaign) => {
                if (err) {
                    this.handleError(next, "Error creating message", err)
                } else {
                    this.sendResponse(res, campaign.messages[campaign.messages.length - 1]);
                }
            }
        )
    }

    async getMessage(req: Request, res: Response, next: any): Promise<void> {
        let campaignId = req.params.campaignId;
        let msgId = req.params.id;
        let message: IMessage;

        Campaign.findById(campaignId)
            .then(async (campaign) => {
                let index: number = await indexOfMessageSearch(campaign.messages, msgId)
                message = campaign.messages[index];
                this.sendResponse(res, message);
            })
            .catch(err => this.handleError(next, "Error finding campaign with id: " + campaignId, err));
    }
}