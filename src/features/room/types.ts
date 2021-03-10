export type PlayerType = {
    id: number
    name: string
}

export type RoomType = {
    id: number
    name: string
    players: Array<PlayerType>
}
