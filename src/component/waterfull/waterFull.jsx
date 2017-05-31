/**
 *  - 必须指定每一项的renderItem 
 *  - 接收 datas集合
 *  - 宽度 由col 指定 并接收总宽度 width   不传默认为屏幕宽度
 */
import React, {Component, PropTypes} from 'react';
import css from "./waterFull.css";
export default class WaterFull extends Component {
        state = {
          itemMap:[]
        };
        constructor(prop) {
            super(prop);
            this.itemWidth = ((this.props.width || window.screen.width) / this.props.col) - (this.props.col*7.5);
        };
        componentDidMount(){
          
	    };

        componentWillReceiveProps (newProps) {
            this.reRenderItem(newProps.datas, newProps.col);
        };
        componentWillMount(){
            this.reRenderItem(this.props.datas, this.props.col);
	    };

        reRenderItem(datas, column) {
            var itemMp = [];
            for(var i =0; i < column; i++) {
                itemMp.push({col: i, list:[]});
            }
            for(var i =0; i < datas.length; i++) {
                itemMp[i%column].list.push(datas[i]);
            }
            this.setState({itemMap: itemMp});
        };

        renderColBox() {
             return this.state.itemMap.map((one, index)=> {
                return (
                    <div key={index} style={{width: this.itemWidth}} className={css.colBox} data-col={index}>
                            {
                                one.list.map((sone, i) => {
                                        var renderResult =  this.props.renderItem? this.props.renderItem(sone) : "<div>必须传递renderItem</div>";
                                        return (<div  className={css.itmeBox} key={i}>{renderResult}</div>)
                                })
                            }
                    </div>
                )
            })
        };
        render() {
            var colBox = this.renderColBox();
            return (
                <div className={css.wfBox}> 
                        {colBox}
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
