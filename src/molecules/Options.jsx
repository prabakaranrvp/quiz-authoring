/*
File Name   : Options
Type        : Molecule (A Smaller part with few functionalities)
Description : Handles rendering, adding, deleting and updating options of a question
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// style
import './css/Options.css';

// Const Values used to determine the conditions for Options
const MIN_OPTIONS_LEN = 2;
const MAX_OPTIONS_LEN = 6;

export default class Options extends Component {
    constructor(props) {
        super(props);

        this.state = {Options :this.props.Options, timeStamp: new Date().getTime()};

        this.addOption = this.addOption.bind(this);
        this.removeOption = this.removeOption.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyInput = this.handleKeyInput.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.state.Options.length != prevState.Options.length) {
            this.refs[`Option-${this.props.currIndex}-${this.state.Options.length-1}`].focus();
            window.scrollTo(0,0);
        }
    }

    // For Adding a option | No parameters
    addOption() {
        if(this.state.Options.length < MAX_OPTIONS_LEN) {
            let options = this.state.Options.slice();
            options.push('');
            this.setState({'Options': options});
            this.props.update(options);
        }
    }

    // Removes a option | Parameter: remove button click event
    removeOption(e) {
        let options = this.state.Options.slice();
        options.splice(parseInt(e.currentTarget.getAttribute('data-key')),1);
        if(options.length >= MIN_OPTIONS_LEN) {
            this.setState({Options: options, timeStamp: new Date().getTime()});
            this.props.update(options);
        }
    }

    // Updates the change of the options' value to parent | Parameter: change event of the option text box
    handleChange(e) {
        let options = this.state.Options, target = e.currentTarget;
        options[target.getAttribute('data-key')] = target.value;
        this.setState({Options: options});
        this.props.update(this.state.Options);
    }

    // Handle Enter Key Press | Parameter: keypress event of the option text box
    handleKeyInput(e) {
        let key = parseInt(e.currentTarget.getAttribute('data-key'));
        if(e.keyCode == 13 && this.state.Options.length <= MAX_OPTIONS_LEN)
            if(key == this.state.Options.length-1)
                this.addOption();
            else
                this.refs[`Option-${this.props.currIndex}-${key+1}`].focus();
    }

    render() {
        const plus = (<span className="plus" onClick={this.addOption}>+</span>);
        let plusVisibleClass = 'disable';

        if(this.state.Options.length > MIN_OPTIONS_LEN)
            plusVisibleClass = 'enable';

        return (
            <div className="div-options-main-container">
                <div>
                    <label className="lbl-option">Options</label>
                </div>
                <div className={`div-options-container ${plusVisibleClass}`} ref="optionsContainer">
                    {(this.state.Options).map((option, index) => {
                        let elem = (<input type="text" placeholder={`Option ${index+1}`}
                            defaultValue={option}
                            ref={`Option-${this.props.currIndex}-${index}`}
                            onChange={this.handleChange}
                            onKeyUp={this.handleKeyInput}
                            data-ref={`Option-${this.props.currIndex}-${index}`}
                            data-key={index}
                        />),
                        minus = (<span className="minus" data-key={index} onClick={this.removeOption}>-</span>),
                        key = index+''+this.state.timeStamp;

                        if(index==this.state.Options.length-1 && index!=(MAX_OPTIONS_LEN-1))
                            return (<div className="div-option" key={key}>{elem}{minus}{plus}</div>)
                        else
                          return (<div className="div-option" key={key}>{elem}{minus}</div>)
                    })}
                </div>
            </div>
        );
    }
}


Options.propTypes = {
    Options: PropTypes.arrayOf(PropTypes.string),
    currIndex: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number
    ]),
    update: PropTypes.func
}

Options.defaultProps = {
    Options: ['',''],
    currIndex: 0,
    update: function() {}
}
