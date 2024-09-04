import React from 'react';
import { Button } from '../../../Global/FormContent/Button';

interface ShowFullImageProps {
  imageUrl: string;
  onClose: () => void;
}

export const ShowFullImage: React.FC<ShowFullImageProps> = ({ imageUrl, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-zinc-900 p-4 rounded-lg max-w-[90%] max-h-[90%]">
        <img
          src={imageUrl}
          alt="Client Logo"
          className="w-auto h-auto max-w-full max-h-[70vh] object-contain"
        />
        <Button smSize={true} onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
};
