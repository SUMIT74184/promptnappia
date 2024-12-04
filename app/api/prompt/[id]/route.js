import { connectToDB } from "@utils/database"
import Prompt from "@models/prompt";

// get request
export const GET=async(req,{params})=>{
  try{
    await connectToDB();

    const prompt=await Prompt.findById({creator:params.id}).populate
    ('creator');
    if(!prompt) return new Response("Prompt not found",{status:404});

    return new Response(JSON.stringify(prompt),{
      status:200
    })

  }catch(error){
    return new Response(JSON.stringify(" failed to fetch all prompts"),{
      status:500
    })

  }
}

// update(patch)
export const PATCH =async(request,{params})=>{
  const {prompt,tag}=await request.json();

  try{
    await connectToDB();
    const existingPrompt=await Prompt.findById(params.id);

    if(!existingPrompt) return new Response("Prompt not found",{status:404})
      existingPrompt.prompt=prompt;
      existingPrompt.tag=tag;

      await existingPrompt.save();

      return new Response(JSON.stringify
        (existingPrompt),{status:200}
      )
  }catch(error){
    return new Response("failed to update the prompt",{status:500});
  }
}

export const DELETE=async(request,{params})=>{
  try{
    await connectToDB();
    await Prompt.findByIdAndDelete(params.id);

    return new Response("Prompt deleted successfully",{status:200})

  }catch(error){
    return new Response("Prompt cannot be deleted",{status:500});
  }
}