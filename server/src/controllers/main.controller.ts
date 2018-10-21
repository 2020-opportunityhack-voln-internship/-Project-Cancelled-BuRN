import BaseController from './base.controller';
import express, { Router, Request, Response, Application } from 'express';


export default class extends BaseController {
    constructor(app: Express.Application) {
        super(app);

        // this.router.post('/campaign', this.createCampaign);
    };

    // async createCampaign(req, res, next) {

    // }
}
