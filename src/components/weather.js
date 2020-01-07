import React, { Component } from 'react';
import { convertLenght, convertTemp, minmaxTemp, direction, getDate, ampm } from '../functions/functions';

class MainWeather extends Component {
    constructor(props) {
        super(props);
        this.state = {
            timeago: '0 minutes ago'
        }
        this.t = null;
    }
    componentDidMount() {
        this.updateTime();
    }
    timeDifference = (current, previous) => {

        var msPerMinute = 60 * 1000;
        var msPerHour = msPerMinute * 60;
        var msPerDay = msPerHour * 24;
        var msPerMonth = msPerDay * 30;
        var msPerYear = msPerDay * 365;

        var elapsed = current - previous;

        // if (elapsed < msPerMinute) {
        //     return Math.round(elapsed / 1000) + ' seconds ago';
        // }

         if (elapsed < msPerHour) {
            return Math.round(elapsed / msPerMinute) + ' minutes ago';
        }

        else if (elapsed < msPerDay) {
            return Math.round(elapsed / msPerHour) + ' hours ago';
        }

        else if (elapsed < msPerMonth) {
            return 'approximately ' + Math.round(elapsed / msPerDay) + ' days ago';
        }

        else if (elapsed < msPerYear) {
            return 'approximately ' + Math.round(elapsed / msPerMonth) + ' months ago';
        }

        else {
            return 'approximately ' + Math.round(elapsed / msPerYear) + ' years ago';
        }
    }

    update = (e) => {
        this.props.refreshOnClick(e);
        setTimeout(() => {
            this.updateTime();
        }, 1000)
        
    }

    updateTime = () => {
        var prev = new Date();
    
        clearInterval(this.t);
        this.setState({
            timeago: this.timeDifference(new Date(), prev)
        })
        this.t = setInterval(() => {
            this.setState({
                timeago: this.timeDifference(new Date(), prev)
            })
            
        }, 60000)
    }
    componentDidUpdate(prevProps) {
        
        if (prevProps.props.cityId !== this.props.props.cityId) {
            this.updateTime();
        }
      }

    render() {
        const { props, changeOnClick } = this.props;
        return props.city ?
            (
                <div className="box">
                    <div className="dashboard">
                        <h1>{props.city}, {props.country}</h1>

                        <div className="visual-description">
                            <img src={`/weather_icon/${props.icon}.svg`} alt="" />
                            <h2>{props.main}</h2>
                        </div>

                        <div className="temp">

                            <div>
                                <h1>{convertTemp(props.temp, props.inCelsius)}&deg;</h1>
                            </div>

                            <div className="c-or-f">
                                <span className="up" >{props.up}</span>
                                <span className="down" onClick={() => changeOnClick()}>{props.down}</span>
                            </div>

                        </div>

                        {minmaxTemp(props.temp_min, props.temp_max, props.inCelsius)}
                    </div>
                    <span className="refresh"><h6>{this.state.timeago}</h6> <i onClick={this.update} className="fas fa-redo-alt refreshIcon"></i></span>

                </div>
            )
            :
            (
                null
            )

    }
}

const OtherDetails = ({ props }) => {
    return props.city ?
        (
            <div className="box">
                <ul className="otherDetails">
                    <li id="weather"><div className='property'>Weather</div><div className="value">{props.description}</div></li>

                    <li><div className="property">Feels Like</div><div className="value">{convertTemp(props.feels_like, props.inCelsius)}&deg;</div></li>

                    <li><div className="property">Humidity</div><div className="value">{props.humidity}%</div></li>

                    <li><div className="property">Visibility</div><div className="value">{convertLenght(props.visibility, props.inCelsius)}</div></li>

                    <li><div className="property">Pressure</div><div className="value">{props.pressure} hPa</div></li>

                    <li><div className="property">Clouds</div><div className="value">{props.cloudsAll}%</div></li>

                </ul>
            </div>
        )
        :
        (
            null
        )
}


const WindDetails = ({ props }) => {
    let styles;
    if (props.deg !== undefined) {
        styles = {
            deg: {
                transform: `rotate(${props.deg}deg)`,
                display: 'block'
            }
        }
    }
    else {
        styles = {
            deg: {
                display: 'none'
            }
        }
    }

    return (props.speed !== undefined && props.city)
        ?
        (
            <div className="box windDetails">
                <h2>Wind Details</h2>
                <div className="compass">
                    <div className="direction">
                        <p>{direction(props.deg)}<span>{props.speed} m/s</span></p>
                    </div>
                    <div className="arrow" style={styles.deg}></div>
                </div>

                <div>
                    <p></p>
                </div>
            </div>
        )

        :
        (
            null
        )


}

const Sun = ({ props }) => {

    return props.city
        ?
        (
            <div className="box sun">
                <div className="width-80">
                    <div className="sunrise">
                        <img src="weather_icon/029-sunrise.svg" alt="sunrise" />
                        <p>{ampm(getDate(props.timezone, props.sunrise))}</p>
                    </div>
                    <div className="sunset">
                        <img src="weather_icon/030-sunsets.svg" alt="sunrise" />
                        <p>{ampm(getDate(props.timezone, props.sunset))}</p>
                    </div>
                </div>
            </div>
        )
        :
        (
            null
        )
}




export { MainWeather, OtherDetails, WindDetails, Sun };
