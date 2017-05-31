import mongo from "../mongo/db.js";
var ObjectId = require('mongodb').ObjectID;
module.exports = {
    list: (params) => {
        return (done) => {
            mongo.findSpecifiedSortedDocuments(mongo.ARTICLES, params, {content: 0}, {index: -1}, (results) => {
                done(null, results)
            });
        }
    },

     find: (_id) => {
        //  console.log(_id);
        return (done) => {
            mongo.findDocument(mongo.ARTICLES, {_id: new ObjectId(_id)}, (doc) => {
                done(null, doc || "");
            })
        }
    },

    put: (data) => {
        return (done) => {
            mongo.updateDocument(mongo.ARTICLES, {_id: new ObjectId(data._id)},data,(err,doc) => {
                if (err) done(new Error("修改失败!"), null);
                done(null, doc || "");
            })
        }
    },

    delete: (_id) => {
        return (done) => {
            mongo.removeDocument(mongo.ARTICLES, {_id: new ObjectId(_id)}, (err, doc) => {
                if (err) done(new Error("删除失败!"), null);
                done(null, doc || "");
            })
        }
    },

    create: (doc) => {
        return (done) => {
            mongo.insertDocument(mongo.ARTICLES, doc, (err, result) => {
                if (err) done(new Error("新增失败!"), null);
                done(null, null);
            });
        }
    }
}
