import React from 'react';
import { REACT_NATIVE_API_RIOT_KEY } from '../constants';


export const getDataFromRiotApi = async (url) => {
    try {
      const response = await fetch (url, {
        headers: {
          "X-Riot-Token": REACT_NATIVE_API_RIOT_KEY
        }
      })
      const data = await response.json();
      return data;
    } 
    catch (error) {
      console.error(error);
    }
  };

export default {
    getDataFromRiotApi
};