import {PlayerType, RoomType} from "../../../../types";

export class Room {
    room: RoomType = {
        id: 0,
        name: 'Default room',
        players: []
    }

    constructor(room: RoomType) {
        this.room = room
    }

    addPlayer = (player: PlayerType): void => {
        this.room.players.push(player)
    }
    updatePlayer = (player: PlayerType): void => {
        const playerIndex = this.room.players.findIndex((e => e.id == player.id));
        this.room.players[playerIndex] = player
    }
    deletePlayer = (id: number): void => {
        const playerIndex = this.room.players.map(e => e.id).indexOf(id);
        this.room.players.splice(playerIndex, 1)
    }
}

