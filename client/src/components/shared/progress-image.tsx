import React, { useState, useEffect } from "react";

interface ProgressiveImageProps {
  src: string;
  alt: string;
  className?: string;
    height?: string;
}

const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ src, alt, className, height }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", src, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        const blobUrl = URL.createObjectURL(xhr.response);
        setProgress(100);
        setLoaded(true);
        setImageSrc(blobUrl);
      }
    };

    xhr.onerror = () => setLoaded(true);
    xhr.send();

    return () => xhr.abort();
  }, [src]);

  const [imageSrc, setImageSrc] = useState<string>("");

  return (
    <div className={`relative w-full ${height}`}>
      {!loaded && (
        <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
          <div className="relative">
            <div className="w-16 h-16 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-black">
              {progress}%
            </span>
          </div>
        </div>
      )}
      {imageSrc && (
        <img
          src={imageSrc}
          alt={alt}
          className={`${className} transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
