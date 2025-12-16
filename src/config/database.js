const mongoose = require("mongoose")

const connectDB = async()=>{
   await mongoose.connect(
    "mongodb+srv://laxmipriyar2005_db_user:D34v3WWemGglmhiT@namastenode.sgvvg4t.mongodb.net/devTinder "
  );
}

module.exports = {connectDB};


