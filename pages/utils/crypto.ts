import crypto from "crypto";
// 密匙
const SECRET_KEY = process.env.SECRET_KEY;

// md5 加密
function md5(content: string) {
  let md5 = crypto.createHash("md5");
  return md5.update(content).digest("hex");
}

// 加密函数
const genPassword = (password: string) => {
  const str = `password=${password}&key=${SECRET_KEY}`;
  return md5(str);
};


export default genPassword