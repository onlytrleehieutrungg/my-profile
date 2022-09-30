import Link from "next/link";
import React from "react";
const AUTH_URL =
  "https://accounts.spotify.com/authorize?client_id=8894f18801774d2b8cbfa00a6d5febb6&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

const Login = () => {
  return (
    <div>
      <div>
        <Link href={AUTH_URL} >Login With Spotify</Link>
      </div>
    </div>
  );
  // }
};

export default Login;
