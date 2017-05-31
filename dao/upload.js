import db from "../mongo/db.js"
module.exports = {
    addBuildData: (doc) => {
        
        return (done) => {
            var collection = db.insertDocuments(db.BUILDPRICE, doc, function(err, result){
                if(err) done(null, null)
                done(null, result)
            });
        }
    }
}
