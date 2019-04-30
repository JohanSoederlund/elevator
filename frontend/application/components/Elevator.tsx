import * as React from "react";
import door from "../images/elevator-door.svg";

import anime from 'animejs';

class Elevator extends React.Component {

  const elevatorTimePerFloor = 2000;
  const shaftHeight = 630;
  const floorHeight = this.shaftHeight / 19;

  constructor(){
    super();
    this.state={
      floor : 1
    }
  }

  componentDidMount() {
    anime({
      targets: "."+this.props.name,
      duration: this.elevatorTimePerFloor,
      translateY: this.shaftHeight,
      easing: 'easeInOutSine'
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.floor!==this.props.floor){
      //Targets this one single elevator and animates it's movement.
      anime({
        targets: "."+this.props.name,
        translateY: this.shaftHeight-Math.abs(this.floorHeight*(nextProps.floor-1))
        duration: Math.abs(this.elevatorTimePerFloor*(nextProps.floor - this.props.floor)),
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
