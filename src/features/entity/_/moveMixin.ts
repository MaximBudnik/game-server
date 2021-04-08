import {GameEntity} from "./GameEntity";
import {moveDirectionType} from "../../../../types";

export interface IMovableEntity {
    move: (moveDirection: moveDirectionType) => void
}

type Constructor<T> = new (...args: any[]) => T;
export const moveMixin = <T extends Constructor<GameEntity>>(SuperClass: T) => class extends SuperClass implements IMovableEntity {
    speed = 1
    move = (moveDirection: moveDirectionType) => {
        this.position.x += moveDirection.x * this.speed
        this.position.y += moveDirection.y * this.speed
    }
};
