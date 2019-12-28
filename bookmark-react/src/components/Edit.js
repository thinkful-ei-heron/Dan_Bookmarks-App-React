import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Edit extends Component {
  stars = [
    String.fromCharCode(9733, 9734, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9734, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9734, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9734),
    String.fromCharCode(9733, 9733, 9733, 9733, 9733)
  ];

  state = {
    id: this.props.bm.id,
    title: this.props.bm.title,
    url: this.props.bm.url,
    desc: this.props.bm.description,
    rating: this.props.bm.rating
  };

  render() {
    return (
      <form className="editBookmarkForm" id="editBookmarkForm">
        <fieldset name="site-info">
          <legend>Edit Bookrmark:</legend>
          <label htmlFor="title">Name</label>
          <input
            type="text"
            name="title"
            id="title"
            value={this.state.title}
            required
            onChange={e => this.setState({ title: e.target.value })}
          />
          <label htmlFor="url">URL</label>
          <input
            type="url"
            name="url"
            id="url"
            value={this.state.url}
            pattern="^(http|https)://.*"
            required
            onChange={e => this.setState({ url: e.target.value })}
          />
          <label htmlFor="desc">Description</label>
          <textarea
            name="desc"
            id="desc"
            form="editBookmarkForm"
            value={this.state.desc}
            onChange={e => this.setState({ title: e.target.value })}
          ></textarea>
          <label htmlFor="rating">Rating</label>
          <select
            name="rating"
            id="rating"
            form="editBookmarkForm"
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
          <button type="submit" onClick={e => this.props.handleEditSubmit(this.state)}>
            Submit
          </button>
        </Link>
        <Link to="/">
          <button className="cancelEdit">Cancel</button>
        </Link>
      </form>
    );
  }
}
