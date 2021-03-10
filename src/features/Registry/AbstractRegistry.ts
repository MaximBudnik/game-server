type T<T> = Array<T> | T;

export class AbstractRegistry<RegisterType, CombineType extends T<RegisterType> = Array<RegisterType>> {
    protected elements: Array<RegisterType> = []

    constructor(root: RegisterType = null) {
        root && this.elements.push(root)
    }

    register = (definition: RegisterType) => {
        this.elements.push(definition)
    };

    combine = (): CombineType => this.elements as CombineType
}
