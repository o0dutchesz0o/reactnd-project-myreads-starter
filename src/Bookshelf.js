import React, {Component} from 'react';
import Book from "./Book";

class Bookshelf extends Component {
  render() {
    const { title, books, shelf, onMoveBook, noImgURL } = this.props
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book
              key = {book.id}
              id = {book.id}
              shelf={shelf}
              cover={`url(${book.imageLinks === undefined ? noImgURL : book.imageLinks.thumbnail})`}
              title={book.title}
              authors={book.authors}
              onMoveBook={onMoveBook}
            />
          ))}
        </ol>
      </div>
    </div>
  )
}}

export default Bookshelf