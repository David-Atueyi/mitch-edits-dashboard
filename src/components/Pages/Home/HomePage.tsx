import { useState, useEffect, useRef } from "react";
import { Button } from "../../Global/FormContent/Button";
import { useNavigate } from "react-router-dom";
import { useGetProjects } from "../../base/utilities/handleProjects/useGetProjects";
import { useDeleteProject } from "../../base/utilities/handleProjects/useDeleteProject";
import { ShowFullVideo } from "./HomePageMaodals/ShowFullVideo";
import { ConfirmProjectDeleteModal } from "./HomePageMaodals/ConfirmProjectDeleteModal";

export const HomePage = () => {
  const navigate = useNavigate();
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const isPC = window.innerWidth >= 1000;

  const { data: projects, isLoading } = useGetProjects();

  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<{
    id: string;
    videoUrl: string;
  } | null>(null);
  const [deletingProjectId, setDeletingProjectId] = useState<string | null>(
    null
  );

  const deleteProject = useDeleteProject();

  const handleDeleteProject = (projectId: string, videoUrl: string) => {
    setProjectToDelete({ id: projectId, videoUrl });
  };

  const confirmDelete = () => {
    if (projectToDelete) {
      setDeletingProjectId(projectToDelete.id);
      deleteProject.mutate(
        {
          projectId: projectToDelete.id,
          videoUrl: projectToDelete.videoUrl,
        },
        {
          onSettled: () => setDeletingProjectId(null),
        }
      );
      setProjectToDelete(null);
    }
  };

  const cancelDelete = () => {
    setProjectToDelete(null);
  };

  useEffect(() => {
    const handlePlay = (index: number) => {
      videoRefs.current.forEach((video, i) => i !== index && video?.pause());
    };

    videoRefs.current.forEach((video, index) => {
      video?.addEventListener("play", () => handlePlay(index));
    });

    return () => {
      videoRefs.current.forEach((video, index) => {
        video?.removeEventListener("play", () => handlePlay(index));
      });
    };
  }, []);

  const handleVideoClick = (videoUrl: string) => {
    setSelectedVideo(videoUrl);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
    document.body.classList.remove("overflow-hidden");
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="w-full pc:col-span-3 mediumPc:col-span-4 p-4 overflow-y-scroll relative">
      <div className="flex justify-between items-center pc:px-6 pt-3">
        <p className="pc:text-xl font-bold">Projects Table</p>
        <Button smSize={true} onClick={() => navigate("/home/add-project")}>
          Add Project
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading projects...</p>
        </div>
      ) : projects?.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-white bg-zinc-800 rounded-lg p-4">
            No projects available
          </p>
        </div>
      ) : (
        <div className="mobile:gap-14 tablet:gap-4 grid grid-cols-1 tablet:grid-cols-3 biggerPc:grid-cols-4 mt-14">
          {projects?.map((project, index) => (
            <div
              key={project.id}
              className="bg-zinc-800 p-2 rounded-lg rounded-tr-none relative"
            >
              <div className="flex justify-between items-center">
                <div className="capitalize pb-1">
                  <p className="truncate ">{project.project_name}</p>
                  <p className="flex gap-1 items-center">
                    <span className="text-sm font-bold">posted at</span> :
                    <span>
                      {new Date(project.created_at).toLocaleDateString()}
                    </span>
                  </p>
                </div>

                <Button
                  smSize={true}
                  onClick={() =>
                    handleDeleteProject(project.id, project.video_url)
                  }
                  className="mt-4 absolute -top-[3.77rem] right-0 rounded-b-none"
                  disabled={deletingProjectId === project.id}
                >
                  {deletingProjectId === project.id ? "Deleting..." : "Delete"}
                </Button>
              </div>
              <div className="bg-black h-48">
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={project.video_url}
                  loop
                  muted
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleVideoClick(project.video_url)}
                  {...(isPC && {
                    onMouseEnter: () => videoRefs.current[index]?.play(),
                    onMouseLeave: () => videoRefs.current[index]?.pause(),
                  })}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <ShowFullVideo selectedVideo={selectedVideo} onClose={handleCloseModal} />

      {projectToDelete && (
        <ConfirmProjectDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};
