import * as React from "react";
import Websocket from "react-websocket";

class Panel extends React.Component {

    constructor(props){
        super(props);
        this.state={}
    }

    sendMessage(message){
        this.state.websocket.sendMessage(message);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.websocket !== this.props.websocket){
            this.setState({websocket: nextProps.websocket});
        }
    }

    public render() {

        return (
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
        );
    }
}

export default Panel;

