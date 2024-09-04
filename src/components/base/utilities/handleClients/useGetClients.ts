import supabase from "../../../../config/superBaseClient";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { IClient } from "../../interface/IClient";

export const useGetClients = () => {
  const fetchedClients = async (): Promise<IClient[]> => {
    const { data: clients, error } = await supabase.from("clients").select("*");

    if (error) {
      toast.error(
        "An error occurred while getting , check your internet connection and reload"
      );
    }

    return clients as IClient[];
  };
  return useQuery<IClient[], Error>({
    queryKey: ["clients"],
    queryFn: fetchedClients,
  });
};
