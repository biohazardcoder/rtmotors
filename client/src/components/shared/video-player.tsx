import { Player } from 'video-react';
import 'video-react/dist/video-react.css';

const VideoPlayer = ({ videoUrl }:{videoUrl:string}) => {
  return (
    <div  className="video-container "  style={{ height:"260px", objectFit:"cover", objectPosition: "center" , maxWidth: '460px', margin: 'auto' }}>
      <Player
        src={videoUrl}
        aspectRatio='1:0.8'
        fluid
        muted
      />
    </div>
  );
};

export default VideoPlayer;
