import * as React from "react";
import Websocket from "react-websocket";



class Panel extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log("component did mount panel ");
        
    }

    handleData(data) {
        let result = JSON.parse(data);
        console.log("handleData");
        console.log(result);
        //this.setState({count: this.state.count + result.movement});
      }

      handleOpen(data) {
        console.log("handleOpen");
        console.log(data);
        //this.setState({count: this.state.count + result.movement});
      }

      sendMessage(message){
        this.props.refWebSocket.sendMessage(message);
      }



    public render() {
        return (

            <div className="panel">

                <button onClick={() => this.sendMessage("19")} >19</button>
                <button onClick={() => this.sendMessage("18")} >18</button>
                <button onClick={() => this.sendMessage("17")} >17</button>
                <button onClick={() => this.sendMessage("16")} >16</button>
                <button onClick={() => this.sendMessage("15")} >15</button>
                <button onClick={() => this.sendMessage("14")} >14</button>
                <button onClick={() => this.sendMessage("13")} >13</button>
                <button onClick={() => this.sendMessage("12")} >12</button>
                <button onClick={() => this.sendMessage("11")} >11</button>
                <button onClick={() => this.sendMessage("10")} >10</button>
                <button onClick={() => this.sendMessage("9")} >9</button>
                <button onClick={() => this.sendMessage("8")} >8</button>
                <button onClick={() => this.sendMessage("7")} >7</button>
                <button onClick={() => this.sendMessage("6")} >6</button>
                <button onClick={() => this.sendMessage("5")} >5</button>
                <button onClick={() => this.sendMessage("4")} >4</button>
                <button onClick={() => this.sendMessage("3")} >3</button>
                <button onClick={() => this.sendMessage("2")} >2</button>
                <button onClick={() => this.sendMessage("1")} >1</button>
            </div>
        );
    }
}

export default Panel;

