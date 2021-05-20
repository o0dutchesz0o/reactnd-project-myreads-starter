import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from "./ListBooks";
import Book from "./Book";

class BooksApp extends Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: [],
    searchQuery: '',
    searchResults: [],
    showSearchPage: false
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books
        }))
      })
  }

  moveBook = (book_id, shelf) => {
    BooksAPI.get(book_id)
      .then((book) => {
        BooksAPI.update(book, shelf)
        .then((shelves) => {
            let books = [...this.state.books]
            const index = this.state.books.findIndex((book) => book.id === book_id);
            if (index !== -1) {
              books[index]['shelf'] = shelf;
            } else{
              book['shelf'] = shelf
              books = [...books, book]
            }
            this.setState({books});
        })
    })
  }

  handleChange = (event) => {
    const { name, value} = event.target
    this.setState(() => ({
      [name] : value
    }))
    this.findBooks(value)
  }

  findBooks = (query) => {
    BooksAPI.search(query)
      .then((results) => {
        let valid_results = true
          if (results === undefined) {
            valid_results = false
          } else if (results.error === 'empty query') {
            valid_results = false
          }
        if (valid_results) {
            results.forEach(result => {
              result['shelf'] = 'none';
              const found_book = this.state.books.find(book => book.id === result.id)
              if (found_book !== undefined) {
                result['shelf'] = found_book['shelf']
              }
            })
        }

        this.setState(() => ({
          searchResults: valid_results ? results : []
        }))
      })
  }

  render() {
    const { searchQuery, books, searchResults } = this.state
    const displayBooks = searchQuery === '' ? [] : searchResults
    const noImgURL = 'https://books.google.com/googlebooks/images/no_cover_thumb.gif'

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text"
                       name='searchQuery'
                       value={this.state.searchQuery}
                       placeholder="Search by title or author"
                       onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid">
                {console.log('displayBooks', displayBooks)}
                {displayBooks.map(book => (
                  <Book
                    key = {book.id}
                    id = {book.id}
                    shelf={book.shelf}
                    cover={`url(${book.imageLinks === undefined ? noImgURL : book.imageLinks.thumbnail})`}
                    title={book.title}
                    authors={book.authors}
                    onMoveBook={this.moveBook}
                  />
                ))}
              </ol>
            </div>
          </div>
        ) : (
          <div>
            <ListBooks
              books={books}
              onMoveBook={this.moveBook}
            />
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
