import * as React from "react";
import Input from "../inputs/Input";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import zxcvbn from "zxcvbn";
import SlideButton from "../buttons/SlideButton";
import axios from "axios";
import { toast } from "react-toastify";

interface ResetFormProps {
    token: string;
}

const FormSchema = z
  .object({
    password: z
      .string()
      .min(6, "Password must be at least 6 characters.")
      .max(52, "Password must be less than 6 characters."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match!",
    path: ["confirmPassword"],
  });

type FormSchemaType = z.infer<typeof FormSchema>;

const ResetForm: React.FunctionComponent<ResetFormProps> = ({token}) => {
  const [passwordScore, setPasswordScore] = React.useState(0);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<FormSchemaType> = async (values: any) => {
    try {
      const { data } = await axios.post("/api/auth/reset", {
        password: values.password,
        token
      });
      reset();
      toast.success(data.message);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const validatePasswordStrength = () => {
    let password = watch().password;
    return zxcvbn(password ? password : "").score;
  };

  React.useEffect(() => {
    setPasswordScore(validatePasswordStrength());
  }, [watch().password]);

  return (
    <div className="w-full px-12 py-4">
      <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
        Reset Your Password
      </h2>
      <p className="text-center text-sm text-gray-600 mt-2">
        Enter a new password below to change your password
      </p>

      <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="password"
          label="Password"
          type="password"
          icon={<FiLock />}
          placeholder="******"
          register={register}
          error={errors?.password?.message}
          disabled={isSubmitting}
          passwordScore={passwordScore}
        />
        <Input
          name="confirmPassword"
          label="Confirm password"
          type="password"
          icon={<FiLock />}
          placeholder="******"
          register={register}
          error={errors?.confirmPassword?.message}
          disabled={isSubmitting}
        />
        <SlideButton
          type="submit"
          text="Change Password"
          slide_text="Secure change password"
          icon={<FiLock />}
          disabled={isSubmitting}
        />
      </form>
    </div>
  );
};

export default ResetForm;
