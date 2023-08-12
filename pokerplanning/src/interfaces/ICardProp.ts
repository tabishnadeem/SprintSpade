

export default interface ICardProp {
    cardLabel?:string;
    id?:string;
    className?:string;
    onClick?:any;
    isBottomCard?:boolean;
    cardIcon?:string | JSX.Element;
    disabled?:boolean;
}