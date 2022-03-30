import asyncHandler from "express-async-handler";
import Picture from "../models/pictureModel.js";
import generateToken from "../utils/generateToken.js";

//@description     Register new user
//@route           POST /api/users/
// const updatePicture = asyncHandler(async (req, res) => {
//     const { name, email, password, pic } = req.body;
  
//     const userExists = await User.findOne({ email });
  
//     if (userExists) {
//       res.status(404);
//       throw new Error("User already exists");
//     }
  
//     const user = await User.create({
//       name,
//       email,
//       password,
//       pic,
//     });
  
//     if (user) {
//       res.status(201).json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         isAdmin: user.isAdmin,
//         pic: user.pic,
//         acessToken: generateToken(user._id),
//       });
//     } else {
//       res.status(400);
//       throw new Error("User not found");
//     }
//   });


const postCourse = (req, res, next) => {
  Picture.findById(req.body.productId)
    .then(product => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }
      const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
      });
      return order.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Order stored",
        createdOrder: {
          _id: result._id,
          product: result.product,
          quantity: result.quantity
        },
        request: {
          type: "GET",
          url: "http://localhost:5000/orders/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

export {
  postCourse
}