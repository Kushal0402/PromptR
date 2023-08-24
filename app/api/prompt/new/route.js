import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { ObjectId } from "mongodb";

export const POST = async (req, res) => {
  const { userId, prompt, tag } = await req.json();
  console.log(userId);
  try {
    await connectToDB();

    const newPrompt = await Prompt.create({
      creator: new ObjectId(userId),
      prompt,
      tag,
    });

    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (err) {
    return new Response(`${err}`, {
      status: 500,
    });
  }
};
