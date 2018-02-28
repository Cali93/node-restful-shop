const mongoose = require("mongoose");

const User = require("../models/user");

const Project = require ("../models/project");
// const Product = require  ("../models/product");

exports.get_all_projects = (req, res, next) => {
  Project.find()
    .select("_id user meshes")
    .populate('user', '_id')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        projects: docs.map(doc => {
          return {
            _id: doc._id,
            user: doc.user,
            meshes: doc.meshes,
            request: {
              type: "GET",
              url: "http://localhost:3000/projects/" + doc._id
            }
          };
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
}

exports.create_project = (req, res, next) => {
  User.findById(req.user._id)
    .then(user => {
      if (!user) {
        return res.status(404).json({
          message: "Project not found"
        });
      }
      const project = new Project({
        _id: mongoose.Types.ObjectId(),
        user: req.user._id,
        meshes: req.body.meshes,
      });
      return project.save();
    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Project stored",
        createdProject: {
          _id: result._id,
          user: result.user,
          meshes: result.meshes
        },
        request: {
          type: "GET",
          url: "http://localhost:3000/projects/" + result._id
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

// exports.get_order = (req, res, next) => {
//   Order.findById(req.params.orderId)
//     .populate('product')
//     .exec()
//     .then(order => {
//       if (!order) {
//         return res.status(404).json({
//           message: "Order not found"
//         });
//       }
//       res.status(200).json({
//         order: order,
//         request: {
//           type: "GET",
//           url: "http://localhost:3000/orders/"
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// }

// exports.delete_order = (req, res, next) => {
//   Order.remove({ _id: req.params.orderId })
//     .exec()
//     .then(result => {
//       res.status(200).json({
//         message: "Order deleted",
//         request: {
//           type: "POST",
//           url: "http://localhost:3000/orders/",
//           body: { productId: "ID", quantity: "Number" }
//         }
//       });
//     })
//     .catch(err => {
//       res.status(500).json({
//         error: err
//       });
//     });
// }
