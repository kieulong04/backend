import mongoose from "mongoose"

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
        /* Giá trị của name sẽ tự động được chuyển thành chữ thường trước khi lưu vào cơ sở dữ liệu. */
    },
    slug:{
        type:String,
        unique:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"category",
        // required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    gallery:{
        type:Array
        //Trường này có thể chứa một tập hợp các hình ảnh hoặc URL cho các hình ảnh khác liên quan đến sản phẩm
    },
    description:{
        type:String,
    },
    discount:{
        type:Number,
        default:0
    },
    countInstock:{
        type:Number,
        default:0
    },
    featured:{
        type:Boolean,
        default:false
    },
    tags:{
        type:Array
        /*Trường này có thể chứa các từ khóa hoặc thẻ liên quan đến sản phẩm, giúp dễ dàng tìm kiếm và phân loại*/
    }
},{timestamps:true,versionKey:false})

export default mongoose.model("Product",ProductSchema);