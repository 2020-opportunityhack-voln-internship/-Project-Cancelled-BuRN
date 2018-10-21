import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dispatcher from './dispatcher';

const password = 'test';
const secret = 'test';

const app = express();

app.use(bodyParser.json());
app.use(cookieParser());

app.post('/login', (req: Request, res: Response) => {
  console.log(req);
  if (req.body.password == password){
    res.cookie('authorization', secret, {
    });
    res.sendStatus(201);
  } else {
    res.sendStatus(401);
  }
});

app.use((req: Request, res: Response, next) => {
  if (req.headers.authorization == secret || req.cookies.authorization == secret){
    next();
  } else {
    res.sendStatus(401);
  }
});

app.get('/', (req: Request, res: Response) => {
  res.send("Hello, world!").status(200);
  dispatcher.sms.sendMessage("Hello!!!", { phoneNumber: "+12092757002" })
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
