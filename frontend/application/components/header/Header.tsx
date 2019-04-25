import * as React from "react";
import { Link } from "react-router-dom";

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

    public render() {
        const {
            activeLink
        } = this.state;

        return (
            <header>
                <nav>
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