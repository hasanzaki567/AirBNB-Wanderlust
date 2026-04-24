const Listing = require("../models/listing.js");


module.exports.index = async (req, res) => {
  const allListing = await Listing.find({});
  res.render("listings/index.ejs", { allListing });
}

module.exports.renderNewlisting = (req, res) => {
  res.render("listings/new.ejs")
}
module.exports.showlisting = async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author"
      },
    })
    .populate("owner");

  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
};



module.exports.createlisting = async (req, res, next) => {
  if (!req.body.listing) throw new ExpressError(400, "Invalid Listing Data");

  const newListing = new Listing(req.body.listing);

  let url = req.file.path;
  let filename = req.file.filename;

  newListing.owner = req.user._id; 

  newListing.image = { url, filename };

   const location = req.body.listing.location;

    const geoUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(location)}&limit=1`;

    const response = await fetch(geoUrl, {
      headers: {
        "User-Agent": "hasan-wanderlust-app"
      }
    });

    const data = await response.json();

    if (!data || data.length === 0) {
      req.flash("error", "Invalid location");
      return res.redirect("/listings/new");
    }

    const lat = data[0].lat;
    const lng = data[0].lon;

    console.log("Geocoding response:", data);

    newListing.geometry = {
      type: "Point",
      coordinates: [parseFloat(lng), parseFloat(lat)]
    };

  await newListing.save();

  req.flash("success", "Successfully made a new listing!");
  res.redirect("/listings");
};

module.exports.renderEditlisting = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Cannot find that listing!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250/");

  res.render("listings/edit.ejs", { listing , originalImageUrl});
}


module.exports.updatelisting = async (req, res) => {
  if (!req.body.listing) throw new ExpressError(400, "Invalid Listing Data")
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing })
  if (typeof req.file !== "undefined") {
  let url = req.file.path;
  let filename = req.file.filename;

  listing.image = { url, filename};
  await listing.save();
  }
  req.flash("success", " successfully updated the listing!");
  res.redirect(`/listings/${id}`)

}


module.exports.listingdestroy = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing)
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
}

