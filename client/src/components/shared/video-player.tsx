import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Player } from "video-react";
import "video-react/dist/video-react.css";

interface VideoPlayerProps {
  videoUrl: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl }) => {
  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [videoSrc, setVideoSrc] = useState<string>("");
  const { t } = useTranslation();
  useEffect(() => {
    let isMounted = true; 
    const xhr = new XMLHttpRequest();
    xhr.open("GET", videoUrl, true);
    xhr.responseType = "blob";

    xhr.onprogress = (event) => {
      if (event.lengthComputable && isMounted) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setProgress(percent);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200 && isMounted) {
        const blobUrl = URL.createObjectURL(xhr.response);
        setVideoSrc(blobUrl);
        setProgress(100);
        setLoaded(true);
      }
    };

    xhr.onerror = () => {
      if (isMounted) setLoaded(true);
    };

    xhr.send();

    return () => {
      isMounted = false;
      xhr.abort();
    };
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
          <p className="text-sm font-medium text-gray-600">{t("loading_video")}</p>
        </div>
      )}

      {videoSrc && (
        <div
          style={{
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          <Player
            src={videoSrc}
            aspectRatio="16:9"
            fluid
            muted
            playsInline
          />
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
