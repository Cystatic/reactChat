const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
        userId:{
            type:String,
            required:true,
        },
        //描述
        desc:{
            type:String,
            max:500
        },
        img:{
            type:String,
        },
        likes:{
            type:Array,
            default:[]
        },
        comment:{
            type:Number,
            default:0
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Post",PostSchema);