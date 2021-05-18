import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";

class ListBooks extends Component {
  render() {
    const { books, onMoveBook } = this.props

    function getShelfBooks(shelfName) {
      return books.filter((book) => {
      return book.shelf === shelfName}
      )
    }

    const currentlyReading = getShelfBooks('currentlyReading')
    const wantToRead = getShelfBooks('wantToRead')
    const booksRead = getShelfBooks('read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              shelf='currentlyReading'
              books={currentlyReading}
              onMoveBook={onMoveBook}
            />
            <Bookshelf
              title='Want to Read'
              shelf='wantToRead'
              books={wantToRead}
              onMoveBook={onMoveBook}
            />
            <Bookshelf
              title='Read'
              shelf='read'
              books={booksRead}
              onMoveBook={onMoveBook}
            />
          </div>
        </div>
        <div className="open-search">
          <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
        </div>
      </div>

    )
  }
}

export default  ListBooks
