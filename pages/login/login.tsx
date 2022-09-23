import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

const login = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  // const { data: session } = useSession();
  // console.log(session);

  // if (session) {
  //   return (
  //     <div>
  //       <h1>Welcome, {session.user?.email}</h1>
  //       <button onClick={() => signOut()}>logout</button>
  //     </div>
  //   );
  // } else {
    return (
      <div>
        <div>
          <h1>plz login</h1>
          <button onClick={() => signIn()}>login</button>
        </div>
      </div>
    );
  // }
};

export default login;
