import { Hash } from 'crypto';

export interface ICard {
    name: string;
    names?: string[];
    layout: 'normal|split|flip|double-faced|token|plane|scheme|phenomenon|leveler|vanguard|aftermath';
    cmc: number;
    colors: string[];
    colorIdentity: string[];
    type: string;
    supertypes: string[];
    types: string[];
    subtypes: string[];
    rarity: string;
    set: string;
    setName: string;
    text: string;
    artist: string;
    number: string;
    power: string;
    toughness: string;
    multiverseid: number;
    imageUrl: string;
    rulings: IRuling[];
    foreignNames: IForeignName[];
    printings: string[];
    originalText: string;
    originalType: string;
    id: Hash;
    flavor?: string;
    gameFormat?: string;
    legality?: string;
    page?: number;
}

export interface IRuling {
    date: string;
    text: string;
}

export interface IForeignName {
    name: string;
    language: string;
    multiverseid: number;
}
