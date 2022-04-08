import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { getAllCards } from '../../../data/api';
import { IMagicCard } from '../../../data/models/IMagicCard';
import CardDetail from '../card-detail/CardDetail';

const enum FilterTypes {
    'NAME' = 'Name',
    'COLOR' = 'Color'
}

const enum Page {
    'DEFAULT_PAGE_NUMBER' = 1,
    'DEFAULT_PAGE_SIZE' = 12
}

const CardsGallery = () => {
    const [cards, setCards] = useState<IMagicCard[]>([]);
    const [filteredCards, setFilteredCards] = useState<IMagicCard[]>([]);
    const [selected, setSelected] = useState<IMagicCard>();
    const [page, setPage] = useState<number>(Page.DEFAULT_PAGE_NUMBER);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(Page.DEFAULT_PAGE_SIZE);
    const [filterType, setFilterType] = useState<string>(FilterTypes.NAME);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const result = await getAllCards(page, pageSize);

            if (result) {
                setCards(result);
            }
        };

        getData();
    }, [page]);

    const handleChangePage = (pageNum: number): void => {
        setFilteredCards([]);
        setPage(pageNum);
    };

    const handleChangeFilterType = (value: string) => {
        setFilterType(value);
    }

    const filterResults = (term: string) => {
        if (term) {
            setIsSearchActive(true);

            // capitalize first letter of entered term
            term = `${term.charAt(0).toUpperCase()}${term.slice(1)}`;
            let result: IMagicCard[] = [];

            if (filterType === FilterTypes.NAME) {
                result = cards.filter(card => card.name.includes(term));
            }
            else if (filterType === FilterTypes.COLOR) {
                result = cards.filter(card => card.colors.includes(term));
            }
            setFilteredCards(result);
        }
        else {
            setIsSearchActive(false);
        }
    };

    const handleOpenModal = (card: IMagicCard) => {
        setSelected(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cardsToDisplay = filteredCards.length && isSearchActive ? filteredCards : cards;
    const magicCardColors: Array<'red' | 'blue' | 'black' | 'white' | 'green'> = ['red', 'blue', 'black', 'white', 'green'];

    const results = cardsToDisplay.map((card: IMagicCard) => {
        return <span style={styles.hover} onClick={() => handleOpenModal(card)} key={`${card.id}`}>
            <img style={styles.cardPadding} src={card.imageUrl} />
        </span>
    });

    if (cards && cards?.length) {
        // TODO: replace with different solution in next iteration
        let pageLinksDisplay = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i: number) => {
            return (
                <span
                    key={i}
                    onClick={() => handleChangePage(i)}
                    style={page === i ? styles.active : null}
                >
                    <a href="#">{i}</a>&nbsp;&nbsp;
                </span>
            );
        });

        const colorsOptionsDisplay = magicCardColors.map((color: string, i: number) => {
            return <option key={i} value={color}>{color}</option>;
        });

        return (
            <>
                {isSearchActive && filteredCards.length === 0 ?
                    <div>No results found.</div>
                    :
                    <>
                        <div>{results}</div>
                        <div>{pageLinksDisplay}</div>
                    </>
                }
                <br />
                <br />
                <strong>Filter results by</strong>&nbsp;
                <select onChange={(e) => handleChangeFilterType(e.target.value)}>
                    <option value={FilterTypes.NAME}>Name</option>
                    <option value={FilterTypes.COLOR}>Color</option>
                </select>&nbsp;

                {filterType === FilterTypes.NAME &&
                    <input
                        type="text"
                        id="search"
                        onChange={(e) => filterResults(e.target.value)}
                    />}

                {filterType === FilterTypes.COLOR &&
                    <select onChange={e => filterResults(e.target.value)}>
                        {colorsOptionsDisplay}
                    </select>}
                <br />
                <br />

                <ReactModal isOpen={isModalOpen} ariaHideApp={false}>
                    <div>
                        <button onClick={handleCloseModal} type="button">Close</button>
                        <CardDetail card={selected} />
                    </div>
                </ReactModal>
            </>
        );
    }
    else {
        return (
            <div>No cards found.</div>
        );
    }
};

const styles: any = {
    hover: {
        cursor: 'pointer',
    },
    active: {
        fontSize: '22px',
    },
    cardPadding: {
        padding: '2px',
    },
};

export default CardsGallery;