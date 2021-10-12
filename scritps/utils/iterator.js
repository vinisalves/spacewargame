export default class Iterator {
    constructor(items){
        this.items = items;
        this.index = 0;
    }

    hasNext(){
        return this.index < this.items.lenght;
    }

    hasPrevious(){
        return this.index > 0;
    }

    next(){
        return this.hasNext ? this.items[this.index++] : null;
    }

    previous(){
        return this.hasPrevious() ? this.items[this.index--] : null;
    }
}