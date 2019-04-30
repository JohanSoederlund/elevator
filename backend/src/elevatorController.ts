

//let 

export class ElevatorController {

    public socket: any;

    private readonly elevatorTimePerFloor: number = 2000;
    private readonly elevatorStopPerFloor: number = 200;

    private elevators = [
        {floor: 1, destinations: [], elevatorNumber: 0, direction: ""},
        {floor: 1, destinations: [], elevatorNumber: 1, direction: ""},
        {floor: 1, destinations: [], elevatorNumber: 2, direction: ""},
        {floor: 1, destinations: [], elevatorNumber: 3, direction: ""},
        {floor: 1, destinations: [], elevatorNumber: 4, direction: ""}
    ]

    constructor(socket: any) {
        this.socket = socket;
    }

    public reset() {
        this.elevators = [
            {floor: 1, destinations: [], elevatorNumber: 0, direction: ""},
            {floor: 1, destinations: [], elevatorNumber: 1, direction: ""},
            {floor: 1, destinations: [], elevatorNumber: 2, direction: ""},
            {floor: 1, destinations: [], elevatorNumber: 3, direction: ""},
            {floor: 1, destinations: [], elevatorNumber: 4, direction: ""}
        ]
    }

    public async calculateElevatorChoice(targetFloor) {
        if (this.destinationAlreadyExist(targetFloor)) return;
        
        //Pick the best elevator
        let elevator = this.elevators.filter(function(element) {
            //filter for direction first
            if ( (element.direction === "up" && element.floor > targetFloor) || (element.direction === "down" && element.floor < targetFloor) ) return;
            else return element;
        }).reduce(function(prev, curr) {
            //filter for closest elevator
            return (Math.abs(curr.floor - targetFloor) < Math.abs(prev.floor - targetFloor) ? curr : prev);
        });

        elevator.destinations.push(targetFloor);
        
        if (elevator.destinations.length === 1) {
            //Update direction and update floor level every 2 seconds.
            (elevator.destinations[0] < elevator.floor) ? elevator.direction = "down" : elevator.direction = "up"
            this.updateElevatorFloor(elevator);
            
        } else if(elevator.direction === "up") {
            elevator.destinations.sort((a, b) => a - b); // For ascending sort
        } else {
            elevator.destinations.sort((a, b) => b - a); // For descending sort
        }

        //Update public elevators object with new elevator data from choosen elevator.
        this.elevators[elevator.elevatorNumber] = elevator;

        //Send elevator object with new destination to client
        let response = JSON.stringify(elevator);
        this.socket.send(response);
    }

    private destinationAlreadyExist(targetFloor) {
        let destinationExists = false;

        //Return if elevator is on its way.
        this.elevators.map(elevator => elevator.destinations.filter( (destination) => {
            if (destination === targetFloor) destinationExists = true;
        }));
            
        //return if elevator already is on floor
        this.elevators.filter( (elevator) => { if (elevator.floor === targetFloor) destinationExists = true;});
        return destinationExists;
    }

    /**
     * This recursive function will call itself until elevators last destination is fulfilled.
     * @param elevator {Object} description of an elevator
     */
    private async updateElevatorFloor(elevator) {
        //Math.abs(elevator.destinations[0] - elevator.floor)*500
        let totalFloors = Math.abs(elevator.destinations[0] - elevator.floor)

        await this.timeout(this.elevatorTimePerFloor);

        if (elevator.direction === "up") elevator.floor += 1;
        else elevator.floor -= 1;
        
        
        console.log("UPDATE ELEV");
        console.log(this.elevators[elevator.elevatorNumber]);
        //remove direction
        if (elevator.floor === elevator.destinations[0]) {
            elevator.destinations.shift();
            await this.timeout(this.elevatorStopPerFloor);
            console.log(this.elevators[elevator.elevatorNumber]);
            if (elevator.destinations.length > 0) {
                let response = JSON.stringify(elevator);
                this.socket.send(response);
                this.elevators[elevator.elevatorNumber] = elevator;
                this.updateElevatorFloor(elevator);
            } else {
                elevator.direction = "";
                this.elevators[elevator.elevatorNumber] = elevator;
            }
        } else {
            this.updateElevatorFloor(elevator);
        }
    }

    private timeout(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

}
