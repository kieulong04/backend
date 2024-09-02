
import Product from '. /model/product'; // Điều chỉnh đường dẫn này theo cấu trúc dự án của bạn

// Hàm tạo và lưu 10 sản phẩm vào cơ sở dữ liệu
const createAndSaveProducts = async () => {

  for (let i = 1; i <= 10; i++) {


    const product = new Product({
      name: name,
      slug: slug,
      category: new mongoose.Types.ObjectId(), // Thay thế bằng ObjectId thực tế của danh mục
      price: Math.random() * 100 + 1, // Giá ngẫu nhiên từ 1 đến 100
      image: `https://example.com/image${i}.jpg`,
      gallery: [`https://example.com/gallery${i}-1.jpg`, `https://example.com/gallery${i}-2.jpg`],
      description: `This is the description for Product ${i}.`,
      discount: i % 2 === 0 ? 10 : 0, // Giảm giá 10% cho các sản phẩm chẵn
      countInStock: Math.floor(Math.random() * 100), // Số lượng ngẫu nhiên từ 0 đến 100
      featured: i % 3 === 0, // Sản phẩm nổi bật cho mỗi 3 sản phẩm
      tags: ['tag1', 'tag2', `tag${i}`]
    });

    products.push(product);
  }

  try {
    const savedProducts = await Product.insertMany(products);
    console.log('Products saved successfully:', savedProducts);
  } catch (error) {
    console.error('Error saving products:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Gọi hàm tạo và lưu sản phẩm
createAndSaveProducts();
