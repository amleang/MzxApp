
import React from 'react';
import './head.css';
export default class Headleft extends React.Component {
    render() {
        const { leftClass } = this.props
        return (
            <div className={`left ${leftClass}`} >
                <div className="leftmenu">
                    <div><h5>目录</h5></div>
                    
                    <ul className="menuul">
                        <li>
                            <a href="#">首页</a>
                        </li>
                        <li>
                            <a href="#">产品中心</a>
                        </li>
                        <li>
                            <a href="#">首页</a>
                        </li>
                        <li>
                            <a href="#">首页</a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
}
