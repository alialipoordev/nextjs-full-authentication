import Background from "@/components/backgrounds/Background";
import LoginForm from "@/components/forms/Login";
import RegisterForm from "@/components/forms/Register";
import { NextPageContext } from "next";
import React from "react";

function auth({ tab }: { tab: string }) {
  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-full h-100 flex items-center justify-center">
        {/* Form */}
        <div
          className="w-full sm:w-5/6 md:w-2/3 
          lg:w-1/2 xl:w-1/3 2xl:w-1/3 h-full bg-white 
          flex items-center justify-center"
        >
          {tab == "signin" ? <LoginForm /> : <RegisterForm />}
        </div>
        {/* Background */}
        <Background
          image={`/auth/${tab == "signup" ? "register" : "login"}.jpg`}
        />
      </div>
    </div>
  );
}

export default auth;

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;
  const tab = query.tab ? query.tab : "signin";

  return {
    props: { tab: JSON.parse(JSON.stringify(tab)) },
  };
}
