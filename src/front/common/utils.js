require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch'
import qs from 'querystring'
const assignExtend = Object.assign || require('object.assign');
let utils = {
    fetchGet: function(api, params) {
        if(Object.keys(params).length != 0) {
            api = api + "?" + qs.stringify(params);
        }
        return fetch(api, {})
               .then(function(res) {
                    if (res.status != 200) {
                        throw new Error("Bad response from server");
                    }
                    return res.json();
                }).catch(function(e) {throw new Error(e.message);})
    },

    fetchPost: function(api, params) {
        let options = {
            method: 'POST',
            credentials: 'same-origin'
        }
        if(typeof(params) == "string") {
            options.headers = {
                'Accept': 'application/json'
            };
            options.mode = "no-cors";
            options.body = params
        }
        else {
            options.headers = {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            };
            options.body = JSON.stringify(params);
        }
        return fetch(api, options).then(function(res){
            if (res.status != 200) {
                        throw new Error("Bad response from server");
                    }
                    return res.json();
                }).catch(function(e) {throw new Error(e.message);})
    },

    fetchDelete: function(api, params) {
        return fetch(api, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
            credentials: 'same-origin'
        });
    },

    fetchPut: function (api, params) {
        return fetch(api, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(params),
                credentials: 'same-origin'
            })
            .then(this.middleFecth)
            .then(this.middleFinal);
    },

    assignObj:function (oldObject, newObject){
  		    return assignExtend({}, oldObject, newObject);
		},
    
    //日期转换 
    formatDate:function (date) {  
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? '0' + m : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        return y + '-' + m + '-' + d;  
    }, 
}
export default utils
