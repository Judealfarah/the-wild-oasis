import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.log(error);
    console.log("could not load");
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.log(error);
    console.log("could not delete");
  }

  return data;
}

export async function createOrUpdateCabin(cabin, id) {
  const cabinData = { ...(cabin?.cabin || cabin || {}) };

  const hasImagePath = typeof cabinData.image === "string";

  const imageName = !hasImagePath
    ? `${Math.random()}-${cabinData.image.name}`.replaceAll("/", "")
    : "";

  const imagePath = hasImagePath
    ? cabinData.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // create
  if (!id) query = query.insert({ ...cabinData, image: imagePath });

  // edit
  if (id) query = query.update({ ...cabinData, image: imagePath }).eq("id", id);

  const { data, error } = await query.select();

  if (error) {
    console.log(error);
    console.log("could not be created");
  }

  if (!hasImagePath) {
    const { uploadError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, cabinData.image);

    // delete object if error uploading image

    if (uploadError) {
      await supabase.from("cabins").delete().eq("id", data.id);
      console.log(uploadError);
    }
  }

  return data;
}
