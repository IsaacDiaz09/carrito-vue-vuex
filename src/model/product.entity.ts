export class Product {

    id: number;
    price: number;
    title: string;
    image: string;
    quantity: number;

    constructor(id: number, price: number, title: string, image: string) {
        this.id = id;
        this.price = price;
        this.title = title;
        this.image = image;
        this.quantity = 0;
    }
}