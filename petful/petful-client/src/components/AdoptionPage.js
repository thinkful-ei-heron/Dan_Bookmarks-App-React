import React, { Component } from 'react';
import Queue from '../Queue.js';
import PetQueue from '../components/PetQueue';
import Adopted from '../components/Adopted';
import config from '../config';

export default class AdoptionPage extends Component {
  state = {
    petQueue: null,
    adoptionQueue: null,
    adopted: null
  };

  API = config.API_ENDPOINT;

  componentDidMount() {
    this.getUsers().then(resUsers => {
      let users = resUsers;
      console.log(users);
      this.getCats().then(resCats => {
        let cats = resCats;
        this.getDogs().then(resDogs => {
          let dogs = resDogs;
          let queue = new Queue();
          let i = 0;
          let j = 0;
          while (i < cats.length && j < dogs.length) {
            console.log(i, j);
            if (cats[i].date.valueOf() < dogs[j].date.valueOf()) {
              console.log('cat date is greater');

              queue.enqueue(cats[i]);
              i++;
            } else {
              queue.enqueue(dogs[j]);
              j++;
            }
          }

          for (i; i < cats.length; i++) {
            queue.enqueue(cats[i]);
          }

          for (j; j < dogs.length; i++) {
            queue.enqueue(dogs[j]);
          }

          console.log(queue);

          let adoptionQ = new Queue();
          for (let i = 0; i < users.length; i++) {
            adoptionQ.enqueue(users[i]);
          }

          adoptionQ.enqueue({ name: 'You' });
          this.setState({ adoptionQueue: adoptionQ, petQueue: queue });
        });
      });
    });

    this.interval = setInterval(() => {
      if (!this.state.adoptionQueue || !this.state.adoptionQueue.first) return;
      if (this.state.adoptionQueue.first.value.name === 'You') return;

      console.log('in set interval');
      let rand = Math.random();
      let adoptionQueue = this.copyQueue(this.state.adoptionQueue);
      let petQueue = this.copyQueue(this.state.petQueue);
      if (rand <= 0.25) {
        adoptionQueue.dequeue();
        this.setState({ adoptionQueue: adoptionQueue });
      } else {
        petQueue.dequeue();
        adoptionQueue.dequeue();
        this.setState({ petQueue: petQueue, adoptionQueue: adoptionQueue });
      }
    }, 3000);
  }

  copyQueue(q) {
    let newQueue = new Queue();

    if (q) {
      let currNode = q.first;
      while (currNode) {
        newQueue.enqueue(currNode.value);
        currNode = currNode.next;
      }
    }
    return newQueue;
  }

  getDogs() {
    return fetch(`${this.API}/dog/`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  getCats() {
    return fetch(`${this.API}/cat`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  getUsers() {
    return fetch(`${this.API}/user`).then(res =>
      !res.ok ? res.json().then(e => Promise.reject(e)) : res.json()
    );
  }

  adopt(bool) {
    let adoptionQueue = this.copyQueue(this.state.adoptionQueue);
    adoptionQueue.dequeue();
    let petQueue = this.copyQueue(this.state.petQueue);
    if (bool) {
      this.setState({
        petQueue: petQueue || null,
        adoptionQueue: adoptionQueue || null,
        adopted: petQueue.dequeue()
      });
    } else this.setState({ petQueue: petQueue || null, adoptionQueue: adoptionQueue || null });
  }

  render() {
    console.log(this.state.adoptionQueue);
    return (
      <>
        {this.state.petQueue && this.state.petQueue.first ? (
          <PetQueue q={this.state.petQueue} />
        ) : (
          <p>No pets ready for adoption right now</p>
        )}
        {this.state.adoptionQueue && this.state.adoptionQueue.first ? (
          <p>Current person in line is {this.state.adoptionQueue.first.value.name}</p>
        ) : (
          <p>No one in line to adopt an animal</p>
        )}
        {this.state.adoptionQueue &&
          this.state.adoptionQueue.first &&
          this.state.adoptionQueue.first.value.name === 'You' && (
            <>
              <h2>Adopt this pet?</h2>
              <button onClick={() => this.adopt(true)}>YES</button>
              <button onClick={() => this.adopt(false)}>NO</button>
            </>
          )}
        {this.state.adopted && <Adopted adoptee={this.state.adopted} />}
      </>
    );
  }
}
