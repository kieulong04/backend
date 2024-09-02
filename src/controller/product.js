import Joi from "joi";
import Product from "../model/product";


    const productSchema = Joi.object({
        name:Joi.string().lowercase().required().messages({
            "string.base":"name phải là chuỗi",
            "string.empty":"name không được để trống",
            "any.required":"name là trường bắt buộc"
        }),
        slug:Joi.string().required().messages({
            "string.base":"slug phải là chuỗi",
            "string.empty":"slug không được để trống",
            "any.required":"name là trường bắt buộc"
        }),
        category:Joi.string()
        .pattern(/^[0-9a-fA-F]{24}$/).required().messages({
            "string.base":"category phải là chuỗi",
            "string.empty":"category không được để trống",
            "string.pattern.base":"category phải là objectId hợp lệ",
            "any.required":"category là trường bắt buộc"

        }),
        /** Phương thức .pattern() cho phép bạn chỉ định một biểu thức chính quy 
         * (regular expression) để kiểm tra xem chuỗi có khớp với mẫu đó hay không.
         *  Trong trường hợp này, mẫu là /^[0-9a-fA-F]{24}$/*/
        price:Joi.number().greater(0).required().messages({
            "number.base":"price phải là số",
            "number.greater":"price phải lớn hơn 0",
            "any.required":"price là trường bắt buộc"
        }),
        image:Joi.string().uri().optional().messages({
            "string.base":"image phải là chuỗi",
            "string.uri":"image phải là uri hợp lệ",
        }),
        gallery:Joi.array().items(Joi.string().uri()).optional().messages({
            "string.base":"allery phải là mảng",
            "string.items":"allery chỉ chứa các URI hợp lệ"
        }),
        description:Joi.string().optional().messages({
            "string.base":"description phải là chuỗi",
        }),
        discount:Joi.number().min(0).max(100).default(0).messages({
            "number.base":"discount phải là số",
            "number.min":"discount phải ít nhất là 0",
            "number.max":"discount không vượt quá 100",
        }),
        countInstock:Joi.number().integer().min(0).default(0).messages({
            "number.base":"countInstock phải là số",
            "number.integer":"countInstock phải là số nguyên",
            "number.min":"countInstock phải ít nhất là 0",
        }),
        featured:Joi.boolean().default(false).optional().messages({
            "boolean.base":"featured phải là giá trị đúng sai"
        }),
        tags:Joi.array().items(Joi.string()).optional().messages({
            "array.base":"tags phải là mảng",
            "array.items":"tags chỉ chứa các chuỗi"
        }),
    })

export const create = async (req, res)=>{
    try {
        const product = await Product.create(req.body);

        return res.status(201).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getAll = async (req, res)=>{
    try {
        const product = await Product.find();
        if(product.length === 0){
            return res.status(400).json({message:"product not found"})
        }
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const getProductById = async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

export const deleteProduct = async (req, res)=>{
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json(product)
        /**Sử dụng findByIdAndDelete khi bạn biết chính xác ID của tài liệu cần xóa.Sử dụng 
        findOneAndDelete khi bạn muốn xóa tài liệu dựa trên một điều kiện khác không phải id */
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}


export const updateProduct = async (req, res)=>{
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body,{new:true});
        return res.status(200).json(product)
    } catch (error) {
        return res.status(500).json({message:error.message})
    }
}

/**
 1. Hàm GET: Lọc sản phẩm theo danh mục

export const getByCategory = async (req, res) => {
    try {
        const { category } = req.params;
        const products = await Product.find({ category }); // Lọc sản phẩm theo danh mục
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Mục đích: Lọc và lấy danh sách sản phẩm theo danh mục cụ thể.
Phương thức HTTP: GET.
Endpoint: /products/category/:category.
2. Hàm GET: Tìm kiếm sản phẩm theo từ khóa

export const search = async (req, res) => {
    try {
        const { q } = req.query;
        const products = await Product.find({
            name: { $regex: q, $options: "i" } // Tìm kiếm sản phẩm theo tên, không phân biệt hoa thường
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Mục đích: Tìm kiếm sản phẩm theo từ khóa trong tên sản phẩm.
Phương thức HTTP: GET.
Endpoint: /products/search?q=<keyword>.
3. Hàm GET: Phân trang sản phẩm

export const getPaginated = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1; // Số trang hiện tại
        const limit = parseInt(req.query.limit) || 10; // Số sản phẩm trên mỗi trang
        const skip = (page - 1) * limit;

        const products = await Product.find().skip(skip).limit(limit);
        const total = await Product.countDocuments(); // Tổng số sản phẩm

        return res.status(200).json({
            products,
            total,
            page,
            pages: Math.ceil(total / limit) // Tổng số trang
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Mục đích: Lấy danh sách sản phẩm với phân trang.
Phương thức HTTP: GET.
Endpoint: /products/paginated?page=<page>&limit=<limit>.
4. Hàm GET: Lấy các sản phẩm nổi bật (featured)

export const getFeatured = async (req, res) => {
    try {
        const products = await Product.find({ featured: true }); // Lọc các sản phẩm được đánh dấu nổi bật
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Mục đích: Lấy danh sách các sản phẩm nổi bật.
Phương thức HTTP: GET.
Endpoint: /products/featured.
5. Hàm GET: Lọc sản phẩm theo khoảng giá

export const getByPriceRange = async (req, res) => {
    try {
        const { min, max } = req.query;
        const products = await Product.find({
            price: { $gte: min, $lte: max } // Lọc sản phẩm theo khoảng giá
        });
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
Mục đích: Lọc và lấy danh sách sản phẩm theo khoảng giá.
Phương thức HTTP: GET.
Endpoint: /products/price-range?min=<min>&max=<max>.
Tóm tắt
GET /products/category/:category: Lọc sản phẩm theo danh mục.
GET /products/search?q=<keyword>: Tìm kiếm sản phẩm theo từ khóa.
GET /products/paginated?page=<page>&limit=<limit>: Lấy sản phẩm với phân trang.
GET /products/featured: Lấy các sản phẩm nổi bật.
GET /products/price-range?min=<min>&max=<max>: Lọc sản phẩm theo khoảng giá. 
 
 */

/** 
 create(): Tạo một hoặc nhiều tài liệu mới và lưu chúng vào cơ sở dữ liệu.
 const newProduct = await Product.create({ name: 'New Product', price: 100 });

insertMany(): Tạo nhiều tài liệu mới và lưu chúng vào cơ sở dữ liệu cùng một lúc.
const products = await Product.insertMany([{ name: 'Product 1', price: 100 }, { name: 'Product 2', price: 200 }]);
2. Sửa dữ liệu
findByIdAndUpdate(): Tìm tài liệu theo ID và cập nhật nó.
const updatedProduct = await Product.findByIdAndUpdate(id, { price: 150 }, { new: true });

updateOne(): Cập nhật một tài liệu dựa trên điều kiện tìm kiếm.
const result = await Product.updateOne({ _id: id }, { $set: { price: 150 } });

updateMany(): Cập nhật nhiều tài liệu dựa trên điều kiện tìm kiếm.
const result = await Product.updateMany({ category: 'Electronics' }, { $set: { price: 150 } });

findOneAndUpdate(): Tìm tài liệu đầu tiên phù hợp với điều kiện và cập nhật nó.
const updatedProduct = await Product.findOneAndUpdate({ name: 'Old Product' }, { price: 200 }, { new: true });

3. Xóa dữ liệu
findByIdAndDelete(): Tìm tài liệu theo ID và xóa nó.
const deletedProduct = await Product.findByIdAndDelete(id);

findOneAndDelete(): Tìm tài liệu đầu tiên phù hợp với điều kiện và xóa nó.
const deletedProduct = await Product.findOneAndDelete({ name: 'Product to delete' });

deleteOne(): Xóa một tài liệu dựa trên điều kiện tìm kiếm.
const result = await Product.deleteOne({ _id: id });

deleteMany(): Xóa nhiều tài liệu dựa trên điều kiện tìm kiếm.
const result = await Product.deleteMany({ category: 'Obsolete' });
4. Hiển thị dữ liệu
find(): Tìm tất cả các tài liệu phù hợp với điều kiện.
const products = await Product.find({ category: 'Electronics' });

findById(): Tìm tài liệu theo ID.
const product = await Product.findById(id);

findOne(): Tìm tài liệu đầu tiên phù hợp với điều kiện.
const product = await Product.findOne({ name: 'Specific Product' });

countDocuments(): Đếm số lượng tài liệu phù hợp với điều kiện.
const count = await Product.countDocuments({ category: 'Electronics' });

5. Khác
distinct(): Trả về danh sách các giá trị duy nhất cho một trường cụ thể.
const categories = await Product.distinct('category');

aggregate(): Sử dụng các pipeline để thực hiện các thao tác phức tạp như nhóm, sắp xếp, lọc, và chuyển đổi dữ liệu.
const result = await Product.aggregate([
    { $match: { price: { $gt: 100 } } },
    { $group: { _id: "$category", totalSales: { $sum: "$price" } } }
]);

populate(): Tự động thay thế các tham chiếu vào các tài liệu khác bằng các tài liệu đầy đủ.
const product = await Product.findById(id).populate('category');
 */