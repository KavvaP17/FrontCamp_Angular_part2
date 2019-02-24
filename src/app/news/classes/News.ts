export default class News {
    constructor(
        public title: string,
        public author: string,
        public author_id: string,
        public description: string,
        public url: string,
        public urlToImage: string,
        public publishedAt: string,
        public content: string,
        public id: string = ''
    ){}
}