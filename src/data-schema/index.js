import { Schema } from "@orbit/data";
import CustomerSchema from "./customer";
import UserSchema from "./user";

export default new Schema({
  models: {
    customer: CustomerSchema,
    user: UserSchema
  }
});
