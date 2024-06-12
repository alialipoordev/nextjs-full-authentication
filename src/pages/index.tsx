import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {session ? (
        <div className="flex flex-col gap-1 items-center">
          <h2>{session.user?.name}</h2>
          <img
            src={session.user?.image as string}
            alt="profile image"
            className="w-32 h-32 rounded-full"
          />
          <h4>{session.user?.email}</h4>
          <span>
            Provider: <b>{session.user?.provider}</b>
          </span>
          <button onClick={() => signOut()}>sign out</button>
        </div>
      ) : (
        <button onClick={() => signIn()}>sign in</button>
      )}
    </div>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {},
  };
}
