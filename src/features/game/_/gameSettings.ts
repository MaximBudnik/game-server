import {position} from "../../../../types";

export const gameSettings = {
    loopTimeout: 0,
    player: {
        defaultPos(i: number): position {
            return {
                x: i * 96,
                y: 96
            }
        }
    }
}
