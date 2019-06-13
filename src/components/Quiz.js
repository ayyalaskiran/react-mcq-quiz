import React from "react";
import { Data } from "./data";

class Quiz extends React.Component {
  state = {
    currentQuestion: 0,
    answersArray: [],
    myAnswer: null,
    choices: [],
    disabled: true,
    end: false
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    this.setState(() => {
      return {
        questions: Data[this.state.currentQuestion].question,
        answer: Data[this.state.currentQuestion].answer,
        choices: Data[this.state.currentQuestion].choices
      };
    });
  };


  nextQuestionButton = () => {
    const { myAnswer, answersArray } = this.state;
    var x = answersArray.concat(myAnswer);
    this.setState({
      currentQuestion: this.state.currentQuestion + 1,
      answersArray: x
    });
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.currentQuestion !== prevState.currentQuestion) {
      this.setState(() => {
        return {
          disabled: true,
          questions: Data[this.state.currentQuestion].question,
          choices: Data[this.state.currentQuestion].choices,
          answer: Data[this.state.currentQuestion].answer
        };
      });
    }
  }

  selectAnswer = (selectedAnswer) => {
    console.log(`Your answer is ${selectedAnswer}`);
    if (selectedAnswer === this.state.answer) {
      console.log('true');
    }
    else {
      console.log('false');
    }
    this.setState({ myAnswer: selectedAnswer, disabled: false });
  };

  submitButton = () => {
    const { myAnswer, answersArray } = this.state;
    var x = answersArray.concat(myAnswer);
    this.setState({ answersArray: x })
    if (this.state.currentQuestion === Data.length - 1) {
      this.setState({
        end: true
      });
    }
  };
  render() {
    const { choices, myAnswer, currentQuestion, end, answersArray } = this.state;
    if (end) {
      return (
        <div className="result">
          <h2>Results</h2>
          <ul>
            {Data.map((item, index) => (
              <div key={index}>
                <li>{item.question}</li>
                <li className="choices" key={index}>
                  {item.answer}
                </li>
                <li key={index} style={{ color: '#4b6cb7' }}>-->Your answer is {answersArray[index]}</li>
              </div>
            ))}
          </ul>
        </div>
      );
    } else {
      return (
        <div className="App">
          <h1>CSS Quiz</h1>
          <h2>{this.state.questions} </h2>
          <span>{`Question ${currentQuestion + 1}/${Data.length} `}</span>
          {choices.map((choice, index) => (
            <p
              key={index}
              className={`choices
         ${myAnswer === choice ? "selected" : null}
         `}
              onClick={() => this.selectAnswer(choice)}
            >
              {choice}
            </p>
          ))}
          {currentQuestion < Data.length - 1 && (
            <button
              className="button"
              disabled={this.state.disabled}
              onClick={this.nextQuestionButton}
            >
              Next
            </button>
          )}

          {currentQuestion === Data.length - 1 && (
            <button className="button" onClick={this.submitButton}>
              Submit
            </button>
          )}
        </div>
      );
    }
  }
}

export default Quiz;
