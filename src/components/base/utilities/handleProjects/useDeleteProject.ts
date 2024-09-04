import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "../../../../config/superBaseClient";

// Helper function to delete a video from Cloudinary
const generateSignature = async (publicId: string, timestamp: number, apiSecret: string) => {
  const message = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const deleteVideoFromCloudinary = async (videoUrl: string) => {
  const publicId = videoUrl.split("/").pop()?.split(".")[0];
  if (!publicId) {
    throw new Error("Invalid video URL");
  }

  const timestamp = Math.round(new Date().getTime() / 1000);
  const cloudName = "dzpphbz85"; 
  const apiKey = "387351268512666"; 
  const apiSecret = "cySW8WjGYTHiJLF0ywYY4XItrIg"; 

  const signature = await generateSignature(publicId, timestamp, apiSecret);

  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("timestamp", timestamp.toString());
  formData.append("api_key", apiKey);
  formData.append("signature", signature);
  formData.append("resource_type", "video");

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/video/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.result === "ok") {
    return true;
  } else {
    toast.error("Failed to delete video from Cloudinary");
    throw new Error("Video deletion failed");
  }
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ projectId, videoUrl }: { projectId: string; videoUrl: string }) => {
      // Delete from Cloudinary
      await deleteVideoFromCloudinary(videoUrl);

      // Delete from Supabase
      const { error } = await supabase
        .from("projects")
        .delete()
        .eq("id", projectId);

      if (error) {
        throw error;
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to delete project: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Project deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
