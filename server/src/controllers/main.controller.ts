import BaseController from './base.controller';
import { Campaign, User, Message } from '../models/Campaign';

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
        let users = [];

        // Do validation

        for (let user of req.body.users) {
            users.push(new User({
                name: user.name,
                email: user.email,
                phone: user.phone
            }));
        }

        let newCampaignObject = new Campaign({
            name,
            users
        });

        newCampaignObject.save((err, campaign) => {
            if (err) {
                this.handleError(next, "Error saving new campaign");
            }
        });

        this.sendResponse(res, newCampaignObject.id);
    }

    async getCampaign(req: Request, res: Response, next: any): Promise<void> {
        let retrievedCampaign = await Campaign.findById(req.params.id, err => {
            if (err) {
                this.handleError(
                    next,
                    "Error querying for campaign with id of " + req.params.id
                );
            }
        });

        this.sendResponse(res, retrievedCampaign);
    }

    async createMessage(req: Request, res: Response, next: any): Promise<void> {
        let campaignId = req.body.campaignId;
        let text = req.body.text;

        let newMessage = new Message({
            text
        });

        Campaign.findOneAndUpdate(
            { _id: campaignId },
            { $push: { messages: newMessage } },
            err => {
                if (err) {
                    this.handleError(next, "Error creating new message");
                }
            }
        );

        this.sendResponse(res, newMessage);
    }

    // async getMessage(req: Request, res: Response, next: any): Promise<void> {
    //     let msgId = req.params.id;

    //     let campaign = Campaign.find({ message: { $exists: } })
    // }
}