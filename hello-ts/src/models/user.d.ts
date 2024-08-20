export interface User {
    id: string; // GUID from UUI generator in the BD
    name: string;
    surname: string;
    age: number;
    email: string;
}

type NewUser = Omit<User, 'id'>; // so User without the ID

interface Article {
    author: User;
    body:string;
    created: Date;
    comments: string[];
}

export type UserWithArticle = User & {articles: Article[]};