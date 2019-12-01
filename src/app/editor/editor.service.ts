import {Injectable} from '@angular/core';


@Injectable()
export class ModelService {
    html;
    constructor() {}

    setHtml(html) {
        this.html = html;
    }

    getHtml() {
       return this.html;
    }
}