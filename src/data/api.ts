import axios from 'axios';
import { ICard } from './models/ICard';

export const getAllCards = (): Promise<ICard[]> => {
    // #### would normally place this URL in .env file and access via process.ENV variable ####
    const url = 'https://api.magicthegathering.io/v1/cards';
    return axios
        .get(url)
        .then((res) => res.data.cards)
        .catch(() => console.log('something went wrong!'));
};
