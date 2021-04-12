import {moveDirectionType} from "./EntityTypes";

export type CharacterType = 'girl' | 'boy' | 'redKnight' | 'orangeKnight' | 'blueDragon' | 'greenDragon'

export type PlayerType = {
    id: number
    name: string
    character: CharacterType
}

export type PlayerEntityType = {
    position: {
        x: number
        y: number
    },
    id: number
    animation: AnimationType
    animationDirection: AnimationDirectionType
}

export type playerActionType<payload = any> = {
    type: 'move'
    payload: payload
}

export type movePayload = moveDirectionType

export type AnimationType = 'idle' | 'walking' | 'attacked'
export type AnimationDirectionType = 'left' | 'right'
