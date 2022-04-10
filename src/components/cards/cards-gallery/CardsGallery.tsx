import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { API } from '../../../data/api';
import { IMagicCard } from '../../../data/models/IMagicCard';
import CardDetail from '../card-detail/CardDetail';
import Select from 'react-select';
import styled from 'styled-components';

const enum FilterTypes {
    'NAME' = 'Name',
    'COLOR' = 'Color'
}

const enum Page {
    'DEFAULT_PAGE_NUMBER' = 1,
    'DEFAULT_PAGE_SIZE' = 12
}

interface ColorOption {
    value: 'Red' | 'White' | 'Blue' | 'Black' | 'Green';
    label: 'Red' | 'White' | 'Blue' | 'Black' | 'Green';
}

const defaultColorOptions: ColorOption[] = [
    {
        value: 'Red',
        label: 'Red'
    },
    {
        value: 'White',
        label: 'White'
    },
    {
        value: 'Blue',
        label: 'Blue'
    },
    {
        value: 'Black',
        label: 'Black'
    },
    {
        value: 'Green',
        label: 'Green'
    },
];

const StyledButton = styled.button`
    border: 2px solid black;
    background-color: white;
    border-radius: 8px;
    color: black;
    padding: 14px 28px;
    font-size: 16px;
    cursor: pointer;
`;

const StyledGalleryImage = styled.img`
    padding: 2px;
    cursor: pointer;
`;

const SpaceSpan = styled.span`
    position: fixed;
    bottom: 0;
    width: 100%;
`;

const CardsGallery = () => {
    const [cards, setCards] = useState<IMagicCard[]>([]);
    const [filteredCards, setFilteredCards] = useState<IMagicCard[]>([]);
    const [selected, setSelected] = useState<IMagicCard>();
    const [page, setPage] = useState<number>(Page.DEFAULT_PAGE_NUMBER);
    const [colorOptions, setColorOptions] = useState<any[]>(defaultColorOptions);
    const [isSearchActive, setIsSearchActive] = useState<boolean>(false);
    const [pageSize, setPageSize] = useState<number>(Page.DEFAULT_PAGE_SIZE);
    const [filterType, setFilterType] = useState<string>(FilterTypes.NAME);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        const getData = async (): Promise<void> => {
            const result = await API.getAllCards(page, pageSize);

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

    const filterColors = (colors: any) => {
        if (colors.length) {
            setIsSearchActive(true);

            let result: IMagicCard[] = [];
            const colorNames: string[] = colors.map((card: any) => card.value);

            colorNames.forEach(color => {
                let tempResult: IMagicCard[] = cards.filter((card: IMagicCard) => card.colors.includes(color));

                if (tempResult.length) {
                    result.push(...tempResult);
                }
            });

            setFilteredCards(result);
        }
        else {
            setIsSearchActive(false);
        }
    };

    const filterName = (name: string) => {
        if (name) {
            setIsSearchActive(true);

            // capitalize first letter of entered name
            name = `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
            let result: IMagicCard[] = cards.filter(card => card.name.includes(name));
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

    const results = cardsToDisplay.map((card: IMagicCard) => {
        return (
            <StyledGalleryImage
                key={`${card.id}`}
                src={card.imageUrl}
                onClick={() => handleOpenModal(card)}
            />
        );
    });

    if (cards && cards?.length) {
        // TODO: replace with dynamically-generated links solution in next iteration
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
                <div>
                    <br />
                    <strong>Filter results by</strong>&nbsp;
                    <select onChange={(e) => handleChangeFilterType(e.target.value)}>
                        <option value={FilterTypes.NAME}>Name</option>
                        <option value={FilterTypes.COLOR}>Color</option>
                    </select>&nbsp;

                    {filterType === FilterTypes.NAME &&
                        <input
                            type="text"
                            data-testid="search"
                            onChange={(e) => filterName(e.target.value)}
                        />}

                    {filterType === FilterTypes.COLOR &&
                        <div style={styles.multiSelectWidth}>
                            <Select
                                defaultValue={[]}
                                isMulti
                                name="colors"
                                options={colorOptions}
                                className="basic-multi-select"
                                classNamePrefix="select"
                                onChange={filterColors}
                            />
                        </div>
                    }
                </div>
                <br />
                {isSearchActive && filteredCards.length === 0 ?
                    <div data-testid="noFilterResults">No results found.</div>
                    :
                    <>
                        <div>{results}</div>
                        <div>{pageLinksDisplay}</div>
                    </>
                }
                <br />
                <br />

                <br />
                <br />
                <SpaceSpan>&nbsp;</SpaceSpan>

                <ReactModal isOpen={isModalOpen} ariaHideApp={false}>
                    <div>
                        <StyledButton onClick={handleCloseModal} type="button">Close</StyledButton>
                        <CardDetail card={selected} />
                    </div>
                </ReactModal>
            </>
        );
    }
    else {
        return (
            <div data-testid="noCards">No cards found.</div>
        );
    }
};

const styles: any = {
    active: {
        fontSize: '22px',
    },
    multiSelectWidth: {
        maxWidth: '60%'
    }
};

export default CardsGallery;