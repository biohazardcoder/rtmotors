import React, { useState, useCallback } from "react";
import Cropper, { type Area }  from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface ImageCropperProps {
  image: string;
  loading:boolean;
  onCancel: () => void;
  onSave: (croppedImage: string) => void;
}

export const ImageCropper: React.FC<ImageCropperProps> = ({ image, onCancel, onSave,loading }) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropComplete = useCallback((_: Area, croppedAreaPixels: Area) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const getCroppedImage = async () => {
    if (!croppedAreaPixels) return;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const imageObj = new Image();
    imageObj.src = image;

    await new Promise<void>((resolve) => {
      imageObj.onload = () => resolve();
    });

    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      imageObj,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    const croppedBase64 = canvas.toDataURL("image/jpeg");
    onSave(croppedBase64);
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg w-[90%] max-w-md">
        <div className="relative w-full h-64">
          <Cropper
            image={image}
            crop={crop}
            zoom={zoom}
            aspect={1} 
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
          />
        </div>
        <div className="flex justify-between mt-4">
          <Button disabled={loading} variant="destructive" onClick={onCancel}>Cancel</Button>
          <Button disabled={loading} className="bg-blue-500 text-white hover:bg-blue-600" onClick={getCroppedImage}>{loading ? <Loader2 className="animate-spin text-white" /> : "Save"}</Button>
        </div>
      </div>
    </div>
  );
};

