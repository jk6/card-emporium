import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { IMagicCard } from '../../../data/models/IMagicCard';
import CardDetail from '../card-detail/CardDetail';

const CardsGallery = ({ cards }: { [key: string]: IMagicCard[] }) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<IMagicCard>();

    const handleOpenModal = (card: IMagicCard) => {
        setSelected(card);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const results = cards.map((card: IMagicCard, i: number) => {
        return <span style={styles.hover} onClick={() => handleOpenModal(card)} key={`${card.id}`}>
            <img src={card.imageUrl} />
        </span>
    });

    return (
        <>
            <div>{results}</div>

            <ReactModal isOpen={isModalOpen} ariaHideApp={false}>
                <div>
                    <button onClick={handleCloseModal} type="button">Close</button>
                    <CardDetail card={selected} />

                </div>
            </ReactModal>
        </>
    );
};

const styles: any = {
    hover: {
        cursor: 'pointer',
    }
};

export default CardsGallery;