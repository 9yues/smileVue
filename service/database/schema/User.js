const mongoose = require('mongoose')    // 引入mongose
const Schema = mongoose.Schema          // 声明Schema
let ObjectId = Schema.Types.ObjectId    // 声明Object类型
const bcrypt = require('bcrypt')
// 加盐强度
const SALT_WORK_FACTOR = 10

// 创建我们的用户schema
const userSchema = new Schema({
    UserId: ObjectId,
    userName: {unique: true, type: String},
    password: String,
    createAt: {type: Date, default: Date.now()},
    lastLoginAt: {type: Date, default: Date.now()}
})

// 每次保存都进行一个操作
userSchema.pre('save', function(next){
    // 加盐
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) return next(err)
        // 加密
        bcrypt.hash(this.password, salt, (err, hash) => {
            if (err) return next(err)
            this.password = hash
            next()
        })
    })
})

// 发布模型
mongoose.model('User', userSchema)