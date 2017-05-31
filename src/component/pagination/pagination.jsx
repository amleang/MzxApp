
import React, {Component} from 'react';
import css from "./pagination.css";
import {Link} from 'react-router';
export default class paginationView extends Component {
    state = {
        current: 1, value : ''
    };

    componentDidMount() {
        var val = this.state.value;
        if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(val);
    };


    handClick (e){
            this.setState({current : e});
            var val = e;
            if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(val);
    };

    handClickTotal (){
        if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(this.props.total);
        this.setState({current : this.props.total});
    };

    goNext (){
        let cur = this.state.current;
        if(cur < this.props.total){
            var curAdd = cur +1;
            this.setState({current : curAdd});
        }
            if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(curAdd);
    };
    goPrev (){
        let cur = this.state.current;
        if(cur > 1){
            var curReduce = cur - 1;
            this.setState({current : curReduce});
        }
            if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(curReduce);
    };
    goPage (){
        var val = this.state.value;
        if(!/^[1-9]\d*$/.test(val)){
            alert('页码只能输入大于1的正整数');
            return ;
        }else if(parseInt(val) > parseInt(this.props.total)){
            alert('没有这么多页');
            return ;
        }else{
            this.setState({current : val});
        }
        if(this.props && this.props.turnIntoCurPage) this.props.turnIntoCurPage(val);
    };
    render (){
        let self = this;
        let total = this.props.total;
        let cur = this.state.current;
        let items = [];
        let begin;
        let len;
        if(total > 5){
            len = 5;
            if(cur >= (total-2)){
                begin = total - 4;
            }else if(cur <= 3){
                begin = 1;
            }else{
                begin = cur - 2;
            }
        }else{
            len = total;
            begin = 1;
        }
        for(let i = 0; i < len; i ++){
            let cur = this.state.current;
            let showI = begin + i;
            if(cur == showI){
                items.push({num : showI, cur : true});
            }else{
                items.push({num : showI, cur : false});
            }
            
        }
        let num = items.map((item,num) =>{
            return (
                <span key={num}>
                        <a onClick={() => this.handClick.call(this,item.num)} className={item.cur? css.numCurrent : css.num}>{item.num}</a>
                </span>
            )
        });
        
        return  (
                <div style={{display: total>0? "block":"none"}}>
                    <div className={css.uiPagnation}>
                        <a className={this.state.current == 1? css.prevDisable : css.prev} onClick={() => this.goPrev.call(this)}>&lt;</a>
                            {num}
                        <span className={css.dot} style={{display: total>5? "block" : "none"}}>...</span>
                        <a onClick={() => this.handClickTotal.call(this)} className={css.num} style={{display: total>5? "block" : "none"}}>{total}</a>
                        <a className={this.state.current == this.props.total? css.nextDisable : css.next} onClick={() => this.goNext.call(this)}>&gt;</a>
                        <div className={css.fl}>
                            
                            
                            <input type="text" value={this.state.value} onChange={(e) => {this.setState({value: e.target.value})}}/>
                            
                        </div>
                        <a onClick={()=> this.goPage.call(this)} className={css.pageGo}>确定</a>
                        <div style={{clear:"both"}}></div>
                    </div>
                   <div style={{clear:"both"}}></div>
                </div>
            )
    }
    
}



