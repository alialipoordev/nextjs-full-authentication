import { text1, text2 } from "@/constant/text";
import { NextPageContext } from "next";
import { getSession, useSession } from "next-auth/react";
import { signIn, signOut } from "next-auth/react";
import { AiFillGithub } from "react-icons/ai";

export default function Home() {
  const { data: session } = useSession();
  console.log(session);

  return (
    <div className="bg-black min-h-screen flex items-center justify-center">
      <div className="container mx-auto">
        <div className="border border-white relative flex flex-col w-full rounded-lg">
          <div className="flex flex-wrap justify-center items-center">
            <div className="w-full text-right">
              <div className="py-6 px-3">
                <button
                  className="bg-blue-500 hover:bg-blue-700
                   text-md uppercase font-bold px-8 py-2 rounded-md
                    sm:mr-2 mb-1 ease-linear tra transition-all duration-150"
                  onClick={() => signOut()}
                >
                  Logout
                </button>
              </div>
            </div>
            <div className="w-full flex justify-center">
              <img
                src={session?.user?.image!}
                alt={`${session?.user?.name} image`}
                className="rounded-full h-40 w-40"
              />
            </div>
            <div className="text-center mt-12">
              <h3 className="text-4xl font-semibold mb-2">
                {session?.user?.name}
              </h3>
              <div className="text-sm mb-2 font-bold">
                {session?.user?.email}
              </div>
              <div className="mb-2 mt-10">
                You logged in using &nbsp;
                <span
                  className="capitalize bg-blue-400 text-white
                 px-4 py-1 ml-2 font-bold italic text-lg rounded-md"
                >
                  {session?.user?.provider}
                </span>
              </div>
            </div>
            <div className="mt-10 py-10 border-t text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full px-4">
                  <p className="mb-4 text-sm">{text1}</p>
                  <p className="font-bold text-xs">{text2}</p>
                  <div className="mt-6 flex items-center justify-center gap-2">
                    Source code here : &nbsp;
                    <a
                      href="http://"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-4xl"
                    >
                      <AiFillGithub />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
