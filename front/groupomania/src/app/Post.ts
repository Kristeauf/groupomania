import { Timestamp } from "rxjs";

export interface Post{
    idMESSAGES:number;
    idUSERS:number;
    message:string;
    username:string;
    created_at:Timestamp<any>;
    imageUrl:string;
    file:File;
}

