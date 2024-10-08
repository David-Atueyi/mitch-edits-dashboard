import React from 'react';
import { Button } from '../../../Global/FormContent/Button';

interface ConfirmClientDeleteModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmClientDeleteModal: React.FC<ConfirmClientDeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center animate-modal-overlay">
      <div className="bg-zinc-900 p-6 rounded-lg max-w-[90%] max-h-[90%] animate-modal-content">
        <h2 className="text-white text-xl mb-4">Confirm Delete</h2>
        <p className="text-white mb-6">Are you sure you want to delete this client?</p>
        <div className="flex justify-end space-x-4">
          <Button smSize={true} onClick={onCancel}>
            Cancel
          </Button>
          <Button smSize={true} onClick={onConfirm} className="bg-red-500 hover:bg-red-600">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
