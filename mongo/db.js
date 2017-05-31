/**
  Create By brainqi@outlook.com  2016-08-12 09:40:00
  MongoDB common operation utils:
  - Insert One Document.
  - Insert Many Documents.
  - Insert Document without repeat.Phone number is the specified key.
  - Find Document.
  - Find Specified Document.
  - Find All Documents with a Query Filter and Return results with page info.
  - Find All Documents with a Query Filter and without page query.
  - Find All Specified Documents with a Query Filter and without page query.
  - Find Specified Documents with a Query Filter and page query.
  - Find Doc count.
  - Update One Document.
  - Update Many Documents.
  - FindAndModify Documents.
  - Remove One Document.
  - Remove Many Document.
*/
var config = require('../conf/config');
var MongoClient = require('mongodb').MongoClient;
var db;
// MongoClient connection pooling.
MongoClient.connect(config.Mongo, (err, database) => {
    if (err) throw err;
    // Initialize connection once.
    db = database;
});
module.exports = {
 // collection_name.
    BUILDPRICE: 'build_price',
    ARTICLES:"jzez_articles",
    getDB: () => {
        return db;
    },
    /** 
     * Insert one document.
    */
    insertDocument: (collectionName, doc, callback) => {
        var collection = db.collection(collectionName);
        collection.insertOne(doc, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 保存单个失败:', err);
            }
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Insert many documents.
     */
    insertDocuments: (collectionName, docs, callback) => {
        var collection = db.collection(collectionName);
        collection.insertMany(docs, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 保存多个文档失败:', err);
            }
            // console.log(result.result.n);   // result Contains the result document from MongoDB
            // console.log(result.ops.length); //ops Contains the documents inserted with added _id fields
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Insert Document without repeat.Phone number is the specified key.
     */
    insertDocumentNorepeatForPhone: (collectionName, doc, callback) => {
        var collection = db.collection(collectionName);
        collection.update({ Phone2: doc.Phone2, station: doc.station }, { $setOnInsert: doc }, { upsert: true }, (err, res) => {
            if (res.result.upserted == null) {
                // console.log('---> 重复数据不录入! ', doc);
                callback(doc.Phone2);
            } else {
                // console.log('---> 新录入数据:', doc);
                callback(null);
            }
        });
        // var bulk = db.collection(collectionName).initializeUnorderedBulkOp()
        // bulk.find({name: doc.name, phone: doc.phone})
        //     .upsert()
        //     .replaceOne(doc);
        // deprecate 防止数据重复而采用的让多线程错峰执行,已经改由Redis分布式锁实现.
        // 随机超时时间,防止多线程带来的数据重复插入问题 
        // var timeout = Math.random()*1500;
        // setTimeout(function() {
        //   bulk.execute();
        // }, timeout);
        // bulk.execute(function(err, result){
        //   console.log(result.nMatched);
        //   // console.log('---> s :',bulk.s);
        //   if (bulk.s.bulkResult.nMatched == 1) {
        //     console.log('---> 重复数据: ',doc);
        //   }
        // });
        // callback();
        // console.log('---> result : ',bulk.s.bulkResult);
    },
    // ---------------------------------------------------------------------------
    /**
     * Upsert document.
     */
    upsertDocument: (collectionName, queryDoc, upsertDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.update(queryDoc, upsertDoc, { upsert: true }, (err, result) => {
            callback(err, result);
        });
    },
    /**
     * Find One Document.
     */
    findDocument: (collectionName, queryDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.findOne(queryDoc).then((doc) => {
            callback(doc);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find Specified Document.
     */
    findSpecifiedDocument: (collectionName, queryDoc, specifiedDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.findOne(queryDoc, specifiedDoc).then((doc) => {
            callback(doc);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find All Documents with a Query Filter and Return results with page info.
     */
    findDocuments: (collectionName, queryDoc, callback) => {
        /**
        queryDoc:
        {
          doc:{'age': 18, 'name': /brain/},  # name = new RegExp(name); Note:模糊查询,需要使用正则,而不是简单的 / 字符串拼接
          pageParam:{'page':1, 'size': 20}
        }
        */
        var pageParam = queryDoc.pageParam == null ? new Object() : queryDoc.pageParam;
        var page = pageParam.page == null ? 1 : parseInt(pageParam.page);
        var size = pageParam.size == null ? 20 : parseInt(pageParam.size);
        size = size > 200 ? 200 : size; // 接口保护,每次最多允许获取200条数据
        var skip = (page - 1) * size;
        var doc = queryDoc.doc; // can be an empty object.
        var collection = db.collection(collectionName);
        // 默认按照创建时间降序排列
        collection.find(doc)
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(size)
            .toArray(
            (err, docs) => {
                if (err) {
                    console.error('---------------- Mongodb 查询失败 :', err);
                }
                collection.count(doc,
                    (err, count) => {
                        var results = new Object();
                        results.docs = docs;
                        results.count = count;
                        callback(results);
                    });
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find All Documents with a Query Filter and without page query.
     */
    findAllDocuments: (collectionName, queryDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.find(queryDoc)
            .toArray((err, docs) => {
                callback(docs);
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find All Documents with a sorted document and a Query Filter and without page query.
     */
    findAllDocumentsSorted: (collectionName, queryDoc, sortDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.find(queryDoc)
            .sort(sortDoc)
            .toArray((err, docs) => {
                callback(docs);
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find All Specified Documents with a Query Filter and without page query.
     */
    findAllSpecifiedDocuments: (collectionName, queryDoc, specifiedDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.find(queryDoc, specifiedDoc)
            .toArray((err, docs) => {
                callback(docs);
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find Specified Documents with a Query Filter and page query.
     */
    findSpecifiedDocuments: (collectionName, queryDoc, specifiedDoc, callback) => {
        var pageParam = queryDoc.pageParam == null ? new Object() : queryDoc.pageParam;
        var page = pageParam.page == null ? 1 : parseInt(pageParam.page);
        var size = pageParam.size == null ? 20 : parseInt(pageParam.size);
        size = size > 200 ? 200 : size; // 接口保护,每次最多允许获取200条数据
        var skip = (page - 1) * size;
        var doc = queryDoc.doc; // can be an empty object.
        var collection = db.collection(collectionName);
        collection.find(doc, specifiedDoc)
            .sort({ createAt: -1 })
            .skip(skip)
            .limit(size)
            .toArray(
            (err, docs) => {
                if (err) {
                    console.error('---------------- Mongodb 查询失败 :', err);
                }
                collection.count(doc,
                    (err, count) => {
                        var results = new Object();
                        results.docs = docs;
                        results.count = count;
                        callback(results);
                    });
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find Specified Sorted Documents with a Query Filter and page query.
     */
    findSpecifiedSortedDocuments: (collectionName, queryDoc, specifiedDoc, sortDoc, callback) => {
        var pageParam = queryDoc.pageParam == null ? new Object() : queryDoc.pageParam;
        var page = pageParam.page == null ? 1 : parseInt(pageParam.page);
        var size = pageParam.size == null ? 20 : parseInt(pageParam.size);
        size = size > 200 ? 200 : size; // 接口保护,每次最多允许获取200条数据
        var skip = (page - 1) * size;
        var doc = queryDoc.doc; // can be an empty object.
        var collection = db.collection(collectionName);
        collection.find(doc, specifiedDoc)
            .sort(sortDoc)
            .skip(skip)
            .limit(size)
            .toArray(
            (err, docs) => {
                if (err) {
                    console.error('---------------- Mongodb 查询失败 :', err);
                }
                collection.count(doc,
                    (err, count) => {
                        var results = new Object();
                        results.docs = docs;
                        results.count = count;
                        callback(results);
                    });
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find All Specified Sorted Documents without page Filter query.
     */
    findAllSpecifiedSortedDocuments: (collectionName, queryDoc, specifiedDoc, sortDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.find(queryDoc, specifiedDoc)
            .sort(sortDoc)
            .toArray(
            (err, docs) => {
                if (err) {
                    console.error('---------------- Mongodb 查询失败 :', err);
                }
                callback(docs);
            });
    },
    // ---------------------------------------------------------------------------
    /**
     * Find Doc count.
     */
    findCount: (collectionName, queryDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.count(queryDoc, (err, count) => {
            callback(count);
        })
    },
    // ---------------------------------------------------------------------------
    /**
     * Update one document.
     */
    updateDocument: (collectionName, conditionDoc, updatedDoc, callback) => {
        var collection = db.collection(collectionName);
        var update_doc = null;
        delete updatedDoc._id; // don't update _id & createAt field.
        delete updatedDoc.createAt;
        console.log("updatedDoc", updatedDoc);
        if (updatedDoc.hasOwnProperty('$push') || updatedDoc.hasOwnProperty('$unset')) {
            update_doc = updatedDoc;
        } else {
            updatedDoc.updateAt = new Date();
            update_doc = { $set: updatedDoc };
        }
        collection.updateOne(conditionDoc, update_doc, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 更新单个文档失败:', err);
            }
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Update many documents.
     */
    updateDocuments: (collectionName, conditionDoc, updatedDoc, callback) => {
        updatedDoc.updateAt = new Date();
        var collection = db.collection(collectionName);
        delete updatedDoc._id; // don't update _id & createAt field.
        delete updatedDoc.createAt;
        collection.updateMany(conditionDoc, { $set: updatedDoc }, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 更新多个文档失败:', err);
            }
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * findAndModify requires a sort parameter. 
     * 
     * The {new: true} option will return the updated document when boolean true. 
     * If set to false, it will return the old document before update. 
     * 
     */
    FindAndModifyDocument: (collectionName, queryDoc, sortDoc, updateDoc, callback) => {
        var collection = db.collection(collectionName);
        collection.findAndModify(queryDoc, sortDoc, updateDoc, { new: true }, (err, result) => {
            if (err) {
                console.error('---> FindAndModify Error: %s', err);
            }
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Remove one document.
     */
    removeDocument: (collectionName, doc, callback) => {
        var collection = db.collection(collectionName);
        collection.deleteOne(doc, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 删除单个文档失败:', err);
            }
            callback(err, result);
        });
    },
    // ---------------------------------------------------------------------------
    /**
     * Remove Many documents.
     */
    removeDocuments: (collectionName, doc, callback) => {
        var collection = db.collection(collectionName);
        collection.deleteMany(doc, (err, result) => {
            if (err) {
                console.error('---------------- Mongodb 删除多个文档失败:', err);
            }
            callback(err, result);
        });
    }
};