import axios from 'axios';
const SOLCAST_API_KEY = 'ojGJ9bvZS7vfGeAXpuwl8VjHbUdTJXIu';
const SOLCAST_URL = `https://api.solcast.com.au/radiation/forecasts?&api_key=${SOLCAST_API_KEY}`;
// https://api.solcast.com.au/radiation/forecasts?&api_key=ojGJ9bvZS7vfGeAXpuwl8VjHbUdTJXIu&longitude=155.4872&latitude=19.6025

export const FETCH_INSOLATION = 'FETCH_INSOLATION';
export const FETCH_LOCATION = 'FETCH_LOCATION';


export function fetchInsolation(latitude,longitude){
    const url=`${SOLCAST_URL}&latitude=${latitude}&longitude=${longitude}&format=json`;
    const request = axios.get(url);
    console.log('Request:', request);
    return {
        type: FETCH_INSOLATION,
        payload: request
    }
}

export function fetchLocation(){

    const geolocation = navigator.geolocation;

    const location = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }

        geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject (new Error('Permission denied'));
        });
    });

    console.log('Request:', location);

    return {
        type: FETCH_LOCATION,
        payload: location
    }
}