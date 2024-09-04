import { useQuery } from "@tanstack/react-query";
import supabase from "../../../../config/superBaseClient";
import { IProject } from "../../interface/IProject";

export const useGetProjects = () => {
  const getProjects = async (): Promise<IProject[]> => {
    const { data: projects, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(`Error fetching projects: ${error.message}`);
    }

    return projects as IProject[];
  };

  return useQuery<IProject[], Error>({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};
