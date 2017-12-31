/*
File Name   : RightPane
Type        : Organism (Larger than a small part, Smaller than a Page)
Description : Handles the Operations happening the in the right panel covering the main functioality - designing the Questions
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// Molecules import
import Options from '../molecules/Options';
import ImageView from '../molecules/ImageView';

// style
import './css/RightPane.css';

export default class RightPane extends Component {
    constructor(props){
  	     super(props);

         this.state = Object.assign({}, this.props.Qn);

         this.handleChangeQuestion = this.handleChangeQuestion.bind(this);
         this.updateOptions = this.updateOptions.bind(this);
         this.updateImageURI = this.updateImageURI.bind(this);
    }

    componentDidMount() {
        this.refs.txtQuestion.style.height = (this.refs.txtQuestion.scrollHeight) + 'px';
    }

    // Updates the component if any different question is selected | Parameters: Next Props from Parent
    componentWillReceiveProps(nextProps) {
        if(this.props.currIndex != nextProps.currIndex) {
            this.setState({...nextProps.Qn});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(this.props.currIndex != prevProps.currIndex)
            this.refs.txtQuestion.style.height = (this.refs.txtQuestion.scrollHeight) + 'px';
    }

    // Updates the provided option by the molecule and pass it to parent | Paramter: Options
    updateOptions(options) {
        this.setState({'Options': options});
        this.props.updateQuestion({Question: this.refs.txtQuestion.value, Options: options, imageURI: this.props.Qn.imageURI});
    }

    // Updates the provided imageURI by the molecule and pass it to parent | Paramter: imageURI
    updateImageURI(imageURI) {
        this.setState({'imageURI': imageURI});
        this.props.updateQuestion({Question: this.refs.txtQuestion.value, Options: this.props.Qn.Options, imageURI: imageURI});
    }

    // Updates the change in Question Text to parent | No Paramters
    handleChangeQuestion() {
        this.setState({'Question': this.refs.txtQuestion.value});
        this.props.updateQuestion({Question: this.refs.txtQuestion.value, Options: this.props.Qn.Options, imageURI: this.props.Qn.imageURI});
        if(this.refs.txtQuestion.scrollHeight > this.refs.txtQuestion.offsetHeight)
            this.refs.txtQuestion.style.height = this.refs.txtQuestion.scrollHeight + 'px';
    }

    render() {
        return (
            <div className="div-rightpane">
                {this.renderHeader()}
                <div className="div-RightPane-main-container">
                    {this.renderQns()}
                    <Options Options={this.state.Options}
                        currIndex={this.props.currIndex}
                        key={this.props.currIndex}
                        update={this.updateOptions} />
                </div>
            </div>
        );
    }

    renderHeader() {
        return (<div className="header-container">
            <div className="icon-container" onClick={this.props.openLeftPane}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <h2 className="design">Design Question</h2>
            <h2 className="select">Select Questions</h2>
        </div>);
    }

    // Render the Question TextBox | No Paramters
    renderQns() {
        return (<div className="div-qncontainer">
            <label>Question {parseInt(this.props.currIndex)+1}.</label>
            <textarea placeholder="Question?"
                ref="txtQuestion"
                rows={1}
                defaultValue={this.state.Question}
                key={this.props.currIndex}
                onChange={this.handleChangeQuestion}
                autoFocus={true} ></textarea>
            <ImageView imageURI={this.state.imageURI} update={this.updateImageURI} />
        </div>);
    }

    // Renders the buttons | No Paramters
    renderButtons() {
        return (<div className="div-buttons">
            <button className="btn-add" onClick={this.props.addQn}>Add</button>
            <button className="btn-delete" onClick={this.props.deleteQn}>Delete</button>
        </div>);
    }
}
