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
    {floor: 1, destinations: [], index: 0, direction: ""},
    {floor: 1, destinations: [], index: 1, direction: ""},
    {floor: 1, destinations: [], index: 2, direction: ""},
    {floor: 1, destinations: [], index: 3, direction: ""},
    {floor: 1, destinations: [], index: 4, direction: ""}
]

let socket;

app.ws.use( async (ctx, next) => {

    ctx.websocket.on('message', async (message) => {
        console.log(message);
        socket = ctx.websocket;
        if (typeof message === 'object') {
            //elevators = message;

        } else {
            calculateElevatorChoice(message);
            /*
            let elevator = await calculateElevatorChoice(message);
            let response = JSON.stringify(elevator);
            ctx.websocket.send(response);
            */
        }
      }).bind(this);
    

    //Todo fix closing of socket
    ctx.websocket.on('close', () => {
        console.log("close");
        /*
        this.websocket.send('this will throw an error', (err) => {
          if (err) {
            this.websocket.emit('error', err))
          }
          */
      })

    ctx.websocket.close('message', (msg) => {
        console.log("close");
        console.log(msg);
    }).bind(this);

    //return next(ctx);
});

async function calculateElevatorChoice(targetFloor) {
    targetFloor = parseInt(targetFloor);

    //Return if elevator is on its way.
    let destinationExists = false;
    elevators.map(elevator => elevator.destinations.filter( (destination) => {
        if (destination === targetFloor || elevator.floor === targetFloor) {
            destinationExists = true;
        }
    }));
    if (destinationExists) return;
    
    let elevator = elevators.filter(function(element) {
        //filter for direction first
        if ( (element.direction === "up" && element.floor > targetFloor) || (element.direction === "down" && element.floor < targetFloor) ) return;
        else return element;
    }).reduce(function(prev, curr, index) {
        //filter for closest elevator
        return (Math.abs(curr.floor - targetFloor) < Math.abs(prev.floor - targetFloor) ? curr : prev);
    });

    elevator.destinations.push(targetFloor);
    
    if (elevator.destinations.length === 1) {
        //Update direction and update floor level every 2 seconds.
        if (elevator.destinations[0] < elevator.floor) elevator.direction = "down";
        else elevator.direction = "up";
        updateElevatorFloor(elevator);
        
    } else if(elevator.direction === "up") {
        elevator.destinations.sort((a, b) => a - b); // For ascending sort
    } else {
        elevator.destinations.sort((a, b) => b - a); // For descending sort
    }

    //Update public elevators object with new elevator data from choosen elevator.
    elevators[elevator.index] = elevator;

    //Send elevator object with new destination to client
    let response = JSON.stringify(elevator);
    socket.send(response);
    //return elevator;
}

/**
 * This recursive function will call itself until elevators last destination is fulfilled.
 * @param elevator {Object} description of an elevator
 */
async function updateElevatorFloor(elevator) {
    //Math.abs(elevator.destinations[0] - elevator.floor)*500
    let totalFloors = Math.abs(elevator.destinations[0] - elevator.floor)


    await timeout(1800);
    console.log("AFTER TIMEOUT");

    if (elevator.direction === "up") elevator.floor += 1;
    else elevator.floor -= 1;
    
    
    
    console.log(elevators[elevator.index]);
    //remove direction
    if (elevator.floor === elevator.destinations[0]) {
        elevator.destinations.shift();
        if (elevator.destinations.length > 0) {
            let response = JSON.stringify(elevator);
            socket.send(response);
            elevators[elevator.index] = elevator;
            updateElevatorFloor(elevator);
        } else {
            elevator.direction = "";
            elevators[elevator.index] = elevator;
        }
    } else {
        updateElevatorFloor(elevator);
    }
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

