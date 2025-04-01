import { Schema, model } from "mongoose";

const UserSchema = new Schema({
  role: { type: String, default: "" },
  email: { type: String, default: "" },
  password: { type: String, default: "" },
  city: { type: String, default: "" },
  name: { type: String, default: "" },
  surname: { type: String, default: "" },
  phoneNumber: { type: String, default: "" },
  university: { type: String, default: "" },
  pasportData: { type: String, default: "" },
  pasportImage: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  birthDay : { type: Date,  },
  // prava
  driversLicense:{ type: String, default: "" },
  driversLicenseImage: {
    type: Schema.Types.ObjectId,
    ref: "File",
  },
  profilePhoto:{
    type: Schema.Types.ObjectId,
    ref: "File",
    // default:"67ebc64235094d0fabf824c1"
  },
  gender: { type: String, default: "" },
  
  //տեխպասպրոտ
  // techPassport: { type: String, default: "" },
});

const UserModel = model("Users", UserSchema);

export default UserModel;
