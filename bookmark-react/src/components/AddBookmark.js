import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class AddBookmark extends Component {
  stars = [
    String.fromCharCode(9733, 9734, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9733)
  ];

  state = {
    title: null,
    url: null,
    desc: null,
    rating: 1
  };
  render() {
    return (
      <form className="newBookmarkForm" id="newBookmarkForm">
        <fieldset name="site-info">
          <legend>Add Bookrmark:</legend>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Name your bookmark"
            required
            onChange={e => this.setState({ title: e.target.value })}
          />
          <label htmlFor="url">URL</label>
          <input
            type="url"
            name="url"
            id="url"
            placeholder="Enter URL here"
            pattern="^(http|https)://.*"
            required
            onChange={e => this.setState({ url: e.target.value })}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            form="newBookmarkForm"
            placeholder="Enter description of the site (optional)"
            onChange={e => this.setState({ desc: e.target.value })}
          ></textarea>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
            form="newBookmarkForm"
            value={this.state.rating}
            onChange={e => this.setState({ rating: e.target.value })}
          >
            <option value="1">{this.stars[0]}</option>
            <option value="2">{this.stars[1]}</option>
            <option value="3">{this.stars[2]}</option>
            <option value="4">{this.stars[3]}</option>
            <option value="5">{this.stars[4]}</option>
          </select>
        </fieldset>
        <Link to="/">
          <button type="submit" onClick={e => this.props.handleNewSubmit(this.state)}>
            Submit
          </button>
        </Link>
        <Link to="/">
          <button className="cancelNew">Cancel</button>
        </Link>
      </form>
    );
  }
}
