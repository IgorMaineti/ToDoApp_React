import React from "react";
import Header from "./Header";
import Action from "./Action";
import Options from "./Options";
import AddOption from "./AddOption";
import OptionModal from "./OptionModal";

export default class IndecisionApp extends React.Component {
  state = {
    options: [],
    selected: undefined
  };

  handleCloseModal = () => {
    this.setState(() => ({ selected: undefined }));
  };

  handleDeleteOptions = () => {
    this.setState(() => ({ options: [] }));
  };

  handleDeleteOption = optionToRemove => {
    this.setState(prevState => ({
      options: prevState.options.filter(option => {
        return optionToRemove !== option;
      })
    }));
  };

  handlePick = () => {
    const number = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[number];
    this.setState(() => ({ selected: option }));
    console.log(this.state.selected);
  };

  handleAddOption = option => {
    if (!option) {
      return "Enter a valid value to the item";
    } else if (this.state.options.indexOf(option) > -1) {
      return "This item already exists!";
    }

    this.setState(prevState => ({ options: prevState.options.concat(option) }));
  };

  componentDidMount() {
    try {
      const json = localStorage.getItem("options");
      const options = JSON.parse(json);

      if (options) {
        this.setState(() => ({ options }));
      }
    } catch (e) {}
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.options.length !== this.state.options.length) {
      const json = JSON.stringify(this.state.options);
      localStorage.setItem("options", json);
    }
  }

  componentWillUnmount() {}

  render() {
    const subtitles = "Put your life in the hand of a machine";
    return (
      <div>
        <Header subtitle={subtitles} />
        <div className="container">
          <Action
            hasOptions={this.state.options.length > 0}
            handlePick={this.handlePick}
          />
          <div className="widget">
            <Options
              options={this.state.options}
              handleDeleteOptions={this.handleDeleteOptions}
              handleDeleteOption={this.handleDeleteOption}
            />
            <AddOption handleAddOption={this.handleAddOption} />
          </div>
        </div>
        <OptionModal
          selectedOption={this.state.selected}
          handleCloseModal={this.handleCloseModal}
        />
      </div>
    );
  }
}
