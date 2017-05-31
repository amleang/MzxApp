import React, {Component, PropTypes} from 'react';
import css from "./bomb.css";
export default class Reservation extends Component {
    state = {
        status: "",
        list: [
            {
                src: "http://s3.jzez100.com/s1/web-jzez/asset/icon-Success.png",
                content: "恭喜你！提交成功",
                class: css.red
            }
        ]
    };

    checkStatus() {
        if (s == "success") {} else if (s == "fail") {}
    };
    componentDidMount() {};
    componentWillMount() {};

    componentWillReceiveProps(cur) {
        if (cur.showBomb) {
            setTimeout(() => {
                this
                    .props
                    .bombChange(false);
            }, 800)
        }
    };

    componentWillUnmount() {};

    render() {
        let status = this.state.status;
        let cur = this
            .state
            .list
            .map((one, index) => {
                return (
                    <div className={css.bombBox} key={index}>
                        <div
                            style={{
                            display: "flex"
                        }}>
                            <img className={css.img} src={one.src}/>
                            <span className={one.class}>{one.content}</span>
                        </div>
                    </div>
                )
            });
        return (
            <div
                style={{
                display: this.props.showBomb == true
                    ? "block"
                    : "none"
            }}
                ref="bomb">
                <div className={css.outContainer}>
                    {cur}
                </div>
            </div>
        )
    }
}