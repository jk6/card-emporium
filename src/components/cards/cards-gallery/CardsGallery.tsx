import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { getAllCards } from '../../../data/api';
import { IMagicCard } from '../../../data/models/IMagicCard';
import CardDetail from '../card-detail/CardDetail';

const CardsGallery = () => {
    const [cards, setCards] = useState<IMagicCard[]>([]);
    const [filteredCards, setFilteredCards] = useState<IMagicCard[]>([]);
    const [selected, setSelected] = useState<IMagicCard>();
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(12);
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

    const filterResults = (term: string) => {
        // capitalize first letter of entered name
        term = `${term.charAt(0).toUpperCase()}${term.slice(1)}`;
        let result = cards.filter(card => card.name.includes(term));
        setFilteredCards(result);
    };

    const handleOpenModal = (card: IMagicCard) => {
        setSelected(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const cardsToDisplay = filteredCards.length ? filteredCards : cards;

    const results = cardsToDisplay.map((card: IMagicCard) => {
        return <span style={styles.hover} onClick={() => handleOpenModal(card)} key={`${card.id}`}>
            <img style={styles.cardPadding} src={card.imageUrl} />
        </span>
    });

    if (cards && cards?.length) {
        // TODO: replace with different solution
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

        return (
            <>
                <div>{results}</div>
                <div>{pageLinksDisplay}</div>
                <br />
                <br />
                <strong>Filter results</strong>
                <input type="text" onChange={(e) => filterResults(e.target.value)} />
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