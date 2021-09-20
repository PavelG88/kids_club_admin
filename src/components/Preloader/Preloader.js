import React, { Component } from 'react';

import './Preloader.css';

class Preloader extends Component {
    render() {
        return(
            <div className="preloader">
                <div className="preloader__background">
                    <span className="preloader__text">Загрузка из базы </span>
                    <img className="preloader__img" src="/images/preloader.svg" alt="preloader"/>
                </div>
            </div>
        );
    }
}

export default Preloader;