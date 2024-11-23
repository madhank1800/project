const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var documentSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    documentName:{
        type:String,
        default:""
        
    },
    documentedContent:{
        type:String,
        default:""
    },
    
});

//Export the model
module.exports = mongoose.model('Document', documentSchema);