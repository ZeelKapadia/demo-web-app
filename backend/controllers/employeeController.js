const employee = require("../models/employeeModel");
const employeeModel = require("../models/employeeModel");
const status_codes = require('http-status-codes').StatusCodes;
const reason_phrases = require('http-status-codes').ReasonPhrases;

// show the list of employee
const indexData = (req, res, next) => {
    if (req.query.page && req.query.limit) {
        employeeModel.paginate({}, { page: req.query.page, limit: req.query.limit })
            .then(response => {
                res.status(status_codes.OK).send({
                    response
                })
            })
            .catch(error => {
                res.status(status_codes.BAD_REQUEST).send({
                    message: "An error occured: " + error
                })
            })
    }
    else {
        employeeModel.find()
            .then(response => {
                if (response.length >= 0) {
                    res.status(status_codes.OK).send({
                        response
                    })
                }
                else {
                    res.status(status_codes.NO_CONTENT).send({
                        message: reason_phrases.NO_CONTENT
                    })
                }
            })
            .catch(error => {
                res.status(status_codes.BAD_REQUEST).send({
                    Message: "an error occured while listing the data"
                })
            })
    }

}

// show the single employee
const showData = (req, res, next) => {
    let empId = req.body.employeeId;
    if (!req.body.employeeId) {
        res.status(status_codes.BAD_REQUEST).send({
            message: reason_phrases.BAD_REQUEST,
            reason: "enter the valid id"
        })
    }
    employeeModel.findById(empId)
        .then(response => {
            if (response.length <= 0) {
                res.status(status_codes.NO_CONTENT).send({
                    response,
                    message: reason_phrases.NO_CONTENT
                })
            }
            console.log(response);
            res.status(status_codes.OK).send({
                response
            })
        })
        .catch(error => {
            if (error.name === "CastError") {
                res.status(status_codes.BAD_REQUEST).send({
                    message: reason_phrases.BAD_REQUEST
                })
            }
        })
}

// save the employee 
const storeData = (req, res, next) => {
    let employee = new employeeModel({
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    })
    // var error = employee.validate()
    // if (error) {
    //     res.status(status_codes.BAD_REQUEST).send({
    //         message: "Null values or empty values are not allowed"
    //     })
    // }
    // else {
        // employeeModel.find().then(response=>{
        //     if (response === employee) {
        //         res.status(status_codes.CONFLICT).json({
        //             message:"record already registered"
        //         })
        //     }
        // })
         // for image uploading
        if (req.file) {
            console.log("here is cursor");
            employee.avtar = req.file.path
        }
        // for multiple file uploading
        // if (req.files) {
        //     let path = ""
        //     req.files.forEach(function (files, index, arr) {
        //         path = path + files.path + ","
        //     });
        //     path = path.substring(0, path.lastIndexOf(","))
        //     employee.avtar = path
        // }
        // for saving data
        employee.save()
            .then(response => {
                console.log(employee);
                res.status(status_codes.CREATED).send({
                    message: reason_phrases.CREATED,
                    // storedRec:employee
                })
            })
            .catch(error => {
                res.status(status_codes.NOT_ACCEPTABLE).send({
                    message: "The data may contains an issue " + reason_phrases.NOT_ACCEPTABLE
                })
            })
    // }
}

// update the employee
const updateData = (req, res, next) => {
    let empId = req.body.employeeId;

    let updateData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age,
    }
    employeeModel.findByIdAndUpdate(empId, { $set: updateData })
        .then(() => {
            res.status(status_codes.CREATED).send({
                message: "updated " + reason_phrases.CREATED
            })
        })
        .catch(error => {
            res.status(status_codes.NOT_MODIFIED).send({
                message: reason_phrases.NOT_MODIFIED,
                reason: "an error occured while updating the data please check again"
            })
        })
}

// delete the data
const deleteData = (req, res, next) => {
    let empId = req.body.employeeId;
    employeeModel.findByIdAndRemove(empId)
        .then(() => {
            res.status(status_codes.OK).send({
                message: "record deleted"
            })
        })
}

var customPagination = (req, res, next) => {

    var pageNum = req.query.page;
    var limit = req.query.limit;
    var totalRec = 0

    var totalRec = employee.find().count().then(response => {
        totalRec = Number(response)
    })

    var skip = pageNum < 1 ? res.send(status_codes.BAD_REQUEST).json({ message: "page Num could never been in negative or zero" }) : pageNum > 1 ? pageNum - 1 : pageNum == 1 ? 0 : pageNum - 1

    employeeModel.find().skip(skip * limit).limit(limit).then(response => {
        const totalPages = Math.ceil(totalRec / limit);
        const hasNextPage = (pageNum < totalPages) ? true : false
        const hasPrevPage = (pageNum > 1) ? true : false

        res.status(status_codes.OK).send({
            "data": response,
            "totalRec": totalRec,
            "currentPage": Number(pageNum),
            "limit": Number(limit),
            "totalPage": totalPages,
            "hasNextPage": hasNextPage,
            "hasPrevPage": hasPrevPage
        })
    }).catch(e=>{
        console.log(e,"error");
    })
}

var sortRecs = (req, res, next) => {
    var sort = req.query.sort;
    var sortOrder = req.query.sortOrder;

    employeeModel.find().sort('name').then(resp => {
        res.status(status_codes.OK).send({
            resp
        })
    })
}

var sortWithPagination = (req, res, next) => {
    console.log(req.query.page);
    var page = req.query.page || 1;
    var limit = req.query.limit || 100;
    var sort = req.query.sort || "";
    var sortOrder = (req.query.sortOrder).toLowerCase() || "";
    var totalRec = 0

    // if (!Number.isFinite(page)) {
    //     res.status(status_codes.BAD_REQUEST).json({
    //         message:"please enter the valid number at Page"
    //     })
    // }
    // else if (!Number.isFinite(limit)) {
    //     res.status(status_codes.BAD_REQUEST).json({
    //         message:"please enter the valid number at limit"
    //     })
    // }
    // else{
    var totalRec = employee.find().count().then(response => {
        totalRec = response
    })
    var skip = page < 1 ? res.send(status_codes.BAD_REQUEST).json({ message: "page Num could never been in negative or zero" }) : page > 1 ? page - 1 : page == 1 ? 0 : page - 1

    var sortStr
    if (sortOrder == "ascending") {
        sortStr = String(sort)
    }
    else if (sortOrder == "descending") {
        sortStr = "-" + String(sort)
    }
    else {
        sortStr = ""
    }
    employeeModel.find().sort(sortStr).skip(skip * limit).limit(limit).then(response => {
        var totalPages = Math.ceil(totalRec / limit);
        var hasNextPage = (page < totalPages) ? true : false
        var hasPrevPage = (page > 1) ? true : false

        res.status(status_codes.OK).send({
            "data": response,
            "totalRec": totalRec,
            "currentPage": Number(page),
            "limit": Number(limit),
            "totalPage": totalPages,
            "hasNextPage": Boolean(hasNextPage),
            "hasPrevPage": Boolean(hasPrevPage)
        })
    })
        .catch(error => {
            console.log(error);
            res.status(status_codes.BAD_REQUEST).send({
                Message: "an error occured while listing the data",
                reason: reason_phrases.BAD_REQUEST
            })
        })
    }
// }


var searchRec = (req, res, next) => {

    var search = req.query.search;
    var searchBy = req.query.searchBy;

    employeeModel.find({$or:[
        {[searchBy]:{$regex:new RegExp(search)}},
    ]}).then(resp=>{
        if (resp.length>=0) {
            res.status(status_codes.OK).send(resp)
        }
        else{
            res.status(status_codes.NO_CONTENT).send({
                message: reason_phrases.NO_CONTENT,
                response:resp
            })
        }
    })

}

module.exports = {
    indexData, showData, deleteData, updateData, storeData, customPagination, sortRecs, sortWithPagination, searchRec
}


// for Learning
// https://mongoosejs.com/docs/validation.html
