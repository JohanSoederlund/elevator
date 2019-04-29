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
        anime({
            targets: "."+this.props.name,
            duration: 2000,
            translateY: this.shaftHeight,
            easing: 'easeInOutSine'
          });
    }

    //shaftHeight = "1400%";
    shaftHeight = 630;
    floorHeight = this.shaftHeight / 19;

    componentWillReceiveProps(nextProps){
        if(nextProps.floor!==this.props.floor){
        //if (true)
            anime({
                targets: "."+this.props.name,
                translateY: this.shaftHeight-Math.abs(this.floorHeight*(nextProps.floor-1))
                duration: Math.abs(2000*(nextProps.floor - this.props.floor)),
                easing: 'linear'
              });
            this.setState({floor: nextProps.floor});
        }
      }
      



    public render() {
        return (

            <div className={this.props.name}>
               <img src={door}></img>
                
            </div>
        );
    }
}

export default Elevator;

//{this.props.name}