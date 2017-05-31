
import React, {Component} from 'react';
import css from "./progress.css";
export default class ProgressView extends Component {
        state = {
            l:"http://s3.jzez100.com/s1/web-jzez/asset/liveCase/img-CaseSteps.png"
        };
        componentDidMount() {

	    };

        render() {
            let label = ["开工","水电工程","瓦工工程","木工工程","油漆工程","安装","完工"]
            let progress = this.props.data.map((one,index) =>{
                return (
                    <div key={index} className={css.container} style={{display: one.status == 1? "block" : "none"}}>
                        <div className={css.progress}  >
                            <img className={css.home} src={this.state.l}/>
                            <span style={{width: 0<index && index<5? "116px":"55px"}} className={css.label}>{label[index]}</span>
                            <span className={css.labelBorder}></span>
                        </div>
                        <img className={css.srcImg} src={one.src} />
                        <div className={css.text}>{one.text}</div>
                    </div>
                )
            });
            return (
                <div style={{marginTop:"57.5px",paddingBottom:"30px"}}>
                    {progress}
                </div>
            )
        }
}