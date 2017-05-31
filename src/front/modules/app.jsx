
import React, {Component, PropTypes} from 'react';
import css from "./app.css";
import Head from '../../component/head/top.jsx';
import Foot from '../../component/foot/foot.jsx';
export default class AppView extends Component {
        componentDidMount(){
	    };

        componentWillMount() {
        };

        render() {
            return (
                <div  className={css.app}>
                    <Head>
                        {this.props.children}
                        <Foot></Foot>
                    </Head>
                    
                </div>
            )
        }
}
