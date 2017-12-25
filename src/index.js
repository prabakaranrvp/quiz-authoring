import React, { Component } from 'react';
import ReactDOM from 'react-dom';

// CSS Import
import './css/index.css';

// Organisms Import (React Components)
import LeftPane from './organisms/LeftPane';
import RightPane from './organisms/RightPane';

const DEFAULT_QN_PRETEXT = 'New Question '

class App extends Component {
    constructor(props){
  	     super(props);

        let Qns = new Array();
        Qns.push({'Question' : DEFAULT_QN_PRETEXT + (Qns.length+1), 'Options' : ['',''], 'imageURI' : '#'});
      	this.state = { qns : Qns, currIndex: 0, leftPane: 'closed' };

        this.addNewQuestion = this.addNewQuestion.bind(this);
        this.updateCurrQn = this.updateCurrQn.bind(this);
        this.updateQnView = this.updateQnView.bind(this);
        this.deleteQn = this.deleteQn.bind(this);
        this.openLeftPane = this.openLeftPane.bind(this);
    }

    // Check and load for the data in localStorage | No Paramters
    componentWillMount() {
        if(window.localStorage.getItem('questions') != null) {
            let oldState = JSON.parse(window.localStorage.getItem('questions'));
            this.setState({...oldState});
        }
    }

    // Update the data in the localStorage whenever the data updates | Default Paramters - Unused
    componentDidUpdate(prevProps, prevState) {
        try {
            window.localStorage.setItem('questions', JSON.stringify(this.state));
        }
        // Failed when tried to store the data in browser's localStorage
        catch(e) {
            // Try Storing without the imageURI (imageURI has changes for having large data)
            try {
                let jsnState = Object.assign({}, this.state);
                jsnState.qns.map((qn) => {
                    qn.imageURI = '#'
                });
                window.localStorage.setItem('questions', JSON.stringify(jsnState));
            }
            // Error on storing data localStorage - Local Storage Failed
            catch (err) {
                console.error("Local Storage Error: Can't store data! Please use updated browsers to keep your data intact.");
            }
        }
    }

    // Updates the current question provided by Organism | Paramter : Qn - JSON data containing info pertaining to the current Qn
    updateCurrQn(Qn) {
        let Qns = this.state.qns;
        Qns[this.state.currIndex] = Qn;
        this.setState({qns: Qns, currQn: {...Qn}});
    }

    // Adds a new Question to design | No Paramters
    addNewQuestion() {
        let Qns = this.state.qns.slice();
        if((this.state.qns.slice().map(Qn => Qn.Question)).indexOf('') < 0) {
            Qns.push({'Question' : DEFAULT_QN_PRETEXT + (Qns.length+1), 'Options' : ['',''], 'imageURI' : '#'});
            this.setState({qns : Qns, currIndex : Qns.length-1, leftPane: 'closed'});
        } else {
            alert("Please provide question text for all the available questions before adding a new Question");
        }

    }

    // Updates the pointer to current Question which in turn updates all the child components | Parameter: click event from the questions list
    updateQnView(elem) {
        this.setState({currIndex: elem.currentTarget.getAttribute('data-key'), leftPane: 'closed'});
    }

    // Delete the current question from the List | No Paramters
    deleteQn() {
        if(this.state.qns.length > 1 &&  window.confirm('This will delete the question "' + this.state.qns[this.state.currIndex]['Question'] + '" completely. Are you sure?')) {
            let Qns = this.state.qns;
            Qns.splice(this.state.currIndex,1);
            let currIndex = (this.state.currIndex - 1 >= 0)?this.state.currIndex - 1:0;
            this.setState({qns: Qns, currIndex: currIndex, leftPane: 'closed'});
        }
    }

    openLeftPane() {
        if(this.state.leftPane === 'closed')
            this.setState({leftPane: 'opened'});
        else
            this.setState({leftPane: 'closed'});
    }

    render() {
        let currQn = this.state.qns[this.state.currIndex];
        return (
            <div className={`App ${this.state.leftPane}`}>
                <LeftPane
                    Qns={this.state.qns}
                    currIndex={this.state.currIndex}
                    updateQnView={this.updateQnView}
                    addQn={this.addNewQuestion}
                    deleteQn={this.deleteQn} />
                <RightPane
                    qnsLen={this.state.qns.length}
                    addQn={this.addNewQuestion}
                    deleteQn={this.deleteQn}
                    Qn={currQn}
                    updateQuestion={this.updateCurrQn}
                    currIndex={this.state.currIndex}
                    openLeftPane={this.openLeftPane} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));
