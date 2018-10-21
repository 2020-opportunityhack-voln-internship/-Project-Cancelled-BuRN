import controllers from '../controllers';
import { Application } from 'express';

export default (app: Application) => {
    app.use('/api', new controllers.MainController(app).router);
    console.log("Routing Initialized");
}
