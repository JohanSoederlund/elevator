import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as cors from "kcors";

import * as Router from "koa-router";

import * as  websockify from 'koa-websocket';
import * as route from "koa-route";
import { json } from "body-parser";

import {ElevatorController} from './elevatorController';

const app = websockify(new Koa());
const router = new Router();

app.ws.use(route.all('/elevatorsocket', async function (ctx) {
    let elevatorController: ElevatorController = new ElevatorController(ctx.websocket);
    ctx.websocket.on('message', async (destination) => {
        try {
            destination = parseInt(destination);
            if (destination === 0) {
                elevatorController.reset();
            } else if(destination < 21 && destination > 0) {
                elevatorController.calculateElevatorChoice(destination);
            } else {
                throw new Error("Wrong floor destination"); 
            }
        } catch (error) {
            console.error(error);
        }
      }).bind(this);
}));

router.get("/sample", async (context) => {
    Object.assign(context.response, {
        body: {message: "Hello world"},
        status: 200,
    }); 
});

app.use(router.routes());
app.use(bodyparser({
    enableTypes: ["json"]
}))

app.listen(3000);

