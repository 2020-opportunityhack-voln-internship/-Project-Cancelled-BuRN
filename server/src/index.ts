import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dispatcher from './dispatcher';
import mongoose from 'mongoose';
import helpers from './helpers';
import { Delivery } from './models/Delivery';
import { Campaign } from './models/Campaign';
import { indexOfMessageSearch } from './helpers/messageSender.helper';
import path from 'path';
import { startup } from './helpers/startup.helper';
const password = process.env.ADMIN_PASSWORD || 'test';
const secret = 'test';

const mongoUrl = process.env.MONGO_URL || 'mongodb://mongo/ohack'
mongoose.connect(mongoUrl);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: true
}))

app.use('/', express.static('public'));

app.post('/smsresponse', (req: Request, res: Response) => {
  debugger;
  console.log("Received response", req.body);
  const user_identifier = req.body.From;
  Delivery.findOne({user: user_identifier}).sort({date: -1}).limit(1)
    .then(async(delivery) => {
      console.log("Found delivery by user", delivery);
      const campaign = await Campaign.findById(delivery.campaign);
      console.log("Found the campaign");
      const index = await indexOfMessageSearch(campaign.messages, delivery.message);
      console.log("Found the index of the message", campaign, index);
      campaign.messages[index].responses.push({
        user: user_identifier,
        text: req.body.Body,
        date: Date.now()
      });
      console.log(campaign.messages);
      return campaign.save();
    })
    .catch(error => {
      res.status(500).send("Failed to handle response");
    });
});

app.post('/api/login', (req: Request, res: Response) => {
  console.log(req);
  if (req.body.password == password) {
    res.cookie('authorization', secret, {
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(401);
  }
});

// app.use((req: Request, res: Response, next) => {
//   if (req.headers.authorization == secret || req.cookies.authorization == secret) {
//     next();
//   } else {
//     res.sendStatus(401);
//   }
// });

app.get('/testing', (req: Request, res: Response) => {
  res.send("Hello, josh!").status(200);
  dispatcher.sms.sendMessage("Hello!!!", { phoneNumber: "+12092757002" })
});

try {
  helpers.routing(app);

  app.use('/*', (req, res, next) => {
    res.status(200).sendFile(path.resolve(__dirname + '../../public/index.html'));
  });

  app.use((err: any, req: Request, res: Response, next: any) => {
    console.log(err);

    if (err) {
      res.status(err.status).send(err.message);
      return;
    }
    res.status(200).sendFile(path.resolve(__dirname + '../../public/index.html'));
  })
} catch (err) {
  console.error(err);
}

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

startup();
