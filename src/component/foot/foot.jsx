import React from 'react';
import './foot.css';
export default class Foot extends React.Component {
    render() {
        return (
            <div className="foot">
                
                <div className='title'>专属服务</div>
                <div className='inner'>
                    <ul>   
                        <li>
                             <img src="https://static.vux.li/demo/2.jpg"/>
                             <div>师.设计</div>
                        </li>
                        <li>
                             <img src="https://static.vux.li/demo/2.jpg"/>
                             <div>匠.制作</div>
                        </li>
                        <li>
                             <img src="https://static.vux.li/demo/2.jpg"/>
                             <div>精.安装</div>
                        </li>
                        <li>
                             <img src="https://static.vux.li/demo/2.jpg"/>
                             <div>终身服务</div>
                        </li>
                    </ul>
                </div>
                
            </div>
        )
    }
}
