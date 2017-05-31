/**
 * 瀑布流每一项要有明确的高度，所以瀑布流不能有 absolute样式
 *  - 必须指定每一项的renderItem 
 *  - 接收 datas集合
 *  - 宽度 由col 指定 并接收总宽度 width   不传默认为屏幕宽度
 */
import React, {Component, PropTypes} from 'react';
import css from "./waterFull.css";
import {Link} from 'react-router';
export default class WaterFull extends Component {
        state = {
            datasOffHeight:[],
            tHeight: 0,
            opacity:0
        };
        constructor(prop) {
            super(prop);
            this.itemWidth = (this.props.width || window.screen.width) / this.props.col;
        };
        componentDidMount(){
            var wf = $(this.refs.wfBox);
            var wfItem = wf.find("."+css.wfOne);
            var tpHeight = [];
            var lHeight = 0;
            var tp = this.state.datasOffHeight;
            var loadCounts = 0
            for(var i = 0; i < wfItem.length; i++) {
                var one = $(wfItem[i]);
                if(one.attr("reset") == "ok") continue;
                var nIndex = i+this.props.col;
                var img=new Image(); 
                img.onload= function(ni, oi, target) {
                    loadCounts++;
                    var height = target.height();
                    if(loadCounts%4 == 0) {
                        tpHeight.sort(function(a, b){return b-a});
                        lHeight += tpHeight[0] || 0;
                        tpHeight = [];
                    }
                    tpHeight.push(height);
                    if(tp[ni]) tp[ni].top = height + 5*(i/this.props.col); 
                    setTimeout(()=> {
                        this.setState({datasOffHeight: tp, tHeight: lHeight, opacity: 1});
                    }, 20);
                }.bind(this, nIndex, i, one)
                img.onerror=function(){alert("error!")};  
                img.src= this.props.datas[i].url;  
            }
            
          
	    };
        getWf() {
            if(!this.props.datas) return "";
            return this.props.datas.map((one, index)=> {
                var renderResult =  this.props.renderItem? this.props.renderItem(one) : "<div>必须传递renderItem</div>";
                var indexRow = (index%this.props.col)*this.itemWidth + 5*(index%this.props.col);
                this.state.datasOffHeight.push({width: this.itemWidth, left: indexRow, top: 0});
                return (
                    <div key={index} className={css.wfOne} style={this.state.datasOffHeight[index]}>
                            {renderResult}
                    </div>
                )
            })
        };
        render() {
            var wfArea = this.getWf();
            return (
                <div className={css.wfBox} ref="wfBox" style={{height: this.state.tHeight, margin: "30px auto", opacity: this.state.opacity}}> 
                        {wfArea}
                </div>
            )
        }
}
WaterFull.propTypes = {
    renderItem: PropTypes.func.isRequired,
    col: React.PropTypes.number.isRequired,
    datas: React.PropTypes.array.isRequired,
    width: React.PropTypes.number
};
