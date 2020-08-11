import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
import Fullscreen from '@material-ui/icons/Fullscreen';
import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PictureInPicture from '@material-ui/icons/PictureInPicture';
import ScreenShare from '@material-ui/icons/ScreenShare';
import StopScreenShare from '@material-ui/icons/StopScreenShare';
import Tooltip from '@material-ui/core/Tooltip';
// import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import CallEndIcon from '@material-ui/icons/CallEnd';

import IconButton from '@material-ui/core/IconButton';

export default class ToolbarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { fullscreen: false };
        this.camStatusChanged = this.camStatusChanged.bind(this);
        this.micStatusChanged = this.micStatusChanged.bind(this);
        this.screenShare = this.screenShare.bind(this);
        this.stopScreenShare = this.stopScreenShare.bind(this);
        this.toggleFullscreen = this.toggleFullscreen.bind(this);
        this.leaveSession = this.leaveSession.bind(this);
        this.toggleChat = this.toggleChat.bind(this);
    }


    micStatusChanged() {
        this.props.micStatusChanged();
    }

    camStatusChanged() {
        this.props.camStatusChanged();
    }

    screenShare() {
        this.props.screenShare();
    }

    stopScreenShare() {
        this.props.stopScreenShare();
    }

    toggleFullscreen() {
        this.setState({ fullscreen: !this.state.fullscreen });
        this.props.toggleFullscreen();
    }

    leaveSession() {
	const result = window.confirm('Are you sure?');
	if(result == true) {
            this.props.leaveSession();
	}
    }

    toggleChat() {
        this.props.toggleChat();
    }

    render() {
        const conferenceName = this.props.conferenceName;
        const mySessionId = this.props.sessionId;
        const localUser = this.props.user;
        return (
            <AppBar className="toolbar" id="header">
                <Toolbar className="toolbar">
                    <div id="navSessionInfo">
                        <img
                            id="header_img"
                            alt="Visiondrill"
                            src="https://visiondrill.com/images/logo_text.png"
                        />
                    </div>

                    <div className="buttonsContent">
                    {this.props.sessionId && <div id="">
                            <span id="conferenceName">Ongoing Conference: {conferenceName}</span>
                        </div>}
                        <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                            {localUser !== undefined && localUser.isAudioActive() ? (
                                <Tooltip title="Mute Audio">
                                    <Mic />
                                </Tooltip>
                                ) : (
                                <Tooltip title="Unmute Audio">
                                    <MicOff color="secondary" />
                                </Tooltip>
                                )}
                        </IconButton>

                        <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                            {localUser !== undefined && localUser.isVideoActive() ? (
                                <Tooltip title="Mute Camera">
                                    <Videocam />
                                </Tooltip>
                            ) : (
                            <Tooltip title="Unmute Camera">
                                <VideocamOff color="secondary" />
                            </Tooltip>
                            )}
                        </IconButton>

                        <Tooltip title="Share Screen">
                            <IconButton id="shareScreenButton" color="inherit" className="navButton" onClick={this.screenShare}>
                                {localUser !== undefined && localUser.isScreenShareActive() ? <PictureInPicture /> : <ScreenShare />}
                            </IconButton>
                        </Tooltip>

                        {localUser !== undefined &&
                            localUser.isScreenShareActive() && (
                                <IconButton onClick={this.stopScreenShare} id="navScreenButton">
                                    <StopScreenShare color="secondary" />
                                </IconButton>
                            )}

                        <Tooltip title="Fullscreen">
                            <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                                {localUser !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Leave Conference">
                            <IconButton className="navButton" onClick={this.leaveSession}>
                                <CallEndIcon color="secondary"></CallEndIcon>
                            </IconButton>
                        </Tooltip>

                        <Tooltip title="Chat">
                            <IconButton className="navButton ml-2" color="inherit" onClick={this.toggleChat}>
                                {this.props.showNotification && <div id="point" className="" />}
                                <QuestionAnswer />
                            </IconButton>
                        </Tooltip>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
