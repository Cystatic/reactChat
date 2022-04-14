const mongoose = require("mongoose")

const GroupSchema = new mongoose.Schema({
        master:{
            type:String,
            required:true
        },
        groupname:{
            type:String,
            required:true,
            unique: true,
        },
        members:{
            type:Array,
            default: []
        }

    },
    { timestamps: true }
);

module.exports = mongoose.model("Group",GroupSchema);