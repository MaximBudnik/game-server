import {GameEntity, IGameEntity, moveMixin} from "../../entity";
import {movePayload, playerActionType, PlayerEntityType, position} from "../../../../types";


export interface IPlayer extends IGameEntity {
    popActionQueue: () => playerActionType
    addActionQueue: (action: playerActionType) => void
    playerId: number
}

export type PlayerEntityConstructorParams = {
    id: number
    position: position
}

class PlayerEntity extends moveMixin(GameEntity) implements IPlayer {
    private readonly _playerId: number
    private readonly _actionQueue: Array<playerActionType> = []

    constructor({id, position}: PlayerEntityConstructorParams) {
        super({position});
        this._playerId = id
    }

    get playerId() {
        return this._playerId
    }

    loopAction = () => {
        let action: playerActionType = this.popActionQueue()
        if (action) {
            switch (action.type) {
                case "move":
                    action = action as playerActionType<movePayload>
                    this.move({...action.payload})
            }
        }
    }

    popActionQueue = (): playerActionType => {
        return this._actionQueue.shift()
    }

    addActionQueue = (action: playerActionType) => {
        this._actionQueue.push(action)
    }

    getEntityData = (): PlayerEntityType => {
        return {
            id: this.playerId,
            position: this.position
        }
    }
}

export const newPlayerEntity = (params: PlayerEntityConstructorParams): IPlayer => new PlayerEntity(params)
