const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js")
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("../schema.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer  = require('multer')
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingController = require("../controllers/listings.js");

router.route("/")

    //index route
    .get(wrapAsync(listingController.index))

   // create route
    .post(
        isLoggedIn, 
        upload.single("listing[image]"),
        validateListing, 
        wrapAsync(listingController.createlisting)
    );
     
    


//new route
router.get("/new", isLoggedIn, listingController.renderNewlisting);

router.route("/:id")
    //show route
    .get(listingController.showlisting)
    //update route
    .put(isLoggedIn, 
        isOwner, 
        upload.single("listing[image]"),
        validateListing,
        wrapAsync(listingController.updatelisting))
    //delete route
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.listingdestroy));



//edit route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditlisting));


module.exports = router;