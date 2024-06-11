import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";

export default function Home() {
  const session = useSession();
  console.log(session);

  return (
    <>
      <h1 className="text-red-700 text-4xl bg-yellow-100">
        Welcome to the course
      </h1>
      <button onClick={() => signIn()} style={{ background: "green" }}>
        sign in
      </button>
      <button onClick={() => signOut()} style={{ background: "red" }}>
        sign out
      </button>
    </>
  );
}

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  console.log(session);
  return {
    props: {},
  };
}
