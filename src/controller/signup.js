import Joi from "joi";
import User from "../model/user";
import bcryptjs from "bcryptjs";

const signupSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": "Trường Name là bắt buộc",
    "string.empty": "trường Name không được bỏ trống",
    "string.min": "trường Name phải có ít nhất {#limit} kí tự",
    "string.max": "trường Name không được quá {#limit} kí tự",
  }),
  email: Joi.string().email().required().messages({
    "any.required": "trường email là trường bắt buộc",
    "string.empty": "trường email không được bỏ trống",
    "string.email": "trường email không hợp lệ ",
  }),
  password: Joi.string().min(6).max(30).required().messages({
    "any.required": "Trường password là bắt buộc",
    "string.empty": "trường password không được bỏ trống",
    "string.min": "trường password phải có ít nhất {#limit} kí tự",
    "string.max": "trường password không được quá {#limit} kí tự",
  }),
  confirmPassword: Joi.string().required().valid(Joi.ref("password")).messages({
    "any.required": "Trường confirmPassword là bắt buộc",
    "any.only": "trường confirmPassword phải giống với trường password",
  }),
  avatar: Joi.string().uri().messages({
    "string.uri": "trường Avatar phải là đường dẫn hợp lệ",
  }),
});

export const signup = async (req, res) => {
  const { email, password, name, avatar } = req.body;
  const { error } = signupSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const message = error.details.map(
      (item) => item.message
    ); /* details là thuộc tính quan trọng trong đối tượng lỗi của Joi */
    return res.status(500).json({
      message,
    });
  }
  console.log(req.body);

  const exisUser = await User.findOne({ email });
  if (exisUser) {
    return res.status(400).json({
      message: ["email đã tồn tại"],
    });
  }

  const hashPassword = await bcryptjs.hash(password, 12);
  console.log(hashPassword);
  const role = (await User.countDocuments({})) === 0 ? "admin" : "user";
  //lưu user vào database
  const user = await User.create({
    ...req.body,
    password: hashPassword,
    role,
  });
  // trả về thông tin user đã đăng kí ( không gửi về mật khẩu )
  user.password = undefined;
  return res.status(201).json({
    user,
  });
};
export const signin = async (req, res) => {};
export const logout = async (req, res) => {};
