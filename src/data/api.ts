import axios from 'axios';
import { IMagicCard } from './models/IMagicCard';

export const API = {
    getPageOfCards: (page: number = 1, pageSize: number = 12): Promise<IMagicCard[]> => {
        // #### would normally place this URL in .env file and access via process.ENV variable ####
        // included here for convenience
        const url = `https://api.magicthegathering.io/v1/cards?page=${page}&pageSize=${pageSize}`;
        return axios
            .get(url)
            .then((res) => res.data.cards)
            .catch((error) => console.log(error));
    },
};
