import React, { Component } from 'react';
import './InputArea.css';

let dateFormat = require("dateformat");
const today = dateFormat(new Date(), 'yyyy-mm-dd');

class InputArea extends Component {

    state = {
        messageError: ''
    } 

    checkValue = (event) => {
        let isError = true;
        
        if (event.target.name === 'birthday') {
            //Проверка даты рождения
            let err = 'некорректная дата рождения';
            if (event.target.value >= today) {
                this.setState({ messageError: `* ${err}` });
            } else {
                this.setState({ messageError: '' });
                isError = false;
            }

        } else if (event.target.name === 'parent_phone') {
            //Проверка номера телефона
            let err = 'формат ввода: 8ХХХХХХХХХХ';
            let reg = new RegExp('^8[0-9]{10}$');
            if (!reg.test(event.target.value) && event.target.value) {
                this.setState({ messageError: `* ${err}` });
            } else {
                this.setState({ messageError: '' });
                isError = false;
            }


        } else {
            //Проверка текстовых полей
            let reg = new RegExp('^[а-яА-Я- ]+$');
            let err_1 = 'только русские буквы';
            let err_2 = '3 и более символа';
            
            if (!reg.test(event.target.value) && event.target.value.length < 3 && event.target.value) {
                this.setState({ messageError: `* ${err_1}, ${err_2}` });
            } else if (!reg.test(event.target.value) && event.target.value.length >= 3) {
                this.setState({ messageError: `* ${err_1}` });
            } else if (reg.test(event.target.value) && event.target.value.length < 3 && event.target.value) {
                this.setState({ messageError: `* ${err_2}` });
            }else {
                this.setState({ messageError: '' });
                isError = false;
            }
        }

        if (isError) {
            this.props.action(this.props.name, null);
        } else {
            this.props.action(this.props.name, event.target.value);
        }
        
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