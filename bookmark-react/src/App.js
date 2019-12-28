import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BookmarkControls from './components/BookmarkControls';
import Bookmarks from './components/Bookmarks';
import AddBookmark from './components/AddBookmark.js';
import Edit from './components/Edit';
import config from './config';
import './reset.css';
import './App.css';

class App extends Component {
  state = {
    filter: 1,
    bookmarks: []
  };

  componentDidMount() {
    fetch(config.API_ENDPOINT, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(res => this.setState({ bookmarks: res }))
      .catch(error => this.setState({ error }));
  }

  handleFilterEvent = e => {
    this.setState({ filter: e.target.value });
  };

  setBookmarks(bookmarks) {
    this.setState({ bookmarks: bookmarks });
  }

  handleNewSubmit = form => {
    // get the form fields from the event
    const { title, url, desc, rating } = form;
    const bookmark = {
      title: title,
      url: url,
      description: desc,
      rating: rating
    };
    this.setState({ error: null });
    fetch(config.API_ENDPOINT, {
      method: 'POST',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`
      }
    })
      .then(res => {
        if (!res.ok) {
          // get the error message from the response,
          return res.json().then(error => {
            // then throw it
            throw error;
          });
        }
        return res.json();
      })
      .then(res => this.setState({ bookmarks: [...this.state.bookmarks, res] }))
      .catch(error => this.setState({ error }));
  };

  handleEditSubmit = form => {
    // get the form fields from the event
    const { id, title, url, desc, rating } = form;
    const bookmark = {
      title: title,
      url: url,
      description: desc,
      rating: rating
    };
    this.setState({ error: null });
    fetch(`${config.API_ENDPOINT}/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(bookmark),
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`
      }
    }).then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error;
        });
      }
      let shallowBookmarks = this.state.bookmarks;
      let i = shallowBookmarks.findIndex(bm => bm.id === id);
      shallowBookmarks[i] = { id, ...bookmark };
      this.setState({
        bookmarks: shallowBookmarks
      });
    });
  };

  handleExpandEvent = id => {
    let shallowBookmarks = this.state.bookmarks;
    let i = shallowBookmarks.findIndex(bm => bm.id === id);
    shallowBookmarks[i].expanded = !shallowBookmarks[i].expanded;
    this.setState({
      bookmarks: shallowBookmarks
    });
  };

  handleDeleteEvent = id => {
    fetch(`${config.API_ENDPOINT}/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `bearer ${config.API_KEY}`
      }
    }).then(res => {
      if (!res.ok) {
        // get the error message from the response,
        return res.json().then(error => {
          // then throw it
          throw error;
        });
      }

      let shallowBookmarks = this.state.bookmarks;
      let i = shallowBookmarks.findIndex(bm => bm.id === id);
      shallowBookmarks.splice(i, 1);
      this.setState({
        bookmarks: shallowBookmarks
      });
      return;
    });
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="banner">
            <h1>MyBookmarks</h1>
            <h2>Easily remember the sites you love</h2>
          </div>

          <Route
            exact
            path="/"
            render={() => (
              <BookmarkControls filter={this.state.filter} handleFilterEvent={this.handleFilterEvent} />
            )}
          />
        </header>
        <main>
          <Route
            exact
            path="/"
            render={() => (
              <ul className="bookmarks">
                {this.state.bookmarks.map(bm => (
                  <Bookmarks
                    bm={bm}
                    handleExpandEvent={this.handleExpandEvent}
                    handleDeleteEvent={this.handleDeleteEvent}
                  />
                ))}
              </ul>
            )}
          />
          <Route
            exact
            path="/addBookmark"
            render={() => <AddBookmark handleNewSubmit={this.handleNewSubmit} />}
          />
          <Route
            exact
            path="/edit/:id"
            render={({ match }) => (
              <Edit
                bm={this.state.bookmarks.find(bm => Number(match.params.id) === bm.id)}
                handleEditSubmit={this.handleEditSubmit}
              />
            )}
          />
        </main>
      </div>
    );
  }
}

export default App;
