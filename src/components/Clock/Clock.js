import React, { Component } from 'react';

import './Clock.css';

class Clock extends Component {

    state = {
        sec: null,
        min: null,
        hour: null,
        month: null,
        day: null,
        year: null
    };

   updateClock = () => {
        let now = new Date();
        let sec = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds(),
            min = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes(),
            hour = now.getHours() < 10 ? '0' + now.getHours() : now.getHours(),
            month = now.getMonth(),
            day = now.getDate(),
            year = now.getFullYear();
        let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
      
        this.setState({
            sec: sec,
            min: min,
            hour: hour,
            month: months[month],
            day: day,
            year: year
        });
    }
    
    componentDidMount() {
        window.setInterval(this.updateClock, 1000);
    }

    componentWillUnmount() {
        window.clearInterval(this.updateClock);
    }

    render() { 
        return (
            <>
                <div className="timedate">
                    <span className="date">{this.state.day} {this.state.month} {this.state.year}</span><br/>
                    <span className="time">{this.state.hour}:{this.state.min}:{this.state.sec}</span>
                </div>
            </>
        );
    }
}

export default Clock;