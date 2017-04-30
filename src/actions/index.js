import axios from 'axios';
const NREL_API_KEY = 'pryBekY7BC9Ps8mgd0Dl9kzlMrnBGE1FwSLNY0hN';
const NREL_URL = `https://developer.nrel.gov/api/solar/data_query/v1.json?api_key=${NREL_API_KEY}`;
// https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=pryBekY7BC9Ps8mgd0Dl9kzlMrnBGE1FwSLNY0hN&lat=40&lon=-105
const SOLCAST_URL =
    'https://api.solcast.com.au/radiation/forecasts?&api_key=ojGJ9bvZS7vfGeAXpuwl8VjHbUdTJXIu&longitude=155.4872&latitude=19.6025';

export const FETCH_INSOLATION = 'FETCH_INSOLATION';
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const START_LOADER = 'START_LOADER';

export function fetchInsolation(latitude,longitude){
    const url=`${NREL_URL}&lat=${latitude}&lon=${longitude}`;
    const request = axios({
        method: 'get',
        url: SOLCAST_URL,
        auth:{
            username: 'ojGJ9bvZS7vfGeAXpuwl8VjHbUdTJXIu',
            password: ''
        }
    });
    console.log('Request:', request);
    return {
        type: FETCH_INSOLATION,
        payload: request
    }
}

export function startLoader(){
    return {
        type: START_LOADER,
        payload: true
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
            console.log(position);
        }, () => {
            reject (new Error('Permission denied'));
        });
    });


    return {
        type: FETCH_LOCATION,
        payload: location
    }
}