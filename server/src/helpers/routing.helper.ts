import controllers from '../controllers';
import { Application } from 'express';

export default (app: Application) => {
    app.use('/', new controllers.MainController(app).router);
    console.log("Routing Initialized");
}
