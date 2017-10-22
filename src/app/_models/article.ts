export class Article {
    title: string;
    content: string;
    image: string;
    category: string;
    postedBy: string;
    comments: Array<{ postedBy: string, content: string }>
}