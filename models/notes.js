var mongoose =require('mongoose');

const NotesSchema= mongoose.Schema({
	title:String,
	subject: String,
	createDate:{
		type:Date,
		default: Date.now
	}
});
module.exports = mongoose.model('Notes',NotesSchema)//notes export gareko