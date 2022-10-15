import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Search } from '../../src/core/api/types'
import useAuth from '../../src/packages/user/useAuth'
import Login from '../login/login'
import { TextField } from './components/textField'
import SpotifyWebApi from 'spotify-web-api-node'
import Link from 'next/link'
import { TrackSearchResult } from './components/TrackSearchResult'
import { Player } from './components/player'
import axios from 'axios'
import { Introduce } from './containers/introduce'
const defaultValues: Search = {
    searchValue: ''
}
const AUTH_URL =
    "https://accounts.spotify.com/authorize?client_id=8894f18801774d2b8cbfa00a6d5febb6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const spotifyApi = new SpotifyWebApi({
    clientId: "8894f18801774d2b8cbfa00a6d5febb6",
    // clientSecret: "48dc64062afd4c4a82635a278d12fa4e"
})
const ChillingWithMe = () => {
    const router = useRouter()
    const { code } = router.query
    const accessToken = useAuth(code)
    const [search, setSearch] = useState<string>()
    const [searchValue, setSearchValue] = useState<any[]>()
    const [playingTrack, setPlayingTrack] = useState<any>()
    const [lyrics, setLyrics] = useState<string>()
    const methods = useForm<Search>({ defaultValues });
    const watchSearch = methods.watch("searchValue");
    const [showIntro, setShowIntro] = useState<boolean>(true)
    function chooseTrack(track: any) {
        setPlayingTrack(track)
        setSearch('')
        setLyrics('')
    }

    useEffect(() => {
        if (!playingTrack) return
        axios
            .get("http://54.199.112.38:3001/lyrics", {
                params: {
                    track: playingTrack.title,
                    artist: playingTrack.artist,
                },
            })
            .then(res => {
                setLyrics(res.data.lyrics)
            })
    }, [playingTrack])

    useEffect(() => {
        if (!accessToken) {
            return
        }
        spotifyApi.setAccessToken(accessToken!)
    }, [accessToken])

    useEffect(() => {
        if (watchSearch === '') setShowIntro(true)
        else setShowIntro(false)
        setSearch(watchSearch)
        setLyrics("")
    }, [watchSearch])

    useEffect(() => {
        if (!accessToken) {
            return
        }
        if (!search) {
            return
        }
        spotifyApi.searchTracks(search).then(res => {
            setSearchValue(res.body.tracks?.items.map(track => {
                const smallestAlbumImage = track.album.images.reduce(
                    (smallest, image) => {
                        if (image.height! < smallest.height!) return image
                        return smallest
                    },
                    track.album.images[0]
                )
                return {
                    artist: track.artists[0].name,
                    title: track.name,
                    uri: track.uri,
                    albumUrl: smallestAlbumImage?.url
                }
            }))

        })

    }, [accessToken, search])

    const _handleOnSubmit = async (input: Search) => {
        setSearch(input.searchValue)
    };


    return (
        <FormProvider {...methods} >
            <div className='main'>
                <video className='video-bg' src='https://video.wixstatic.com/video/fe5385_9f011cd1aa2a4bbfa6903ac7a1804dde/1080p/mp4/file.mp4'
                    autoPlay
                    loop
                    muted
                />
                <div className='content'>
                    <div className="contact p-3 flex items-center justify-center">
                        <div className="container max-w-screen-lg mx-auto">
                            <div className="flex flex-wrap justify-center gap-2">
                                <h2 className='inline-flex items-center text-2xl text-zinc-200'>Follow me</h2>
                                <button className="p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                </button>
                                <button className="p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg className="w-5 h-5 fill-current" role="img" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                                        <g><path d="M218.123122,218.127392 L180.191928,218.127392 L180.191928,158.724263 C180.191928,144.559023 179.939053,126.323993 160.463756,126.323993 C140.707926,126.323993 137.685284,141.757585 137.685284,157.692986 L137.685284,218.123441 L99.7540894,218.123441 L99.7540894,95.9665207 L136.168036,95.9665207 L136.168036,112.660562 L136.677736,112.660562 C144.102746,99.9650027 157.908637,92.3824528 172.605689,92.9280076 C211.050535,92.9280076 218.138927,118.216023 218.138927,151.114151 L218.123122,218.127392 Z M56.9550587,79.2685282 C44.7981969,79.2707099 34.9413443,69.4171797 34.9391618,57.260052 C34.93698,45.1029244 44.7902948,35.2458562 56.9471566,35.2436736 C69.1040185,35.2414916 78.9608713,45.0950217 78.963054,57.2521493 C78.9641017,63.090208 76.6459976,68.6895714 72.5186979,72.8184433 C68.3913982,76.9473153 62.7929898,79.26748 56.9550587,79.2685282 M75.9206558,218.127392 L37.94995,218.127392 L37.94995,95.9665207 L75.9206558,95.9665207 L75.9206558,218.127392 Z M237.033403,0.0182577091 L18.8895249,0.0182577091 C8.57959469,-0.0980923971 0.124827038,8.16056231 -0.001,18.4706066 L-0.001,237.524091 C0.120519052,247.839103 8.57460631,256.105934 18.8895249,255.9977 L237.033403,255.9977 C247.368728,256.125818 255.855922,247.859464 255.999,237.524091 L255.999,18.4548016 C255.851624,8.12438979 247.363742,-0.133792868 237.033403,0.000790807055"></path></g>
                                    </svg>
                                </button>
                                <button className="p-2 font-semibold text-white inline-flex items-center space-x-2 rounded">
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" className="w-5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24">
                                        <g fill="none"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385c.6.105.825-.255.825-.57c0-.285-.015-1.23-.015-2.235c-3.015.555-3.795-.735-4.035-1.41c-.135-.345-.72-1.41-1.23-1.695c-.42-.225-1.02-.78-.015-.795c.945-.015 1.62.87 1.845 1.23c1.08 1.815 2.805 1.305 3.495.99c.105-.78.42-1.305.765-1.605c-2.67-.3-5.46-1.335-5.46-5.925c0-1.305.465-2.385 1.23-3.225c-.12-.3-.54-1.53.12-3.18c0 0 1.005-.315 3.3 1.23c.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23c.66 1.65.24 2.88.12 3.18c.765.84 1.23 1.905 1.23 3.225c0 4.605-2.805 5.625-5.475 5.925c.435.375.81 1.095.81 2.22c0 1.605-.015 2.895-.015 3.3c0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" fill="currentColor" /></g>
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="spotify-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-spotify" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                        </svg>
                        <div className="pl-4 z-120">
                            <Link href={AUTH_URL} >Login</Link>
                        </div>
                    </div>
                    {accessToken ? <div className="main-text">
                        <form className="flex items-center" onSubmit={methods.handleSubmit(_handleOnSubmit)}>
                            <label className="sr-only">Search</label>
                            <div className="">
                                <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
                                </div>
                                <TextField name={'searchValue'} label={'Any song...'} />
                            </div>
                            <button type="submit" className="inline-flex items-center py-2.5 px-3 ml-2 text-sm font-medium text-white bg-transparent rounded-lg border border-gray-400 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 ">Search</button>
                        </form>
                    </div> : ""}

                    {showIntro ? <Introduce classname='introduce' /> : lyrics ? <div className='lyrics-box absolute top-16 px-24'>
                        <div className='lyric'>{lyrics}</div></div> : <div className='grid grid-cols-4 gap-8 absolute flex top-24 px-16'>
                        {searchValue?.map(track => <div key={track.uri}><TrackSearchResult classname={"nc-Card11"} track={track} chooseTrack={chooseTrack} /></div>)}
                    </div>}

                    <div className='absolute flex bottom-0'><Player accessToken={accessToken} trackUri={playingTrack?.uri} /></div>
                </div>
            </div>
        </FormProvider>
    )
}

export default ChillingWithMe  