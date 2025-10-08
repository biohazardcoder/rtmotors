import  { useState, useEffect } from "react";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

const VideoPlayer = ({ videoUrl }: { videoUrl: string }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");

  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", videoUrl, true);
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
        setVideoSrc(blobUrl);
        setProgress(100);
        setLoaded(true);
      }
    };

    xhr.onerror = () => setLoaded(true);
    xhr.send();

    return () => xhr.abort();
  }, [videoUrl]);

  return (
    <div className="relative w-full h-[260px] max-w-[460px] mx-auto overflow-hidden rounded-xl bg-gray-300">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-200 z-10">
          <div className="relative mb-2">
            <div className="w-14 h-14 rounded-full border-4 border-gray-300 border-t-blue-500 animate-spin"></div>
            <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-gray-800">
              {progress}%
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600">Loading video...</p>
        </div>
      )}

      <div
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.5s ease-in-out",
        }}
      >
        {videoSrc && (
          <Player
            src={videoSrc}
            aspectRatio="1:0.8"
            fluid
            muted
            playsInline
          />
        )}
      </div>
    </div>
  );
};

export default VideoPlayer;
