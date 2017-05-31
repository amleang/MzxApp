import { combineReducers } from 'redux';
import actionKeys from '../constant/constant_action';

const seoState = {
      title:"",
      keywords:"",
      desc:"",
      time:"",
}
function SeoReducer(state = seoState, action) {
    switch (action.type) {
        case actionKeys.SEO:
          var res = Object.assign({}, state, action);
          if(typeof(window) != "undefined") {
              document.title = res.title || ""
          }
          return res
        default:
            return state;
    }
}

export default SeoReducer;
