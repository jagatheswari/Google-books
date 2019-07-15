const { Book } = require('../models')
const axios = require('axios')

module.exports = app => {  
  //example of hitting the google books api
    //api call to google books where we search by title for req.body.title
    //send results to client

  //example add book to favorite
  //Post request to add book to users favorites 
  //req.body.bookInfo -- > add to Books 
  //pulling books from your DB -- possibly saved books
  app.get('/books',(req,res) => {
    Book.find({})
    .then(books => res.json(books))
    .catch(e=> console.log(e))
  })
  app.post('/google/books/:search',(req,res)=> {
    const {search} = req.params
    axios.get('https://www.googleapis.com/books/v1/volumes?q='+ search)
    .then(results => {
      var books = []
      var booksArray = results.data.items
      for(i = 0;i<booksArray.length;i++){
        var book = {}
        book.title = booksArray[i].volumeInfo.title
        book.authors = booksArray[i].volumeInfo.authors
        book.description = booksArray[i].volumeInfo.description
        book.image = booksArray[i].volumeInfo.imageLinks
        book.info = booksArray[i].volumeInfo.infoLink
        books.push(book)
      }
      res.json(books)
    } )
    // .then(results => {
    //   results.data.items.filter(result => result.volumeInfo.title && result.volumeInfo.authors && result.volumeInfo.description && result.volumeInfo.imageLinks && result.volumeInfo.infoLink)
    // })
    // .then(books => {
    //   console.log(books)
    //   res.json(books)})
    .catch(e => res.status(422).json(e))
  })
  app.post('/books', (req, res) => {
    console.log(req.body)
    Book.create({ title: req.body.title })
      .then(title => res.json(title))
      .catch(e => console.log(e))
  })
  
}