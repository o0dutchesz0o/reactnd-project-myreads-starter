import React, {Component} from 'react';
import Book from "./Book";

class Bookshelf extends Component {
  render() {
    const { title, books, shelf } = this.props
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
            <Book
              key = {book.id}
              shelf={shelf}
              cover={`url(${book.imageLinks.thumbnail})`}
              title={book.title}
              authors={book.authors}
          />
          ))}
        </ol>
      </div>
    </div>
  )
}}

export default Bookshelf