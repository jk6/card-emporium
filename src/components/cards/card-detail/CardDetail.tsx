import { ILegality, IMagicCard } from "../../../data/models/IMagicCard";
import styled from 'styled-components';

const StyledList = styled.ul`
    list-style: none;
`;

const StyledImage = styled.img`
    height: 400px;
    width: 284px;
`;

const CardDetail = ({ card }: { card: IMagicCard } | any) => {
    const {
        id,
        name,
        imageUrl,
        setName,
        power,
        toughness,
        colors,
        colorIdentity,
        artist,
        cmc,
        flavor,
        foreignNames,
        layout,
        legalities,
        manaCost,
        multiverseid,
        number,
        originalText,
        originalType,
        printings,
        rarity,
        rulings,
        set,
        text,
        type,
        types
    } = card;

    const notAvailable = 'Not Available';
    let legalitiesDisplay;

    if (legalities && legalities?.length) {
        legalitiesDisplay = legalities.map((legality: ILegality, i: number) => {
            return (
                <li key={i}>
                    <strong>{legality.format}</strong>: {legality.legality}
                </li>
            );
        })
    }

    return (
        <>
            <h1>{name}</h1>
            <div>
                <StyledImage src={imageUrl} alt={name} />
            </div>

            {flavor && <p><em>"{flavor.replace('"', '')}"</em></p>}
            <p>{text}</p>

            <hr />

            <div><strong>Artist: </strong>{artist ? artist : notAvailable}</div>
            <div><strong>Set: </strong>{setName ? setName : notAvailable}</div>
            <div><strong>Type: </strong>{type ? type : notAvailable}</div>
            <div><strong>Power: </strong>{power ? power : notAvailable}</div>
            <div><strong>Toughness: </strong>{toughness ? toughness : notAvailable}</div>
            <div><strong>CMC: </strong>{cmc ? cmc : notAvailable}</div>
            <div><strong>Rarity: </strong>{rarity ? rarity : notAvailable}</div>

            <div>
                <strong>Legalities: </strong>
                {legalities.length ?
                    <StyledList>{legalitiesDisplay}</StyledList>
                    : notAvailable}
            </div>

            <div><strong>Color Identity: </strong>{colorIdentity ? colorIdentity : notAvailable}</div>
            <div><strong>Layout: </strong>{layout ? layout : notAvailable}</div>
            <hr />

            <br />
        </>
    );
};

export default CardDetail;