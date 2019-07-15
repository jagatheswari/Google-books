module.exports = (Schema, model) => {

  const Book= new Schema({
  title:{
    type:String,
  },
  authors:{
    type:String,
  },
  description:{
    type:String,
  },
  image:{
    type:String,
  },
  link:{
    type:String,
  }
  })

  //Creates our model from the above schema and names it Book
  return model('Book', Book)
}