import React, { useEffect, useState } from 'react';
import muteIcon from './../assets/mute.png';
import lowVolumeIcon from './../assets/low-volume.png'; // Low volume icon
import highVolumeIcon from './../assets/high-volume.png'; // High volume icon

const MusicPlayer: React.FC = () => {
  const [audio] = useState(new Audio('./../assets/music.mp3'));
  const [volume, setVolume] = useState(1); // Initial volume level

  useEffect(() => {
    audio.volume = volume;
    audio.play(); // Automatically play when the component mounts
  }, [volume, audio]);

  const toggleVolume = () => {
    // Cycle between mute (0), low (0.5), and high (1)
    if (volume === 1) {
      setVolume(0); // Mute
    } else if (volume === 0) {
      setVolume(0.5); // Low
    } else {
      setVolume(1); // High
    }
  };

  // Determine the volume icon based on the current volume
  const getVolumeIcon = () => {
    if (volume === 0) {
      return muteIcon;
    } else if (volume === 0.5) {
      return lowVolumeIcon;
    } else {
      return highVolumeIcon;
    }
  };

  return (
    <div className="music-player-wrapper">
      <div className="controls">
        <img
          src={getVolumeIcon()}
          alt="Volume Icon"
          className="volume-icon"
          onClick={toggleVolume} // Clicking the icon toggles the volume
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
