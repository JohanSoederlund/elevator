import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as cors from "kcors";

import * as Router from "koa-router";

import * as  websockify from 'koa-websocket';
import { json } from "body-parser";

import {ElevatorController} from './elevatorController';

const app = websockify(new Koa());
const router = new Router();

let elevators = [
    {floor: 1, destinations: [], index: 0, direction: ""},
    {floor: 1, destinations: [], index: 1, direction: ""},
    {floor: 1, destinations: [], index: 2, direction: ""},
    {floor: 1, destinations: [], index: 3, direction: ""},
    {floor: 1, destinations: [], index: 4, direction: ""}
]

app.ws.use( async (ctx, next) => {
    let elevatorController: ElevatorController = new ElevatorController(ctx.websocket);
    ctx.websocket.on('message', async (destination) => {
        try {
            destination = parseInt(destination);
            if (destination === 0) {
                console.log("reset");
                elevatorController.reset();
            } else if(destination < 21 && destination > 0) {
                elevatorController.calculateElevatorChoice(destination);
            } else {
                throw new Error("Wrong floor destination"); 
            }
        } catch (error) {
            
        }

        
        
      }).bind(this);

});

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

