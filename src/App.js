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

 // todo - doesn't update every time.
  moveBook = (id, shelf) => {
    BooksAPI.get(id)
      .then((book) => {
        BooksAPI.update(book, shelf)
        .then(
        BooksAPI.getAll()
          .then((books) => {
            this.setState(() => ({
              books
            }))
          }))
      })
  }

  handleChange = (event) => {
    const { name, value} = event.target
    this.setState(() => ({
      [name] : value
    }))
    this.findBooks(value) //todo maybe handle differently
  }

  //todo - doesn't work all the time // figure out "empty query error"
  findBooks = (query) => {
    BooksAPI.search(query)
      .then((results) => {
        console.log(results)
        debugger
          this.setState(() => ({
            searchResults: results
          }))
        }
      )
  }

  render() {
    const { searchQuery, books, searchResults } = this.state
    const displayBooks = searchQuery === '' ? [] : searchResults

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
                {displayBooks.map(book => (
                  <Book
                    key = {book.id}
                    id = {book.id}
                    shelf={book.shelf}
                    cover={`url(${book.imageLinks.thumbnail})`}
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
