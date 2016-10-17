import React, { Component } from 'react';
import _ from 'underscore';
import HangmanDrawing from './components/HangmanDrawing';
import LetterSlots from './components/LetterSlots';
import HangmanKeyboard from './components/keyboard';
import words from './words';
import logo from './logo.svg';
import './hangman.scss';

class Hangman extends Component {

  componentWillMount() {
    this.newGame();
  }

  newGame() {
    let word = _.sample(words);
    let strikes = 0;
    let guesses = [];
    let over = false;
    let won = false;
    this.setState({word, strikes, guesses, over, won});
    console.log(word);
  }

  hasWon() {
    let {word, guesses} = this.state;
    return !_.chain(word.split(''))
      .map(letter => _.contains(guesses, letter))
      .contains(false)
      .value();
  }

  checkLetter(letter) {
    let {word, strikes, guesses, over, won} = this.state;

    if (_.contains(word,letter)) {

    } else {
      strikes++;
    }
    
    guesses.push(letter);

    won = this.hasWon();

    if (strikes >= 6 && !won) {
      strikes = 6;
      over = true;
    }

    this.setState({strikes, guesses, over, won});
  }

  getTitle() {
    if (this.state.won) {
      return 'YOU WON!';
    } else if (this.state.over) {
      return 'Game Over';
    } else {
      return 'Hang Man';
    }
  }

  newGameClass() {
    let playing = (!this.state.over && !this.state.won);
    return playing ? 'new-game' : 'new-game shown';
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to The Hangman Game</h2>
        </div>
        <div>
          <h1>{this.getTitle()}</h1>
          
          <HangmanDrawing
            won={this.state.won}
            strikes={this.state.strikes}/>
          
          <LetterSlots
            word={this.state.word}
            reveal={this.state.over}
            guesses={this.state.guesses}/>
          
          <HangmanKeyboard
            onPress={this.checkLetter.bind(this)}
            enabled={!this.state.over && !this.state.won}
            disabledLetters={this.state.guesses}/>
          
          <button 
            className={this.newGameClass()}
            disabled={!this.state.over && !this.state.won}
            onClick={this.newGame.bind(this)}>
            New Game
          </button>
        </div>
      </div>
    );
  }
}

export default Hangman;
