import User from "../../models/User";
import connectDB from "../../middleware/mongoose";
const CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    console.log(user);
    // debugger;
    /*-------------------------------- */

    const bytes = CryptoJS.AES.decrypt(user.password, "secret123");
    // console.log(bytes.toString(CryptoJS.publicEncrypt.Utf8));
    const decryptedPass = bytes.toString(CryptoJS.enc.Utf8);

    /*-------------------------------- */

    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPass) {
        var token = jwt.sign(
          {email: user.email, name: user.name },
          'jwtsecret',{expiresIn:"2d"});
        res.status(200).json({success: true,token});
      } else {
        res.status(200).json({ success: false, error: "Invalid credientials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(200).json({ error: "This method is not allowed" });
  }
};

export default connectDB(handler);

// video 56 for this above code
