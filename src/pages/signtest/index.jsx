import { useSession, signIn, signOut } from 'next-auth/react';
import React from 'react';

export default function Sign() {
  const { data: session } = useSession();
  console.log(session);
  if (session) {
    return (
      <>
        Signed in as {session?.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  } else {
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>;
  }
}
