const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    url: String,
    filename: String 
  },

  price: Number,
  location: String,
  country: String,
  // category: {
  //   type: String,
  //   enum: ["treding", "rooms", "iconic-city", "mountains", "castles", "amazing-pool", "beaches", "camping", "luxury", "nature"],
  //   required: true
  // },

  reviews: [{
    type: Schema.Types.ObjectId,
    ref: "Review"
  }],

  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  geometry: {
  type: {
    type: String,
    enum: ["Point"],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
}

});

//Delte middlewear to delete all reviews related for a listing when the listing is deleted
// Post middleware for listingSchema
//This middlewear will be executed when we will delete a listing

listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } })
  }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
