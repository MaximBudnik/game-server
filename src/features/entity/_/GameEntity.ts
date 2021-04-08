import {position} from "../../../../types"

export interface IGameEntity {
    position: position,
    loopAction: () => void
    getEntityData: () => any
}

interface GameEntityConstructorParams {
    position: position;
}

export class GameEntity implements IGameEntity {
    position = {
        x: 0,
        y: 0
    }

    constructor({position}: GameEntityConstructorParams) {
        this.position = position
    }

    loopAction = () => {

    }

    getEntityData = () => {
    }
}
