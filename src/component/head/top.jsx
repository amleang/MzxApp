
import React from 'react';
import './head.css';
import Headleft from './left.jsx';
export default class Head extends React.Component {
    state = {
        isLeft: false,
        leftClass: '',
        contentClass: ''
    }
    menuClick() {
        if (this.state.isLeft) {
             
            this.setState({
                leftClass: "leftml",
                contentClass: 'contentml',
                isLeft: false
            })
            setTimeout(function() {
                 $("html").removeClass("navopen");
            }, 3000);
           
        }
        else {
            $("html").addClass("navopen");
            this.setState({
                leftClass: "leftmr",
                contentClass: 'contentmr',
                isLeft: true
            })
            
        }

        

    };
    render() {
        return (
            <div>
                <link rel="stylesheet" href="/animation.css"/>
                <Headleft leftClass={this.state.leftClass}></Headleft>
                <div className={`content ${this.state.contentClass}`}>
                    <div className="head">
                        <div className="inner">
                            <div className="menu-icon" onClick={() => this.menuClick()}></div>
                            <div className="title">美洲象</div>
                        </div>
                    </div>
                    <div className="main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        )
    }
}
