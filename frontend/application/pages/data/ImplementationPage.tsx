import * as React from "react";
import Websocket from "react-websocket";
import "./ImplementationPage.css";
import Elevator from "../../components/Elevator";
import Panel from "../../components/Panel";
import door from "../../images/elevator-door.svg";



class ImplementationPage extends React.Component {

    constructor() {
        super();
        this.state = {
            elevators: [
                {floor: 1, destinations: [], index: 0},
                {floor: 1, destinations: [], index: 1},
                {floor: 1, destinations: [], index: 2},
                {floor: 1, destinations: [], index: 3},
                {floor: 1, destinations: [], index: 4}
            ],
            elevator1: {floor: 1, destinations: [1], index: 0},
            elevator2: {floor: 1, destinations: [1], index: 1},
            elevator3: {floor: 1, destinations: [1], index: 2},
            elevator4: {floor: 1, destinations: [1], index: 3},
            elevator5: {floor: 1, destinations: [1], index: 4},
        }
    }

    componentDidMount() {
        console.log("component did mount ");
        
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log("handleData");
        console.log(result);
        switch(result.index) {
            case 0:
                this.setState( { elevator1: result } );
                break;
            case 1:
            console.log("CASE 1!!!");
                this.setState( { elevator2: result } );
                break;
            case 2:
                this.setState( { elevator3: result } );
                break;
            case 3:
                this.setState( { elevator4: result } );
                break;
            case 4:
                this.setState( { elevator5: result } );
                break;
            default:
          }
        
        console.log(this.state.elevator2.destinations[1]);
      }

      handleOpen(data) {
        console.log("handleOpen");
        console.log(data);
        //this.setState({count: this.state.count + result.movement});
      }

      sendMessage(message){
        this.refWebSocket.sendMessage(message);
      }

    public render() {

        return (

            <div className="building">

                <Websocket url='ws://localhost:3000/'
                    onMessage={this.handleData.bind(this)}
                    onOpen={this.handleOpen.bind(this)} onClose={this.handleClose} reconnect={true} debug={true}
                    ref={Websocket => {
                        this.refWebSocket = Websocket;
                }}/>

                <ul className="elevators">
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
                    <li className="shaft">
                        <Elevator name={"elevator5"} floor={this.state.elevator5.destinations[0]}/>
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
                

                
                
            </div>
        );
    }
}

export default ImplementationPage;



//<Panel refWebSocket={this.refWebSocket} ></Panel>