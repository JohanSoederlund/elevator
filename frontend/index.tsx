import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Link, Route } from "react-router-dom";
import About from "./application/pages/about/AboutPage";
import Implementation from "./application/pages/data/ImplementationPage";
import Header from "./application/components/header/Header";
import "./index.scss";


ReactDOM.render(
    <BrowserRouter>
        <>
            <Header activeLink="about"/>
            <main>
                <Route exact path="/" component={About} />
                <Route path="/about" component={About} />
                <Route path="/implementation" component={Implementation} />
            </main>
        </>
    </BrowserRouter>,
    document.getElementById("app"));