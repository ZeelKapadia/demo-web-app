const _mongoos = require("mongoose");
const schema = _mongoos.Schema
// for pagination 
const mongoosePaginate = require("mongoose-paginate-v2");
// making the structure of document in mongoose (preparing model)
const employeeSchema = new schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    age:{
        type: Number,
        required: true,
    },
    designation:{
        type: String,
        required: true,
    },
    // for image or file upload
    avtar:{
        type:String
    }
},{timestamps:true})

// for pagination add the following line
employeeSchema.plugin(mongoosePaginate)
// making the employee model in mongoose
const employee = _mongoos.model("employee",employeeSchema);
module.exports = employee


