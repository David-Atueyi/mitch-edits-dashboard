import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import supabase from "../../../../config/superBaseClient";

// Helper function to delete an image from Cloudinary
const generateSignature = async (publicId: string, timestamp: number, apiSecret: string) => {
  const message = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const deleteImageFromCloudinary = async (imageUrl: string) => {
  const publicId = imageUrl.split("/").pop()?.split(".")[0];
  if (!publicId) {
    throw new Error("Invalid image URL");
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

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (data.result === "ok") {
    return true;
  } else {
    toast.error("Failed to delete image from Cloudinary");
    throw new Error("Image deletion failed");
  }
};

export const useDeleteClient = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ clientId, imageUrl }: { clientId: string; imageUrl: string }) => {
      // Delete from Cloudinary
      await deleteImageFromCloudinary(imageUrl);

      // Delete from Supabase
      const { error } = await supabase
        .from("clients")
        .delete()
        .eq("id", clientId);

      if (error) {
        throw error;
      }
    },
    onError: (error: any) => {
      toast.error(`Failed to delete client: ${error.message}`);
    },
    onSuccess: () => {
      toast.success("Client deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["clients"] });
    },
  });
};

