import axios from 'axios';
import { IMagicCard } from './models/IMagicCard';

export const getAllCards = (): Promise<IMagicCard[]> => {
    // #### would normally place this URL in .env file and access via process.ENV variable ####
    const url = 'https://api.magicthegathering.io/v1/cards';
    return axios
        .get(url)
        .then((res) => res.data.cards)
        .catch(() => console.log('something went wrong!'));
};
