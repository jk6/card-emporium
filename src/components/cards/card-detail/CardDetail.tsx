import { ILegality, IMagicCard } from "../../../data/models/IMagicCard";

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
        legalitiesDisplay = legalities.map((legality: ILegality) => {
            return (
                <li>
                    <strong>Format: </strong>{legality.format}, &nbsp;
                    <strong>Legality: </strong>{legality.legality}
                </li>
            );
        })
    }

    return (
        <>
            <h1>{name}</h1>
            <div>
                <img src={imageUrl} height={400} width={284} alt={name} />
            </div>

            <div><strong>Artist: </strong>{artist ? artist : notAvailable}</div>
            <div><strong>Set: </strong>{setName ? setName : notAvailable}</div>
            <div><strong>Type: </strong>{type ? type : notAvailable}</div>
            <div><strong>CMC: </strong>{cmc ? cmc : notAvailable}</div>
            <div><strong>Rarity: </strong>{rarity ? rarity : notAvailable}</div>

            <div>
                <strong>Legalities: </strong>
                {legalities.length ?
                    <ul style={styles.list}>{legalitiesDisplay}</ul>
                    : notAvailable}
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
};

const styles = {
    list: {
        listStyle: 'none',
    }
}

export default CardDetail;