export declare enum CharacterEnum {
    redKnight = "redKnight"
}
export declare type PlayerType = {
    id: number;
    name: string;
    character: CharacterEnum;
};
export declare type RoomType = {
    id: number;
    name: string;
    players: Array<PlayerType>;
};
export declare type RoomFormType = {
    name: string;
};
export declare type RoomInput = {
    name: string;
};
export declare type PlayerInput = {
    id: number;
    name: string;
};
export declare type RoomSubscriptionInput = {
    id: number;
};
//# sourceMappingURL=RoomTypes.d.ts.map