import { IHero } from "./Ihero";

export class Hero implements IHero{
    constructor(
        public id: number,
        public name: string,
        public power: string,
        public alterEgo?: string
    ){}
    
}