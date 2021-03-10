import {Room} from "./room";
import {RoomType} from "./types";
import {memo} from "../../common/memo";

class _RoomList {
    private rooms: Array<Room> = []
    getRoom = memo((id: number) => {
        return this.rooms.find(e => e.room.id === id)
    })

    getRooms = (): Array<RoomType> => {
        return this.rooms.map(e => e.room)
    }

    addRoom = (room: RoomType): RoomType => {
        const newLength = this.rooms.push(new Room(room))
        return this.rooms[newLength - 1].room
    }
    deleteRoom = (room: RoomType): RoomType => {
        const roomIndex = this.rooms.map(e => e.room.id).indexOf(room.id);
        const returnData = this.rooms[roomIndex].room
        this.rooms.splice(roomIndex, 1)
        return returnData
    }
}

export const RoomList = new _RoomList()

