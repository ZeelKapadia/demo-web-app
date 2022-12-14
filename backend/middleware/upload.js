const path = require("path");
const multer = require("multer");

var storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        let ext = path.extname(file.originalname)
        cb(null,Date.now()+ext)
    }
})

var upload = multer({
    storage:storage,
    fileFilter:function(req,file,callback){
        // if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            console.log("cursor in if condition");
            callback(null,true)
        // }
        // else{
        //     console.log("only jpg and png file support");
        //     callback(null,false)
        // }
    },
    // limits:{
    //     fileSize:1024*1024*2 
    //     // only 2 MB file uploaded
    // }
})

module.exports=upload