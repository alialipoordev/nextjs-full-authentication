import * as React from "react";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import SlideButton from "../buttons/SlideButton";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { MdArrowBackIos } from "react-icons/md";

interface ForgotFormProps {}

const FormSchema = z.object({
  email: z.string().email("Please enter a valid address."),
});

type FormSchemaType = z.infer<typeof FormSchema>;

const ForgotForm: React.FunctionComponent<ForgotFormProps> = () => {
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
        Forgot Password
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Enter your email and we&apos;ll send you a link to reset your password.
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

        <SlideButton
          type="submit"
          text="Submit"
          slide_text="Secure send email"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>

      <div className="text-center font-medium">
        <Link href="/auth" className="flex items-center justify-center">
          <MdArrowBackIos style={{ marginRight: "0.5rem" }} />
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default ForgotForm;
