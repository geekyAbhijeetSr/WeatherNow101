import React from 'react';

const convertLenght = (length, inCelsius) => {
    if (inCelsius) {
        return `${(length / 1000).toFixed(1)} km`;
    }
    else {
        return `${(length / 1609).toFixed(1)} mi`;
    }
}

const convertTemp = (temp, inCelsius) => {
    if (inCelsius) {
        return (temp - 273.15).toFixed(1);
    }
    else {
        return ((temp - 273.15) * (9 / 5) + 32).toFixed(1);
    }
}

const minmaxTemp = (min, max, inCelsius) => {
    return (
        <div className="minmax">
            <div className="high"><i className="arrow fas fa-long-arrow-alt-up"></i>{convertTemp(max, inCelsius)}&deg;</div>

            <div className="low"><i className="arrow fas fa-long-arrow-alt-down"></i>{convertTemp(min, inCelsius)}&deg;</div>
        </div>
    )
}

const direction = (deg) => {

    if (deg === 0 || deg === 360) {
        return "N";
    }
    else if (deg > 0 && deg < 45) {
        return "NNE";
    }
    else if (deg === 45) {
        return "NE";
    }
    else if (deg > 45 && deg < 90) {
        return "ENE";
    }
    else if (deg === 90) {
        return "E";
    }
    else if (deg > 90 && deg < 135) {
        return "ESE";
    }
    else if (deg === 135) {
        return "SE";
    }
    else if (deg > 135 && deg < 180) {
        return "SSE";
    }
    else if (deg === 180) {
        return "S";
    }
    else if (deg > 180 && deg < 225) {
        return "SSW";
    }
    else if (deg === 225) {
        return "SW";
    }
    else if (deg > 225 && deg < 270) {
        return "WSW";
    }
    else if (deg === 270) {
        return "W";
    }
    else if (deg > 270 && deg < 315) {
        return "WNW";
    }
    else if (deg === 315) {
        return "NW";
    }
    else if (deg > 315 && deg < 360) {
        return "NNW";
    }
    else {
        return "N/A";
    }

}


function getDate(offset, timeStamp = null) {
    offset = offset / 3600

    // create Date object for current location
    let d;
    if (timeStamp) {
        d = new Date(timeStamp * 1000);
    } else {
        d = new Date();
    }

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    const utc = d.getTime() + (d.getTimezoneOffset() * 60000);

    // create new Date object for different city
    // using supplied offset
    return new Date(utc + (3600000 * offset));

}


function ampm(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
}

const dayornight = (timezone, sunrisestamp, sunsetstamp) => {
    const currDate = getDate(timezone);
    const sunriseDate = getDate(timezone, sunrisestamp);
    const sunsetDate = getDate(timezone, sunsetstamp)

    const currHours = currDate.getHours();
    const sunriseHour = sunriseDate.getHours();
    const sunsetHour = sunsetDate.getHours();

    const currMin = currDate.getMinutes();
    const sunriseMin = sunriseDate.getMinutes();
    const sunsetMin = sunsetDate.getMinutes();


    const currTMin = currHours * 60 + currMin;
    const sunriseTMin = sunriseHour * 60 + sunriseMin;
    const sunsetTMin = sunsetHour * 60 + sunsetMin;


    if (currTMin >= sunriseTMin && currTMin < sunsetTMin) {
        return "day";
    }
    else {
        return "night";
    }
}

const weatherIcon = (dayOrNigh, weatherId) => {

    // thunderstorm 
    if ((weatherId >= 200 && weatherId <= 202) || (weatherId >= 230 && weatherId <= 232)) {
        return "004-storm"; // thunderstorm with rain
    }
    else if (weatherId >= 210 && weatherId <= 211) {
        return "003-storm"; // light thunderstorm
    }
    else if (weatherId === 212 || weatherId === 221) {
        return "005-thunderstorm"; // heavy thunderstorm
    }


    // drzzle and rain
    else if (weatherId === 300 || weatherId === 310 || weatherId === 500 || weatherId === 520) {
        if (dayOrNigh === "day") {
            return "060-rain";
        } else {
            return "001-rain"
        } // light rain
    }
    else if (weatherId === 301 || weatherId === 311 || weatherId === 501) {
        return "002-rain" // normal rain
    }
    else if (weatherId === 302 || (weatherId >= 312 && weatherId <= 321) || (weatherId >= 502 && weatherId <= 504) || (weatherId >= 521 && weatherId <= 531)) {
        return "004-storm" // heavy rain
    }
    else if (weatherId === 511) {
        return "006-blizzard" // freezing rain
    }

    // snow 
    else if ((weatherId >= 600 && weatherId <= 601) || (weatherId >= 620 && weatherId <= 621)) {
        return "033-snow" // light snow
    }
    else if (weatherId === 602 || weatherId === 622) {
        return "043-winter" // heavy snow
    }
    else if ((weatherId >= 611 && weatherId <= 616)) {
        return "006-blizzard2" // snow with rain
    }

    // atmosphere
    else if (weatherId === 701) {
        return "015-cloud" // mist
    }
    else if (weatherId === 711) {
        return "pollution" // smoke
    }
    else if (weatherId === 721) {
        return "haze" // haze
    }
    else if (weatherId === 731 || weatherId === 751 || weatherId === 761) {
        return "sand"
    }
    else if (weatherId === 741) {
        return "fog"
    }
    else if (weatherId === 762) {
        return "volcano"
    }
    else if (weatherId === 771) {
        return "057-wind"
    }
    else if (weatherId === 781) {
        return "036-tornado"
    }

    // clear 
    else if (weatherId === 800) {
        if (dayOrNigh === "day") {
            return "clearSky1"
        }
        else {
            return "clearSky2"
        }
    }

    // clouds
    else if (weatherId === 801 || weatherId === 802) {
        if (dayOrNigh === "day") {
            return "011-cloud"
        }
        else {
            return "055-night"
        }
    }
    else if (weatherId === 803) {
        return "024-cumulus"
    }
    else if (weatherId === 804) {
        return "025-stratuscumulus"
    }
}



const getbg = (dayOrNigh, weatherId) => {
    // clear sky 
    if (weatherId === 800) {
        if (dayOrNigh === 'day') {
            return "clearskyday"
        }
        else {
            return "clearskynight"
        }
    }

    // thunderstorm
    else if ((weatherId >= 200 && weatherId <= 202) || (weatherId >= 230 && weatherId <= 232)) {
        return "thunderstorm_with_rain"
    }
    else if (weatherId === 210) {
        return "light_thunderstorm"
    }
    else if (weatherId === 211) {
        return "thunderstorm"
    }
    else if (weatherId === 212) {
        return "heavy_thunderstorm"
    }
    else if (weatherId === 221) {
        return "ragged_thunderstorm"
    }

    // rain and drizzle
    else if (weatherId === 300 || weatherId === 310 || weatherId === 500 || weatherId === 520) {
        if (dayOrNigh === "day") {
            return "light_rain_day"
        }
        else {
            return "light_rain_night"
        }
    }
    else if (weatherId === 301 || weatherId === 311 || weatherId === 313 || weatherId === 321 || weatherId === 501 || weatherId === 521) {
        if (dayOrNigh === "day") {
            return "moderate_rain_day"
        }
        else {
            return "moderate_rain_night"
        }
    }
    else if (weatherId === 302 || weatherId === 312 || weatherId === 314 || weatherId === 502 || weatherId === 503 || weatherId === 504 || weatherId === 522 || weatherId === 531) {
        if (dayOrNigh === "day") {
            return "heavy_rain_day"
        }
        else {
            return "heavy_rain_night"
        }
    }
    else if (weatherId === 511 || weatherId === 615 || weatherId === 616) {
        if (dayOrNigh === 'day') {
            return "freezing_rain_day"
        }
        else {
            return "freezing_rain_night"
        }
    }


    // snow 
    else if (weatherId === 600 || weatherId === 620) {
        if (dayOrNigh === "day") {
            return "light_snow_day"
        }
        else {
            return "light_snow_night"
        }
    }
    else if (weatherId === 601 || weatherId === 621) {
        if (dayOrNigh === "day") {
            return "snow_day"
        }
        else {
            return "snow_night"
        }
    }
    else if (weatherId === 602 || weatherId === 622) {
        if (dayOrNigh === "day") {
            return "heavy_snow_day"
        }
        else {
            return "heavy_snow_night"
        }
    }
    else if (weatherId >= 611 && weatherId <= 613) {
        if (dayOrNigh === "day" ) {
            return "sleet_day"
        }
        else {
            return "sleet_night"
        }
    }
    



    // atmosphere
    else if (weatherId === 701) {
        if (dayOrNigh === "day") {
            return "mist_day"
        }
        else {
            return "mist_night"
        }
    }
    else if (weatherId === 711 || weatherId === 721) {
        if (dayOrNigh === "day") {
            return "smoke_day"
        }
        else {
            return "smoke_night"
        }
    }
    else if (weatherId === 731) {
        return "dust_whrils"
    }
    else if (weatherId === 741) {
        if (dayOrNigh === "day") {
            return "fog_day"
        }
        else {
            return "fog_night"
        }
    }
    else if (weatherId === 751 || weatherId === 761) {
        return "dust_sand"
    }
    else if (weatherId === 762) {
        return "volcanic_ash"
    }
    else if (weatherId === 771) {
        return "squall"
    }
    else if (weatherId === 781) {
        return "tornado"
    }




    // clouds 
    else if (weatherId === 801) {
        if (dayOrNigh === "day") {
            return "few_clouds_day"
        }
        else {
            return "few_clouds_night"
        }
    }

    else if (weatherId === 802) {
        if (dayOrNigh === "day") {
            return "scattered_clouds_day"
        }
        else {
            return "scattered_clouds_night"
        }
    }

    else if (weatherId === 803) {
        if (dayOrNigh === "day") {
            return "broken_clouds_day"
        }
        else {
            return "broken_clouds_night"
        }
    }

    else if (weatherId === 804) {
        if (dayOrNigh === "day") {
            return "overcast_clouds_day"
        }
        else {
            return "overcast_clouds_night"
        }
    }

}
export { convertLenght, convertTemp, minmaxTemp, direction, getDate, ampm, dayornight, weatherIcon, getbg };