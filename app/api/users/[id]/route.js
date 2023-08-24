import { connectToDB } from "@utils/database";
import { ObjectId } from "mongodb";
import User from "@models/Users";

export const GET = async (req, {params}) => {
  try {
    await connectToDB();

    const user = await User.find({
        _id: new ObjectId(params.id)
    })
 
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  } catch (err) {
    return new Response(`${err}`, {
      status: 500,
    });
  }
};