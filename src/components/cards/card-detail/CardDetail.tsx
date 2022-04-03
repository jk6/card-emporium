import { IMagicCard } from "../../../data/models/IMagicCard";


const CardDetail = ({ card }: { card: IMagicCard } | any) => {
    const {
        id,
        name,
        imageUrl,
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
        multiverseId,
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

    return (
        <>
            <h1>{name}</h1>
            <h3>{artist}</h3>
            <div>
                <img src={imageUrl} alt={name} />
            </div>
            <div><strong>Color Identity: </strong>{colorIdentity ? colorIdentity : notAvailable}</div>
            <div><strong>Layout: </strong>{layout ? layout : notAvailable}</div>
            <div><strong>Power: </strong>{power ? power : notAvailable}</div>
            <div><strong>Toughness: </strong>{toughness ? toughness : notAvailable}</div>
            <hr />
            {flavor && <p>"{flavor.replace('"', '')}"</p>}
            <p>{text}</p>
            <br />
        </>
    );
}

export default CardDetail;