const mongoose=require ("mongoose");
const Review = require("./review");
const Schema=mongoose.Schema;

const listingSchema=new Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    image: {
        url: String,
        filename:String
    },
    price: Number,
    location: String,
    country: String,
    reviews:[
        {
            type:Schema.Types.ObjectId,
            ref:"Review"
        },
  ],
  owner:{
    type:Schema.Types.ObjectId,
    ref:"User",
  }
  
});
listingSchema.pre("findOneAndDelete",async function(){
    const listing = await this.model.findOne(this.getFilter());
    if(listing){
        await Review.deleteMany({_id:{$in: listing.reviews}});
    }
    
 });

const Listing=mongoose.model("listing",listingSchema);
 module.exports=Listing;
 