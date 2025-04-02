const mongoose = require('mongoose')

const employeeSchema = new  mongoose.Schema({
    
    userId:{
        type:String ,
        required:true
    },
    technicalDesc:{
        type:String,
        required:true 
    },
    nonTechnicalDesc:{
        type:String,
        required:true 
    },
    review:{
        type:String,
        required:true 
    },
    extraCarricular:{
        type:String,
        required:true 
    },
    events:{
        type:String,
        required:true 
    },
    posted_linkedin:{
        type:Boolean,
        required:true 
    },
    // innovation: {
    //     type: String,
    //     required: true, 
    // },
    
    date:{
        type:String,
    }, 

})

module.exports = mongoose.model('Employee', employeeSchema)