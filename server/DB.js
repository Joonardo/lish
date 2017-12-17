const redis = require('redis');
const randomstring = require('randomstring');

const prefix = '__lishjs__';

const db = redis.createClient();

const DB = {};

DB.get = function(key, cb) { db.get(prefix + key, cb) };
DB.set = function(key, value, cb) {
    db.set(prefix + key, value, cb)
    //db.expire(prefix + key, 3600)
};
DB.exists = function(key, cb) {
    console.log(prefix + key)
    db.exists(prefix + key, function(err, reply) { cb(reply === 1) })
};
DB.unused = function(cb, len = 4) {
    const cand = randomstring.generate(len)
    DB.exists(cand, function(e) {
	if(e)
	    DB.unused(cb, len + 1)
	else
	    cb(cand)
    });
};

export default DB;
