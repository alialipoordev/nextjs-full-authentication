import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FiLock, FiMail } from "react-icons/fi";
import { BsTelephone } from "react-icons/bs";
import validator from "validator";

interface IRegisterFormProps {}

const FormSchema = z.object({
  first_name: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(32, "First name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
  last_name: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(32, "Last name must be less than 32 characters")
    .regex(new RegExp("^[a-zA-Z]+$"), "No special characters allowed."),
  email: z.string().email("Please enter a valid address."),
  phone: z.string().refine(validator.isMobilePhone, {
    message: "Please enter a valid phone number",
  }),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters.")
    .max(52, "Password must be less than 6 characters."),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Password doesn't match!",
  path: ["confirmPassword"]
});

type FormSchemaType = z.infer<typeof FormSchema>;

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = (data: any) => console.log(data);

  return (
    <form className="my-8 text-sm" onSubmit={handleSubmit(onSubmit)}>
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.first_name?.message}
          disabled={isSubmitting}
        />
        <Input
          name="last_name"
          label="Last name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
          register={register}
          error={errors?.last_name?.message}
          disabled={isSubmitting}
        />
      </div>
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
        name="phone"
        label="Phone number"
        type="text"
        icon={<BsTelephone />}
        placeholder="+(xxx) xxx-xx-xx"
        register={register}
        error={errors?.phone?.message}
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
      <Input
        name="confirmPassword"
        label="Confirm password"
        type="text"
        icon={<FiLock />}
        placeholder="******"
        register={register}
        error={errors?.confirmPassword?.message}
        disabled={isSubmitting}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default RegisterForm;
