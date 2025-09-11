import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

const VideoPlayer = ({ videoUrl }:{videoUrl:string}) => {
  return (
    <div  className="video-container "  style={{ maxWidth: '800px', margin: 'auto' }}>
      <Player
        src={videoUrl}
        muted
      />
    </div>
  );
};

export default VideoPlayer;
