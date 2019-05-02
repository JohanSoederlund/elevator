import * as React from "react";
import Websocket from "react-websocket";
import "./ImplementationPage.css";
import Elevator from "../../components/Elevator";
import Panel from "../../components/Panel";
import door from "../../images/elevator-door.svg";

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

class ImplementationPage extends React.Component {

    constructor() {
        super();
        this.state = {
            information: "";
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
      }

      sendMessage(message){
        this.refWebSocket.sendMessage(message);
        if (message === 0) {
            this.setState( {
                information: "";
                elevator0: {floor: 1, destinations: [1], elevatorNumber: 0},
                elevator1: {floor: 1, destinations: [1], elevatorNumber: 1},
                elevator2: {floor: 1, destinations: [1], elevatorNumber: 2},
                elevator3: {floor: 1, destinations: [1], elevatorNumber: 3},
                elevator4: {floor: 1, destinations: [1], elevatorNumber: 4},
            } );
        }
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
                        <div className="panel">
                            <button onClick={() => this.sendMessage(20)} >20</button>
                            <button onClick={() => this.sendMessage(19)} >19</button>
                            <button onClick={() => this.sendMessage(18)} >18</button>
                            <button onClick={() => this.sendMessage(17)} >17</button>
                            <button onClick={() => this.sendMessage(16)} >16</button>
                            <button onClick={() => this.sendMessage(15)} >15</button>
                            <button onClick={() => this.sendMessage(14)} >14</button>
                            <button onClick={() => this.sendMessage(13)} >13</button>
                            <button onClick={() => this.sendMessage(12)} >12</button>
                            <button onClick={() => this.sendMessage(11)} >11</button>
                            <button onClick={() => this.sendMessage(10)} >10</button>
                            <button onClick={() => this.sendMessage(9)} >9</button>
                            <button onClick={() => this.sendMessage(8)} >8</button>
                            <button onClick={() => this.sendMessage(7)} >7</button>
                            <button onClick={() => this.sendMessage(6)} >6</button>
                            <button onClick={() => this.sendMessage(5)} >5</button>
                            <button onClick={() => this.sendMessage(4)} >4</button>
                            <button onClick={() => this.sendMessage(3)} >3</button>
                            <button onClick={() => this.sendMessage(2)} >2</button>
                            <button onClick={() => this.sendMessage(1)} >1</button>
                        </div>
                    </li>

                    
                </ul>
                
                <Card className="card">
                    <CardHeader
                        title="Information Panel"
                        subheader="Elevators latest action"
                    />
                    
                    <CardContent>
                        <Typography paragraph>
                            {this.state.information}
                        </Typography>
                        
                    </CardContent>
                </Card>
                
                
            </div>
        );
    }
}

export default ImplementationPage;

