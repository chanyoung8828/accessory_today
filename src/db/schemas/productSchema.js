import {Schema} from "mongoose";
const productSchema = new Schema({
    productName: {type: String, required: true, unique: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    description: {type: String, requird: true},
    // 신상품 여부
    isNew: {type: boolean, required: true, default: false},
    // 베스트 상품 여부
    isBest: {type: boolean, required: true, default: false},
    // 제조사
    maker: {type: String, required: true},
    // 이미지 url
    productImg: {type: String, required: true},
})

export default productSchema;