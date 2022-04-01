import React from 'react';
import { ICard } from '../../../data/models/ICard';

const CardsGallery = ({ cards }: { [key: string]: ICard[] }) => {
    const results = cards.map((card: ICard, i: number) => {
        return <li key={i}>{card.artist}</li>
    });

    return (
        <ul>{results}</ul>
    );
}

export default CardsGallery;