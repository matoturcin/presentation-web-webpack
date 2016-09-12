import { Car } from './car';

export class Owner {
    constructor (
        public id: number,
        public name: string,
        public cars: Car[] = new Array<Car>()
    ){}
}
