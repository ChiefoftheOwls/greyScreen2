import React from 'react';
import { REACT_NATIVE_API_RIOT_KEY } from '../constants';


export const getSummonerFromRiotApi = async (url) => {
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

export const getMatchesFromRiotApi = async (url) => {
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

const getGameForMatchFromRiotApi = async (url) => {
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
    getMatchesFromRiotApi,
    getGameForMatchFromRiotApi,
    getSummonerFromRiotApi
};