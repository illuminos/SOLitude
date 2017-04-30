import axios from 'axios';
const NREL_API_KEY = 'pryBekY7BC9Ps8mgd0Dl9kzlMrnBGE1FwSLNY0hN';
const NREL_URL = `https://developer.nrel.gov/api/solar/data_query/v1.json?api_key=${NREL_API_KEY}`;
// https://developer.nrel.gov/api/solar/solar_resource/v1.json?api_key=pryBekY7BC9Ps8mgd0Dl9kzlMrnBGE1FwSLNY0hN&lat=40&lon=-105
const SOLCAST_URL =
    'https://api.solcast.com.au/radiation/forecasts?&api_key=ojGJ9bvZS7vfGeAXpuwl8VjHbUdTJXIu&longitude=-155.4872&latitude=19.6025';

export const FETCH_INSOLATION = 'FETCH_INSOLATION';
export const FETCH_LOCATION = 'FETCH_LOCATION';
export const START_LOADER = 'START_LOADER';
export const ENABLE_DEVICE = 'ENABLE_DEVICE';
export const UPDATE_BATTERY = 'UPDATE_BATTERY';

export function fetchInsolation(latitude,longitude){
    const url=`${NREL_URL}&lat=${latitude}&lon=${longitude}`;
    const request = axios.get(url);
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
    const position = new Promise((resolve, reject) => {
        if (!geolocation) {
            reject(new Error('Not Supported'));
        }
        geolocation.getCurrentPosition((position) => {
            resolve(position);
        }, () => {
            reject (new Error('Permission denied'));
        });
    });

    position.then(function(position){
        fetchInsolation(position.coords.latitude,position.coords.longitude);
    }, function(err){
        console.log(err);
    });

    return {
        type: FETCH_LOCATION,
        payload: position
    }
}

export function enableDevice(id){
    return{
        type: ENABLE_DEVICE,
        payload: id
    }
}

export function updateBattery(){
    return{
        type: UPDATE_BATTERY,
        payload: null
    }
}