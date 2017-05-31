
import React, {Component} from 'react';
import css from "./paginate.css";
import {Link} from 'react-router';
export default class PaginateView extends Component {
        state = {
            curpage:1,
            // hash:true,
            size:10,
            totals: 0,
            pix:5,
            indexBtn:css.defTheme,
            prevBtn:css.defTheme,
            nextBtn:css.defTheme,
            lastBtn:css.defTheme,
            gotoBtn:css.defTheme,
            pageArry:[],
            name:"",
            tPages:"",
        };
       
        componentDidMount(){
            window.addEventListener('totals', this.watchTotals());
            window.addEventListener('tPages', this.watchTPages());
	    };

        componentWillUnmount() {
            window.removeEventListener('totals', this.watchTotals());
            window.removeEventListener('tPages', this.watchTPages());
        };

        watchTotals() {
            let tPages = Math.ceil(this.props.totals/this.props.size | 10);
            this.setState({tPages: tPages});
        };

        watchTPages(){
            this.renderPages();
        };
        // 显示页码
        renderPages() {
            let curpage = this.state.curpage;
            let ay = [];
            curpage = isNaN(curpage*1)? 1: curpage*1;
            for(var i = this.state.pix; i >0; i--) {
                if(curpage - i <= 0) continue;
                ay.push(curpage - i);
            }
            ay.push(curpage);
            for(var i = 1; i <= this.state.pix; i++) {
                if(curpage + i > this.state.tPages) break;
                ay.push(curpage + i);
            }
            this.setState({pageArry:ay});
        };

        // 控制样式
        validateBtn() {
            this.state.indexBtn = this.state.prevBtn = this.state.lastBtn = this.state.nextBtn = css.defTheme;
            if(this.state.curpage == 1) {this.state.indexBtn = this.state.prevBtn = css.closeBtn;return false}
            if(this.state.curpage == this.state.tPages) {this.state.lastBtn = this.state.nextBtn = css.closeBtn; return false}
        };

        clickPage(page) {
            if(!page || isNaN(page*1) || page < 1 || page > this.state.tPages) return false;
            // let q = this.$route.query;
            // let path = this.$route.path.split("?")[0];
            // q.page = page*1;
            // this.state.curpage = page*1;
            this.setState({curpage:page});
            // if(this.hash) this.$router.go({path:path, query: q});  // 路由驱动
            // this.$dispatch("pagechange", {page:this.state.curpage});      // 事件驱动
            const { dispatch } = this.props;
            dispatch(pagechange());
            this.validateBtn();
            this.renderPages();
        };

        render() {
            let pageArray = this.state.pageArry.map((one,index) =>{
                return (
                    <div key={index}>
                        <span className={css.pageIndex}>
                                <span onClick={() => this.clickPage.call(this,one)} className="one == curpage?css.active:''">{one}</span>
                            </span>
                    </div>
                )
            });
            return (
                <div className={css.paginationBox} >
                aaa
                    <div className={css.pageCenter}>
                            <span className={css.indexBtn} onClick={() => this.clickPage.call(this,1)}>首页</span>
                            <span className={css.prevBtn}  onClick={() => this.clickPage.call(this,curpage-1)}>&lt;</span>
                            {pageArray}
                            <span className={css.nextBtn} onClick={() => this.clickPage.call(this,curpage*1+1)}>&gt;</span>
                            <span className={css.lastBtn}  onClick={() => this.clickPage.call(this,tPages)}>尾页</span>
                    </div>
                    <div className={css.gotoBox}>
                            跳转至
                            <input type="text" name="name"  value={this.state.name}  onChange={(e) => {this.setState({name: e.target.value})}} />
                            <span  className={css.gotoBtn}  onClick={() => this.clickPage.call(this,this.state.name)}>确定</span>
                    </div>
                </div>
            )
        }
}


