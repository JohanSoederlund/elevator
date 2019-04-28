import * as React from "react";
import door from "../images/elevator-door.svg";

import anime from 'animejs';

class Elevator extends React.Component {

    constructor(){
        super();
        this.state={
          floor : 1
        }
      }

    componentDidMount() {
        console.log("component did mount 2");
        console.log(this.props.name);
        
        
        anime({
            targets: "."+this.props.name,
            //targets: ".elevator1",
            //targets: ".door",
            duration: 2000,
            translateY: this.shaftHeight,
            easing: 'easeInOutSine'
          });
          
    }

    shaftHeight = 630;
    floorHeight = this.shaftHeight / 19;

    componentWillReceiveProps(nextProps){
        console.log("\n\n");
        console.log("componentWillReceiveProps");
        console.log(nextProps.floor);
        console.log(this.props.floor);
        console.log(this.props.name);
        if(nextProps.floor!==this.props.floor){
        //if (true)
            anime({
                targets: "."+this.props.name,
                translateY: this.shaftHeight-Math.abs(this.floorHeight*(nextProps.floor-1))
                //duration: Math.abs(2000*(nextProps.floor - this.props.floor)),
                easing: 'easeInOutSine'
              });
            this.setState({floor: nextProps.floor});
        }
      }
      



    public render() {
        console.log(this.props.name);
        return (

            <div className={this.props.name}>
               <img src={door}></img>
                
            </div>
        );
    }
}

export default Elevator;

//{this.props.name}