
import React, {Component, PropTypes} from 'react';
import css from "./input.css";

export default class InputView extends Component {
        state = {
          
        };

        componentDidMount(){
            
	    };
       
        render() {
            return (
                <div  style={{width:this.props.width}} className={css.input}>
                   <input type="text" />
                </div>
            )
        }
}
