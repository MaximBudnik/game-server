export type PlayerType = {
    id: number
    name: string
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

export type PlayerInput = PlayerType

export type RoomSubscriptionInput = {
    id: number
}
