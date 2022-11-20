import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface SpotifyState {
    songs: any[];
}


export const fetchSpotify = createAsyncThunk(
    "spotify/fetchLyrics",
    async (playingTrack: any) => {
        const response = await axios.get("http://localhost:3001/lyrics", {
            params: {
                track: playingTrack.title,
                artist: playingTrack.artist,
            },
        });
        return response.data;
    }
);

const reducer = createSlice({
    name: "spotify",
    initialState: { songs: [], loading: "idle" },
    reducers: {},
});

export const spotifyAction = {
    ...reducer.actions,
};

export const spotifyReducer = reducer.reducer;
