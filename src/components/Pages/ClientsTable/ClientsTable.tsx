import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../Global/FormContent/Button";
import { useGetClients } from "../../base/utilities/handleClients/useGetClients";
import { useDeleteClient } from "../../base/utilities/handleClients/useDeleteClient";
import { ConfirmClientDeleteModal } from "./clientsModal/confirmClientDeleteModel";
import { ShowFullImage } from "./clientsModal/showFullImage";

export const ClientsTable = () => {
  const navigate = useNavigate();
  const { data: clients = [], isLoading } = useGetClients();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [clientToDelete, setClientToDelete] = useState<{
    id: string;
    imageUrl: string;
  } | null>(null);
  const [deletingClientId, setDeletingClientId] = useState<string | null>(null);
  const deleteClientMutation = useDeleteClient();

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
    document.body.classList.add("overflow-hidden");
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    document.body.classList.remove("overflow-hidden");
  };
  const handleDeleteClient = (clientId: string, imageUrl: string) => {
    setClientToDelete({ id: clientId, imageUrl });
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setDeletingClientId(clientToDelete.id);
      deleteClientMutation.mutate(
        {
          clientId: clientToDelete.id,
          imageUrl: clientToDelete.imageUrl,
        },
        {
          onSettled: () => setDeletingClientId(null),
        }
      );
      setClientToDelete(null);
    }
  };

  const cancelDelete = () => {
    setClientToDelete(null);
  };

  useEffect(() => {
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, []);

  return (
    <div className="w-full pc:col-span-3 mediumPc:col-span-4 overflow-y-scroll p-4 relative">
      <div className="flex justify-between items-center pc:px-6 pt-3">
        <p className="pc:text-xl font-bold">Clients Table</p>
        <Button smSize={true} onClick={() => navigate("/home/add-client")}>
          Add Client
        </Button>
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <p>Loading clients...</p>
        </div>
      ) : (
        <div className="mt-11">
          <div className="overflow-x-auto">
            <div className="min-w-[640px] grid grid-cols-10 rounded-t-[10px] bg-[#38b6ff] px-6 py-4 pc:px-11">
              <div className="col-span-3">
                <h5 className="font-medium text-white">Client Logo</h5>
              </div>
              <div className="col-span-3">
                <h5 className="font-medium text-white">Account Name</h5>
              </div>
              <div className="col-span-3">
                <h5 className="font-medium text-white">Account Handle</h5>
              </div>
            </div>

            {clients.length === 0 ? (
              <div className="flex justify-center items-center h-64">
                <p className="text-white bg-zinc-800 rounded-lg p-4">No clients available</p>
              </div>
            ) : (
              clients.map((client, index) => (
                <div
                  key={index}
                  className="min-w-[640px] bg-zinc-800 rounded-b-[10px] grid grid-cols-10 items-center border-t border-[#EEEEEE] px-6 py-4 pc:px-11"
                >
                  <div className="col-span-3">
                    <div
                      className="h-16 w-16 rounded-full cursor-pointer"
                      onClick={() => handleImageClick(client.profile_image)}
                    >
                      <img
                        src={client.profile_image}
                        alt="Client Logo"
                        className="w-full h-full object-cover border border-white rounded-full"
                      />
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-white">{client.account_name}</p>
                  </div>
                  <div className="col-span-3">
                    <p className="text-white">{client.account_handle}</p>
                  </div>
                  <div className="col-span-1">
                    <button
                      className="float-right text-[#38b6ff]"
                      onClick={() =>
                        handleDeleteClient(client.id, client.profile_image)
                      }
                      disabled={deletingClientId === client.id}
                    >
                      {deletingClientId === client.id ? "Deleting..." : "Delete"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {clientToDelete && (
        <ConfirmClientDeleteModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}

      {selectedImage && (
        <ShowFullImage imageUrl={selectedImage} onClose={handleCloseModal} />
      )}
    </div>
  );
};
