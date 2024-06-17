import * as React from "react";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

interface RegisterFormProps {}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid address."),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const LoginForm: React.FunctionComponent<RegisterFormProps> = (props) => {
  const router = useRouter();
  const path = router.pathname;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values: any) => {};

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Sign in
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        You do not have an account? &nbsp;
        <a
          className="text-blue-600 hover:text-blue-700 hover:underline cursor-pointer"
          onClick={() =>
            router.push({
              pathname: path,
              query: {
                tab: "signup",
              },
            })
          }
        >
          Sign up
        </a>
      </p>

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="email"
          label="Email"
          type="text"
          icon={<FiMail />}
          placeholder="example"
          register={register}
          error={errors?.email?.message}
          disabled={isSubmitting}
        />
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="******"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
        />
        <SlideButton
          type="submit"
          text="Sign in"
          slide_text="Secure sign in"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default LoginForm;