import React, { Component } from 'react';
import _ from 'underscore';

const ROW_ONE = 'abcdefghijklm'.split('');
const ROW_TWO = 'nopqrstuvwxyz'.split('');

class Keyboard extends Component {

	handleClick(letter) {
    if (this.props.enabled) {
      this.props.onPress(letter);
    }
  }

  getButton(letter) {
    let disabled = _.includes(this.props.disabledLetters, letter);
    return (
      <button 
        key={letter}
        onClick={this.handleClick.bind(this, letter)}
        disabled={disabled}>
        {letter}
      </button>
    );
  }

  getRow(row) {
    return (
      <div className='button-row' key={row.join('')}>
        {row.map(this.getButton, this)}
      </div>
    );
  }

  render() {
    return (
      <div className='hangman-keyboard'>
        {[ROW_ONE, ROW_TWO].map(this.getRow, this)}
      </div>
    );
  }
}

export default Keyboard;