import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "../../../../config/superBaseClient";
import { ICreateProject } from "../../interface/ICreateProject";


const uploadVideoToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "mitchvideos");

  const response = await fetch(
    "https://api.cloudinary.com/v1_1/dzpphbz85/video/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.secure_url) {
    return data.secure_url;
  } else {
    toast.error("Failed to upload video to Cloudinary");
    throw new Error("Video upload failed");
  }
};

const useInsertProject = async ({
  select_file,
  project_name,
}: ICreateProject) => {
  if (!select_file || select_file.length === 0) {
    toast.error("Please select a file.");
    throw new Error("No file selected");
  }

  const file = select_file[0];
  const videoUrl = await uploadVideoToCloudinary(file);

  const { data, error } = await supabase.from("projects").insert({
    project_name,
    video_url: videoUrl,
  });

  if (error) {
    toast.error(error.message);
    throw new Error(error.message);
  }

  return data;
};

export const useCreateProject = () => {
  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: useInsertProject,
    onError: (error: any) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      toast.success("Project created successfully!");
    },
  });

  const handleCreateProject = (data: ICreateProject) => {
    mutate(data);
  };

  return { handleCreateProject, isPending, isSuccess };
};
