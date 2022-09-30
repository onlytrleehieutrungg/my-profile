/* eslint-disable @next/next/no-img-element */
import React from 'react'

interface TrackSearchResultProps {
    track: any
    classname: string
    chooseTrack: Function
}
export const TrackSearchResult: React.FC<TrackSearchResultProps> = ({ track, classname, chooseTrack }) => {
    function handlePlay() {
        chooseTrack(track)
    }
    return (
        <div
            className={`${classname} bg-black bg-opacity-75`}
        >
            <div className={`flex`} onClick={handlePlay}>
                <span >
                    <img src={track.albumUrl} alt={""} className="rounded-2xl"/>
                </span>
                <div className="pl-4">
                    <h2 className="text-base text-neutral-900">
                        <div
                            className="text-white w-50 overflow-hidden text-ellipsis whitespace-normal hover:overflow-visible">
                            {track.title}
                        </div>
                    </h2>
                    <span className="text-xs text-neutral-500">
                        {track.artist}
                    </span>
                </div>
            </div>
        </div>
    )
}
