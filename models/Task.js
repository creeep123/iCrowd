const mongoose = require("mongoose")
const passportLocalMongoose = require('passport-local-mongoose')

const taskSchema = new mongoose.Schema(
    {
        publish_time:{
            type:Number,
        },
        task_type:{
            type:String,
            required:'Task type missing',
        },
        title:{
            type:String,
            required:'Title missing'
        },
        description:{
            type:String,
            required:'Description missing'
        },
        question:{
            type:String,
        },
        image_toprocessing:{
            type:String,
        },
        choice_task_option_1:{
            type:String,
        },
        choice_task_option_2:{
            type:String,
        },
        choice_task_option_3:{
            type:String,
        },
        choice_task_option_4:{
            type:String,
        },
        expire_date:{
            type:Date,
        },
        require_master_worker:{
            type:String
        },
        reward_per_person:{
            type:Number
        },
        number_of_worker:{
            type:Number
        },
    }
)
taskSchema.plugin(passportLocalMongoose)

module.exports = mongoose.model("Task",taskSchema)