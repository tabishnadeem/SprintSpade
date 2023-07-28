

export default interface IPayload{
    [key:string]:UserSubInfo
}


export interface UserSubInfo{
    isSelected:boolean;
    value:string;
}