"use strict";

const mongoose = require("mongoose");

const Product = mongoose.model("Product");
exports.get = (req, res, next) => {
  Product.find({ active: true }, "title price slug")
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
exports.getBySlug = (req, res, next) => {
  Product.findOne(
    { active: true, slug: req.params.slug },
    "title description price slug tags"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
exports.getById = (req, res, next) => {
  Product.findById(req.params.id)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
exports.post = (req, res, next) => {
  var product = new Product(req.body);
  product
    .save()
    .then((x) => {
      res.status(201).send({ message: "Produto cadastrado com sucesso!" });
    })
    .catch((e) => {
      res.status(400).send({ message: "Falha ao cadastrar o produto" });
    });
};
exports.put = (req, res, next) => {
  Product.findByIdAndUpdate(req.params.id, {
    $set: {
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
    },
  })
    .then((x) => {
      res.status(200).send({
        message: "Produto atualizado com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao atualizar o produto",
        data: e,
      });
    });
};
exports.delete = (req, res, next) => {
  Product.findOneAndRemove(req.params.id)
    .then((x) => {
      res.status(200).send({
        message: "Produto removido com sucesso!",
      });
    })
    .catch((e) => {
      res.status(400).send({
        message: "Falha ao remover o produto",
        data: e,
      });
    });
};
exports.getByTag = (req, res, next) => {
  Product.find(
    {
      tags: req.params.tag,
      active: true,
    },
    "title description price slug tags"
  )
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((e) => {
      res.status(400).send(e);
    });
};
