import supabase from "../../../../config/superBaseClient";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { ICreateClient } from "../../interface/ICreateClient";

const uploadImageToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mitchimage");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dzpphbz85/image/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    toast.error("Failed to upload image to Cloudinary");
    throw new Error("Image upload failed");
  }
};

const useInsertClient = async ({
  select_file,
  account_name,
  account_handle,
}: ICreateClient) => {
  if (!select_file || select_file.length === 0) {
    toast.error("Please select a file.");
    throw new Error("No file selected");
  }

  const file = select_file[0];
  const imageUrl = await uploadImageToCloudinary(file);

  const { data, error } = await supabase.from("clients").insert({
    account_name,
    account_handle,
    profile_image: imageUrl,
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useCreateClient = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: useInsertClient,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Client created successfully!");
    },
  });

  const handleCreateClient = (data: ICreateClient) => {
    mutate(data);
  };

  return { handleCreateClient, isPending, isSuccess };
};
