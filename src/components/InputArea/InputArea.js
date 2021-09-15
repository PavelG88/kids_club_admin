import React, { Component } from 'react';
import './InputArea.css';

class InputArea extends Component {

    state = {
        messageError: ''
    } 

    checkValue = (event) => {
        this.props.action(this.props.name, event.target.value);
    }

    render() { 
        return (
            <div className="input-area">
                <label className="input-area__field-label">
                    {this.props.label}  
                    <input 
                        name={this.props.name}
                        id={this.props.name}
                        type={this.props.type}
                        className="input-area__field-input"
                        value={this.props.value}
                        onChange={this.checkValue}
                        disabled={this.props.disabled}
                    />
                </label>
                <div className={this.state.messageError ? "error" : "error unvisible"}>{this.state.messageError}</div>
            </div>
        );
    }
}
 
export default InputArea;