/*
File Name   : LeftPane
Type        : Organism (Larger than a small part, Smaller than a Page)
Description : Handles the Operations like adding, deleting and selecting a question
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

// style
import './css/LeftPane.css';


export default class LeftPane extends Component {
    constructor(props){
  	     super(props);

         this.renderButtons = this.renderButtons.bind(this);
     }

     render() {
         return (
             <div className="div-leftpane">
                 <h2>Select your Questions</h2>

                 <div className="div-list-qns">
                     {this.props.Qns.map((Qn, index) => {
                        if(index == this.props.currIndex)
                            return (<div key={index} data-key={index} onClick={(elem) => this.props.updateQnView(elem)}><b>{index+1}. {Qn.Question}</b></div>)
                        else
                            return (<div key={index} data-key={index} onClick={(elem) => this.props.updateQnView(elem)}>{index+1}. {Qn.Question}</div>)
                      })}
                  </div>

                  {this.renderButtons()}
              </div>
          );
      }

      // Renders the buttons
      renderButtons() {
          return (<div className="div-buttons">
              <button className="btn-add" onClick={this.props.addQn}>Add</button>
              <button className="btn-delete" onClick={this.props.deleteQn}>Delete</button>
          </div>);
      }
}
