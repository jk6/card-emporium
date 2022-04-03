import React from 'react';
import { IMagicCard } from '../../../data/models/IMagicCard';

const CardsGallery = ({ cards }: { [key: string]: IMagicCard[] }) => {
    const results = cards.map((card: IMagicCard, i: number) => {
        return <span key={`${card.id}`}>
            <img src={card.imageUrl} />
        </span>
    });

    return (
        <ul>{results}</ul>
    );
}

export default CardsGallery;