import React from 'react';
import ReactPlayer from 'react-player';

function Player() {
	return (
		<ReactPlayer url="https://www.youtube.com/watch?v=xvRozT0lZ2c" width="100%" height="35rem" controls light playing />
	);
}

export default Player;
