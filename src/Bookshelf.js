import React, {Component} from 'react';
import Book from "./Book";

class Bookshelf extends Component {
  render() {
    return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{this.props.title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {this.props.books.map(book => (
            <Book
              key = {book.id}
              shelf={this.props.shelf}
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