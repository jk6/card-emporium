import React, { useEffect, useState } from 'react';
import { getAllCards } from '../../../data/api';
import { IMagicCard } from '../../../data/models/IMagicCard';
import CardsGallery from '../cards-gallery/CardsGallery';

const CardsContainer = () => {
    const [cards, setCards] = useState<IMagicCard[]>([]);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const result = await getAllCards();

            if (result) {
                setCards(result);
            }
        };

        getData();
    }, []);

    if (cards && cards?.length) {
        return (
            <CardsGallery cards={cards} />
        );
    }
    else {
        return (
            <div>No cards found.</div>
        );
    }
}

export default CardsContainer;