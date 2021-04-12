import {GameEntity, IGameEntity, moveMixin} from "../../entity";
import {
    AnimationDirectionType,
    AnimationType,
    movePayload,
    playerActionType,
    PlayerEntityType,
    position
} from "../../../../types";


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

    private _animation: AnimationType = "idle"
    private _animationDirection: AnimationDirectionType = "right"
    private _animationResetCount = 0

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
                    this._animation = "walking"

                    if (action.payload.x !== 0) {
                        this._animationDirection = action.payload.x > 0 ? "right" : "left"
                    }

                    this.move({...action.payload})
                    break;
            }
        } else {
            if (this._animation !== "idle") this._animationResetCount++
            if (this._animationResetCount === 25) {
                this._animation = "idle"
                this._animationResetCount = 0
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
            position: this.position,
            animation: this._animation,
            animationDirection: this._animationDirection
        }
    }
}

export const newPlayerEntity = (params: PlayerEntityConstructorParams): IPlayer => new PlayerEntity(params)
