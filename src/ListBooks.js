import React, {Component} from 'react';
import Bookshelf from "./Bookshelf";

class ListBooks extends Component {
  getShelfBooks(shelfName) {
    console.log('retrieving books')
    this.state.books.filter((book) =>
      book.shelf === shelfName)
  }

  render() {
    const { books } = this.props
    const currentlyReading = books.filter((book) =>
      book.shelf === 'currentlyReading'
    )
    const wantToRead = books.filter((book) =>
      book.shelf === 'wantToRead'
    )
    const booksRead = books.filter((book) =>
      book.shelf === 'read'
    )
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Bookshelf
              title='Currently Reading'
              books={currentlyReading}
            />
            <Bookshelf
              title='Want to Read'
              books={wantToRead}
            />
            <Bookshelf
              title='Read'
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
