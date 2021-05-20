import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ListBooks from "./ListBooks";
import SearchBooks from "./SearchBooks";
import {Link, Route} from 'react-router-dom'

class BooksApp extends Component {
  state = {
    books: [],
    searchQuery: '',
    searchResults: []
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

    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <div>
            <ListBooks
              books={books}
              onMoveBook={this.moveBook}
            />
            <div className="open-search">
              <Link
                to='/search'
              ><button>Add a Book</button></Link>
            </div>
          </div>
        )}/>

        <Route path='/search' render={( {history}) => (
          <SearchBooks
            searchQuery={this.state.searchQuery}
            onHandleChange={this.handleChange}
            displayBooks={displayBooks}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp
