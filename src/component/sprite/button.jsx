import React, {Component} from 'react';
import css from "./button.css";
import {Link} from 'react-router';
import $ from "jquery";
export default class AppView extends Component {
        state = {
           activeStyle:{}
        };
       
        componentDidMount(){
	    };

        componentWillMount(){
                if(typeof(isBrowser) =="undefined") return false;
                window.scrollTo(0,0);
        };
        
        handleClick() {
                this.setState({activeStyle: {}});
        };
        render() {
            return (
                    <Link       
                                                        style={{width: this.props.widths}}
                                                        className={this.props.btnClass =="red"? css.redBg: this.props.btnClass == "white"? css.whiteBg:this.props.btnClass=="redBorder"? css.redBorder:css.whiteBorder}
                                                        to={this.props.path}
                                                        onClick={this
                                                        .handleClick
                                                        .bind(this)}>
                                    <span className={this.props.btnNameColor =="red"? css.redFont: css.whiteFont}>{this.props.btnName}</span>
                    </Link>
            )
        }
}