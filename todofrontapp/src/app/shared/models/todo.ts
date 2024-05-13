export interface Todo{
    id: number,
    name:string,
    isDone:boolean,
    priority:Priority
}

export interface Priority{
    id:number,
    name:string
}