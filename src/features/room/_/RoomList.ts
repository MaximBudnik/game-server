import {RoomType} from "../../../../types";
import {IRoom, newRoom} from "./Room";

class _RoomList {
    private rooms: Array<IRoom> = []
    getRoom = (id: number) => {
        return this.rooms.find(e => e.room.id === id)
    }

    generateValidRoomId = (): number => this.rooms.length

    getRooms = (): Array<RoomType> => {
        return this.rooms.map(e => e.room)
    }

    addRoom = (room: RoomType): RoomType => {
        const newLength = this.rooms.push(newRoom(room))
        return this.rooms[newLength - 1].room
    }
    deleteRoom = (room: RoomType): RoomType => {
        const roomIndex = this.rooms.map(e => e.room.id).indexOf(room.id);
        const Room = this.rooms[roomIndex]
        const returnData = Room.room
        Room.game.pause()
        this.rooms[roomIndex] = null
        this.rooms.splice(roomIndex, 1)
        return returnData
    }
}

export const RoomList = new _RoomList()

