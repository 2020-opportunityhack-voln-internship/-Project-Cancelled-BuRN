"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const password = 'test';
const secret = 'test';
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.post('/login', (req, res) => {
    console.log(req);
    if (req.body.password == password) {
        res.cookie('authorization', secret, {});
        res.sendStatus(201);
    }
    else {
        res.sendStatus(401);
    }
});
app.use((req, res, next) => {
    if (req.headers.authorization == secret || req.cookies.authorization == secret) {
        next();
    }
    else {
        res.sendStatus(401);
    }
});
app.get('/', (req, res) => {
    res.send("Hello, world!").status(200);
});
app.listen(3000, () => {
    console.log("Listening on port 3000");
});
//# sourceMappingURL=index.js.map