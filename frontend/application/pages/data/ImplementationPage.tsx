import * as React from "react";
import Websocket from "react-websocket";
import "./ImplementationPage.css";
import Elevator from "../../components/Elevator";
import Panel from "../../components/Panel";
import Information from "../../components/Information";
import door from "../../images/elevator-door.svg";

class ImplementationPage extends React.Component {

    constructor() {
        super();
        this.state = {
            websocket: {},
            information: "",    
            elevator0: {floor: 1, destinations: [1], elevatorNumber: 0},
            elevator1: {floor: 1, destinations: [1], elevatorNumber: 1},
            elevator2: {floor: 1, destinations: [1], elevatorNumber: 2},
            elevator3: {floor: 1, destinations: [1], elevatorNumber: 3},
            elevator4: {floor: 1, destinations: [1], elevatorNumber: 4},
        }
    }

    handleData(data) {
        let result = JSON.parse(data);
        let information = "Elevator number " + result.elevatorNumber + " on floor " + result.floor + ", will soon arrive at floor " + result.destinations[0] + ".";
        this.setState( { information: information} );

        switch(result.elevatorNumber) {
            case 0:
                this.setState( { elevator0: result } );
                break;
            case 1:
                this.setState( { elevator1: result } );
                break;
            case 2:
                this.setState( { elevator2: result } );
                break;
            case 3:
                this.setState( { elevator3: result } );
                break;
            case 4:
                this.setState( { elevator4: result } );
                break;
            default:
          }
      }

      handleOpen(data) {
        this.setState({websocket: this.refWebSocket});
      }

      sendMessage(message){
        this.refWebSocket.sendMessage(message);
        this.setState( {
            information: "";
            elevator0: {floor: 1, destinations: [1], elevatorNumber: 0},
            elevator1: {floor: 1, destinations: [1], elevatorNumber: 1},
            elevator2: {floor: 1, destinations: [1], elevatorNumber: 2},
            elevator3: {floor: 1, destinations: [1], elevatorNumber: 3},
            elevator4: {floor: 1, destinations: [1], elevatorNumber: 4},
        } );
      }

    public render() {

        return (
            
            <div className="building">
                <button className="reset" onClick={() => this.sendMessage(0)} >Reset elevators</button>

                <Websocket url='ws://localhost:3000/'
                    onMessage={this.handleData.bind(this)}
                    onOpen={this.handleOpen.bind(this)} onClose={this.handleClose} reconnect={true} debug={true}
                    ref={Websocket => {
                        this.refWebSocket = Websocket;
                }}/>

                <ul className="elevators">
                    <li className="shaft">
                        <Elevator name={"elevator0"} floor={this.state.elevator0.destinations[0]}/>
                    </li>
                    <li className="shaft">
                        <Elevator name={"elevator1"} floor={this.state.elevator1.destinations[0]}/>
                    </li>
                    <li className="shaft">
                        <Elevator name={"elevator2"} floor={this.state.elevator2.destinations[0]}/>
                    </li>
                    <li className="shaft">
                        <Elevator name={"elevator3"} floor={this.state.elevator3.destinations[0]}/>
                    </li>
                    <li className="shaft">
                        <Elevator name={"elevator4"} floor={this.state.elevator4.destinations[0]}/>
                    </li>
                    <li>
                        <Panel websocket={this.state.websocket}/>
                    </li>
                </ul>
                
                <Information information={this.state.information}></Information>                
            </div>
        );
    }
}

export default ImplementationPage;

