import {getSession, signOut, useSession} from "next-auth/react";
import React from "react";

const account = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {data: session, status} = useSession();

  if (status === "authenticated") {
    return (
      <div>
        <h1>Welcome, account {session.user?.email}</h1>
        <button onClick={() => signOut()}>logout</button>
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <h1>u a not sighn in</h1>
        </div>
      </div>
    );
  }
};

export default account;

export const getServerSideProps = async (context: any) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: session,
  };
};
