import { render } from '@testing-library/react';
import { IMagicCard } from '../../../../data/models/IMagicCard';
import CardDetail from '../CardDetail';

const mockCard: IMagicCard = {
    artist: "Pete Venters",
    cmc: 7,
    colorIdentity: ['W'],
    colors: ["White"],
    type: "Creature — Human Cleric",
    types: ["Creature"],
    manaCost: "{5}{W}{W}",
    subtypes: ["Human", "Cleric"],
    set: "10E",
    setName: "Tenth Edition",
    number: "1",
    power: "4",
    toughness: "4",
    printings: ["10E", "JUD", "UMA"],
    foreignNames: [
        {
            flavor: "„Es ist der Wille aller, und meine Hand, die ihn ausführt.\"",
            name: "Ausgewählter der Ahnfrau",
            language: "German",
            multiverseid: 148411
        }
    ],
    originalText: "First strike (This creature deals combat damage before creatures without first strike.)\nWhen Ancestor's Chosen comes into play, you gain 1 life for each card in your graveyard.",
    originalType: "Creature - Human Cleric",
    id: "5f8287b1-5bb6-5f4c-ad17-316a40d5bb0c",
    imageUrl: "http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=130550&type=card",
    layout: 'normal',
    legalities: [
        {
            format: 'Commander',
            legality: 'Legal'
        }
    ],
    multiverseid: 130550,
    name: "Ancestor's Chosen",
    rarity: "Uncommon",
    text: "First strike (This creature deals combat damage before creatures without first strike.)\nWhen Ancestor's Chosen enters the battlefield, you gain 1 life for each card in your graveyard.",
};
describe('<CardDetail />', () => {
    it('should mount the component', () => {
        const component = render(<CardDetail card={mockCard} />);
        expect(component).toBeDefined();
    })
});