import { Car } from './car';

export class Owner {
    constructor (
        public id: number,
        public forename: string,
        public familyname: string
//        public cars: Car[]
    ){}
}
