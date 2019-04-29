import * as React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

import anime from 'animejs';

interface IProperties {
    activeLink?: string;
}

interface IState {
    activeLink: string;
}

class Header extends React.Component<IProperties, IState> {
    constructor(props: IProperties) {
        super(props);
        this.state = {
            activeLink: props.activeLink !== undefined ? props.activeLink : "about",
        }
    }

    private toggleActive(activeLink: string) {
        this.setState({
            activeLink,
        });
    }

    componentDidMount() {
        anime({
          targets: '#lineDrawing .lines path',
          strokeDashoffset: [0, anime.setDashoffset],
          easing: 'easeInOutSine',
            duration: 3000,
          i: 10,
          delay: function(el, i) { 
            return i * 250 
          },
          
          loop: false
        });
    
        anime({
          duration: 5000,
          targets: '.my-path',
          fill: '#04a49c',
          easing: 'linear'
        });
      
    
        anime({
          targets: '.polymorph',
          points: [
            {value: '215,40 0,40 0,0 47,0 17,0'},
            {value: '215,40 0,40 0,0 0,0 17,0 17,0'},
            {value: '215,40 0,40 0,0 0,0 17,34 40,34'}
          ],
          duration: 2000,
          fill: 'rgb(4,164,156, 0.4)',
          easing: 'linear'
        });
      }

    public render() {
        const {
            activeLink
        } = this.state;

        return (
            <header>
                <svg viewBox="0 0 215 40">
                    <polygon className="polymorph" points="215,40 0,40 0,0 47.7,0 215,0"
                </svg></svg>

                <div id="lineDrawing">
                    <svg className="logo" width="150%" height="150%" viewBox="0 0 160.000000 44.000000"
                        preserveAspectRatio="xMidYMid meet">

                        <g className="lines" transform="translate(0.000000,44.000000) scale(0.100000,-0.100000)"
                        fill="#000000" stroke="#000000" strokeWidth="4">

                        <path className="my-path" d="M52 346 c-28 -52 -52 -97 -52 -100 0 -3 9 -6 20 -6 13 0 32 21 61 71
                        46 79 40 81 95 -18 l29 -53 123 0 124 0 -25 43 c-13 23 -39 68 -57 100 l-32
                        57 -116 0 -117 0 -53 -94z m292 0 c20 -35 36 -67 36 -70 0 -3 -33 -6 -72 -6
                        l-73 0 -35 63 c-19 34 -36 65 -38 70 -2 4 30 7 71 7 l75 0 36 -64z"/>

                        <path className="my-path" d="M0 194 c0 -3 24 -48 53 -100 l52 -94 117 0 116 0 32 57 c18 32 44 77
                        57 101 l25 42 -24 0 c-20 0 -32 -14 -63 -69 -22 -38 -43 -67 -47 -65 -4 3 -24
                        34 -44 69 l-36 65 -119 0 c-65 0 -119 -3 -119 -6z m244 -88 c20 -35 36 -67 36
                        -70 0 -3 -33 -6 -72 -6 l-73 0 -38 70 -38 70 75 0 74 0 36 -64z"/>
                        </g>
                    </svg>
                </div>
                <h1>STABELO</h1>
                <nav className="nav">
                    <ul>

                    

                        <a href="https://stabelo.se" ><img src="https://s3.eu-central-1.amazonaws.com/static.stabelo.net.eu-central-1/Stabelo_logo_RGB.png"  alt="Stabelo" /></a>

                        <li>
                            <Link className={activeLink === "about" ? "active" : ""} onClick={() => this.toggleActive("about")} to="/about">Om uppgiften</Link>
                        </li>
                        <li>
                            <Link className={activeLink === "implementation" ? "active" : ""} onClick={() => this.toggleActive("implementation")} to="/implementation">Implementation</Link>
                        </li>
                    </ul>
                </nav>
            </header>
        );
    }
}

export default Header;