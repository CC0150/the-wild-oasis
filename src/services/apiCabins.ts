import supabase from "./supabase";
import { Cabin } from "@/components/cabins/types";
import { supabaseUrl } from "./supabase";

// 获取所有cabins
export const getCabins = async () => {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error("Error fetching cabins:", error.message);
    throw new Error("Cabins could not get loaded");
  }

  return data;
};

// create or edit cabin
export const createAndEditCabin = async (cabin: Cabin, id?: number) => {
  const cabinWithoutId = { ...cabin };
  delete cabinWithoutId.id;
  delete cabinWithoutId.created_at;

  let hasImagePath = false;
  let isExistingImageUrl = false;

  if (typeof cabin.image === "string") {
    hasImagePath = cabin.image.startsWith(supabaseUrl);
    isExistingImageUrl = hasImagePath; // 标记这是已存在的图片URL
  } else if (cabin.image!.length > 0) {
    hasImagePath = cabin.image![0].name.startsWith(supabaseUrl);
  }

  let imageName = "";

  // 对于新上传的文件，生成新的图片名称
  if (typeof cabin.image !== "string" && cabin.image!.length > 0) {
    imageName =
      Math.random().toString(36).substring(2) +
      "-" +
      cabin.image![0].name.split("/").join("");
  } else if (isExistingImageUrl) {
    // 对于已存在的图片URL，提取文件名并生成新的名称用于复制
    const originalFileName =
      (cabin.image as string).split("/").pop() || "image.jpg";
    imageName =
      Math.random().toString(36).substring(2) + "-copy-" + originalFileName;
  }

  const imagePath =
    hasImagePath && !isExistingImageUrl
      ? (cabin.image![0] as File).name
      : `${supabaseUrl}/storage/v1/object/public/cabins_images/${imageName}`;

  let query;

  if (id) {
    // update cabin
    query = supabase
      .from("cabins")
      .update({ ...cabinWithoutId, image: imagePath })
      .eq("id", id);
  } else {
    // create cabin
    query = supabase.from("cabins").insert([{ ...cabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  // 上传图片到 Supabase Storage
  // 如果是已存在的图片URL，需要下载并重新上传
  if (isExistingImageUrl) {
    try {
      // 下载原始图片
      const response = await fetch(cabin.image as string);
      if (!response.ok) {
        throw new Error("Failed to fetch original image");
      }

      const blob = await response.blob();

      // 重新上传为新文件
      const { error: storageError } = await supabase.storage
        .from("cabins_images")
        .upload(imageName, blob);

      //如果上传图片失败，删除数据库中的记录
      if (storageError) {
        if (data) {
          await supabase.from("cabins").delete().eq("id", data.id);
        }
        console.log(storageError);
        throw new Error(
          "Cabin image copy failed and the cabin was not created"
        );
      }
    } catch {
      // 如果复制图片失败，删除数据库中的记录
      if (data) {
        await supabase.from("cabins").delete().eq("id", data.id);
      }
      throw new Error("Failed to copy cabin image");
    }
  } else if (!hasImagePath && typeof cabin.image !== "string") {
    // 新上传的图片文件
    const { error: storageError } = await supabase.storage
      .from("cabins_images")
      .upload(imageName, cabin.image![0]);

    //如果上传图片失败，删除数据库中的记录
    if (storageError) {
      if (data) {
        await supabase.from("cabins").delete().eq("id", data.id);
      }
      console.log(storageError);
      throw new Error(
        "Cabin image upload failed and the cabin was not created"
      );
    }
  }

  return data;
};

// 删除cabin
export const deleteCabin = async (id: number) => {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    throw new Error(error.message);
  }
};
