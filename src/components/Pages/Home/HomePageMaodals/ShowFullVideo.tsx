import React, { useRef, useEffect } from 'react';
import { Button } from '../../../Global/FormContent/Button';

interface ShowFullVideoProps {
  selectedVideo: string | null;
  onClose: () => void;
}

export const ShowFullVideo: React.FC<ShowFullVideoProps> = ({ selectedVideo, onClose }) => {
  const modalVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (selectedVideo) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [selectedVideo]);

  if (!selectedVideo) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-900 p-4 rounded-lg max-w-[90%] max-h-[90%]">
        <video
          ref={modalVideoRef}
          src={selectedVideo}
          controls
          autoPlay
          className="w-full h-auto max-h-[70vh]"
          onEnded={onClose}
        />
        <Button smSize={true} onClick={onClose} className="mt-4">
          Close
        </Button>
      </div>
    </div>
  );
};
