import controllers from '../controllers';

export default (app) => {
    app.use('/', new controllers.MainController(app).router);
    app.logger.debug("Routing Initialized");
}
