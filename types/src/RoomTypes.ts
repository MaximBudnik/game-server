export type CharacterType = 'redKnight'


export type PlayerType = {
    id: number
    name: string
    character: CharacterType
}

export type RoomType = {
    id: number
    name: string
    players: Array<PlayerType>
}


/*  Frontend only   */

export type RoomFormType = {
    name: string
}

export type RoomInput = {
    name: string
}

export type PlayerInput = {
    id: number
    name: string
}

export type RoomSubscriptionInput = {
    id: number
}
