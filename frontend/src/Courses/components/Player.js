import React from 'react';
import ReactPlayer from 'react-player';

function Player({ video = {}, onEnded }) {
	return <ReactPlayer url={video.link} width="100%" height="35rem" controls light playing onEnded={onEnded} />;
}

export default Player;
