import React, { useEffect, useState } from 'react'
import SpotifyPlayer from "react-spotify-web-playback"
interface PlayerProps {
    accessToken: any
    trackUri: string
}
const Player: React.FC<PlayerProps> = ({ accessToken, trackUri }) => {
    const [play, setPlay] = useState(false);
    useEffect(() => {
        setPlay(true)
    }, [trackUri])
    if (!accessToken) return null
    return (
        <div className=''>
            <SpotifyPlayer
                styles={{
                    activeColor: '#fff',
                    bgColor: '#333',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                }}
                token={accessToken}
                showSaveIcon
                callback={state => { if (!state.isPlaying) setPlay(true) }}
                play={play}
                uris={trackUri ? [trackUri] : []}
            />
        </div>
    )
}

export default Player