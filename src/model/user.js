import mongoose ,{Schema} from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required:true,
        unique:true /* đảm bảo giá trị là duy nhất, cố gắng lưu một tài liệu mới với một email đã tồn tại trong collection, MongoDB sẽ trả về lỗi và không cho phép lưu tài liệu */ 
    },
    password: {
        type: String,
        required:true
    },
    name: {
        type: String,
        required:true,
        minlength:3,
        maxlength:30 
    },
    role: {
        type: String,
        enum:["user","admin"],
        default:"user"
    },
    avatar: {
        type: String,
        default:"../uploads/default_avata.png"
    }

},{timestamps:true,versionKey:false
});

export default mongoose.model("User",userSchema);