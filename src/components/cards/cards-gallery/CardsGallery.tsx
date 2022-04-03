import React from 'react';
import { IMagicCard } from '../../../data/models/IMagicCard';

const CardsGallery = ({ cards }: { [key: string]: IMagicCard[] }) => {
    const results = cards.map((card: IMagicCard, i: number) => {
        return <li key={i}>{card.artist}</li>
    });

    return (
        <ul>{results}</ul>
    );
}

export default CardsGallery;