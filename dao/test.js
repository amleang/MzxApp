import db from "../mongo/db.js"
module.exports = {
    list: (params) => {
        return (done) => {
            var collection = db.findDocument('users', params, function(doc){
                done(null, doc)
            });
        }
    }
}
