import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as cors from "kcors";

import * as Router from "koa-router";

import * as  websockify from 'koa-websocket';
import { json } from "body-parser";

const app = websockify(new Koa());
//const app = new Koa();
const router = new Router();

/*
var corsOptions = {
    credentials: true,
    origin: 'http://localhost:8080',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
    "Access-Control-Allow-Origin": true
  }
  app.use(cors(
    corsOptions));
*/

let elevators = [
    {floor: 1, destinations: [], index: 0},
    {floor: 1, destinations: [], index: 1},
    {floor: 1, destinations: [], index: 2},
    {floor: 1, destinations: [], index: 3},
    {floor: 1, destinations: [], index: 4}
]

app.ws.use( async (ctx, next) => {

    ctx.websocket.on('message', async (message) => {
        console.log(message);
        if (typeof message === 'object') {
            //elevators = message;

        } else {
            let elevator = await calculateElevatorChoice(message);

            let response = JSON.stringify(elevator);
            ctx.websocket.send(response);
        }
      }).bind(this);
    //return next(ctx);
});

async function calculateElevatorChoice(targetFloor) {
    console.log(typeof targetFloor );
    targetFloor = parseInt(targetFloor);
    let elevator = elevators.reduce(function(prev, curr, index) {
        return (Math.abs(curr.floor - targetFloor) < Math.abs(prev.floor - targetFloor) ? curr : prev);
    });
    elevator.destinations.push(targetFloor);
    elevator.destinations.sort((a, b) => a - b); // For ascending sort
    //elevator.destinations.sort((a, b) => b - a); // For descending sort
    elevators[elevator.index] = elevator;
    updateElevatorFloor(elevator);

    //if destinations in queue await shift return false
    return elevator;
}

/**
 * todo update every 2 seconds
 * @param elevator 
 */
async function updateElevatorFloor(elevator) {
    await timeout(Math.abs(elevator.destinations[0] - elevator.floor)*500);
    console.log("AFTER TIMEOUT");
    elevator.floor = elevator.destinations[0];
    elevator.destinations.shift(); 
    elevators[elevator.index] = elevator;
    console.log(elevators[elevator.index]);
}

function timeout(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
  

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

