import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";

class ListBooks extends Component {
  render() {
    const { books } = this.props

    function getShelfBooks(shelfName) {
      return books.filter((book) =>
        book.shelf === shelfName)
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
            />
            <Bookshelf
              title='Want to Read'
              shelf='wantToRead'
              books={wantToRead}
            />
            <Bookshelf
              title='Read'
              shelf='read'
              books={booksRead}
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
