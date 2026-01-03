// const mongoose = require("mongoose")

// const connectDB = async()=>{
//    await mongoose.connect(
//     "mongodb+srv://laxmipriyar2005_db_user:D34v3WWemGglmhiT@namastenode.sgvvg4t.mongodb.net/devTinder "
//   );
// }

// module.exports = {connectDB};


const mongoose = require("mongoose");

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect("mongodb+srv://laxmipriyar2005_db_user:D34v3WWemGglmhiT@namastenode.sgvvg4t.mongodb.net/devTinder", {
      serverSelectionTimeoutMS: 5000
    });

    isConnected = true;
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = { connectDB };
