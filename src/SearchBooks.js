import React, {Component} from "react";
import Book from "./Book";
import {Link} from "react-router-dom";

class SearchBooks extends Component {
  render() {
    const { searchQuery, onHandleChange, displayBooks, onMoveBook, noImgURL } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'>
            <button className="close-search">Close</button>
          </Link>

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
                   value={searchQuery}
                   placeholder="Search by title or author"
                   onChange={onHandleChange}
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
  }
}

export default SearchBooks