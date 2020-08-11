import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import VideoRoomComponent from './components/VideoRoomComponent';
import registerServiceWorker from './registerServiceWorker';

const urlParams = new URLSearchParams(window.location.search);
const sessionName = urlParams.get('session');
const userName = urlParams.get('name');
const openviduSecret = 'jVKXfBStzn';
const conferenceName = urlParams.get('conference');

ReactDOM.render(<VideoRoomComponent sessionName={sessionName} user={userName} conferenceName={conferenceName} openviduSecret={openviduSecret} />, document.getElementById('root'));
registerServiceWorker();

