const express = require('express'); 
const router = express.Router();
const upload = require("../config/multer-config")
const productModel = require("../models/product-model")

router.post('/create', upload.single("image"), async function(req, res) {
     try {let {name, price, discount, bgcolor, textcolor, panelcolor} = req.body;

      let product = await productModel.create({
        image: req.file.buffer,
        name,
        price,
        textcolor,
        bgcolor,
        panelcolor,
        discount,
      })
    req.flash("success", "Product created successfully.")
    res.redirect("/owner/admin");}
    catch(err){
        res.send(err.message);
    }
    console.log("req.file:", req.file);

});

module.exports = router;