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
        let sec = now.getSeconds(),
            min = now.getMinutes(),
            hour = now.getHours(),
            month = now.getMonth(),
            day = now.getDate(),
            year = now.getFullYear();
        let months = ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"];
      
        this.setState({
            sec: sec,
            min: min,
            hour: hour,
            month: months[month-1],
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
                    <span className="day">{this.state.day}  </span>
                    <span className="mon">{this.state.month}  </span>
                    <span className="year">{this.state.year}</span><br />
                    <span className="hour">{this.state.hour}</span>:
                    <span className="minut">{this.state.min}</span>:
                    <span className="second">{this.state.sec}</span>
                </div>
            </>
        );
    }
}

export default Clock;