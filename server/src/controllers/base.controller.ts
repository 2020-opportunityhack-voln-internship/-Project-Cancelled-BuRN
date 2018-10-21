/**
 * Imports
 */
import express, { Router, Request, Response, Application } from 'express';

export default class {

    app: Express.Application;
    router: Router;

    constructor(app: Express.Application) {
        this.app = app;
        this.router = express.Router();
    }

    async sendResponse(res: Response, data: any, status = 200): Promise<void> {
        if (!res || !data) {
            res.status(500).send("Internal server error");
            return;
        }

        res.status(status).send(data);
    }

    async handleError(next: any, msg: String, status = 500): Promise<void> {
        next({
            status: status,
            message: msg
        });
    }
}
