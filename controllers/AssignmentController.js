const Assignment = require('../models/Assingnment');

Assignment.getAssignmentByIns = function( req, res ){
    Assignment.find({instructorId: req.params.insId}).then( (Assignments)=> {
        res.status(200).json( Assignments );
    } ).catch( (err)=>{
        res.status(500).json({ message:err });
    });
}

Assignment.getAll = function( req, res ){
    Assignment.find().then( (responce)=> {
        res.status(200).json( responce );
    } ).catch( (err)=>{
        res.status(500).json({ message:err });
    });
}

Assignment.getById = function( req, res ){
    Assignment.findById(req.params.id).then( (responce)=> {
        res.status(200).json( responce );
    } ).catch( (err)=>{
        res.status(500).json({ message:err });
    });
}

Assignment.deleteById = function( req, res ){
    Assignment.findByIdAndDelete(req.params.id).then( Res => {
        res.status(200).json( { message : "Deleted" } );
    }).catch((err) =>{
        res.status(500).json({ message:err });
    })
}

Assignment.updateAssignment = function( req, res ){

    const body = req.body;

    Assignment.findByIdAndUpdate(req.params.id, {
        deadLine: body.deadLine,
        assgnmentName: body.assgnmentName,
        courseName: body.courseName,
        description: body.description
    }).then( Res => {
        res.status(200).json( Res );
    }).catch((err) =>{
        res.status(500).json({ message:err });
    })
}

Assignment.getbyCourse = function( req, res ){

    Assignment.find({
        courseName: req.params.courseName
    }).then( (responce)=> {
        res.status(200).json( responce );
    } ).catch( (err)=>{
        res.status(500).json({ message:err });
    });
}

Assignment.getbyAssgnmentName = function( req, res ){
    Assignment.find({
        assgnmentName: req.params.assgnmentName
    }).then( (responce)=> {
        res.status(200).json( responce );
    } ).catch( (err)=>{
        res.status(500).json({ message:err });
    });
}

module.exports = Assignment;