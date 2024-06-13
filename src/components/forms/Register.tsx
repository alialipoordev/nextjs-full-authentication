import * as React from "react";
import Input from "../inputs/Input";
import { CiUser } from "react-icons/ci";

interface IRegisterFormProps {}

const RegisterForm: React.FunctionComponent<IRegisterFormProps> = (props) => {
  return (
    <form className="my-8 text-sm">
      <div className="gap-2 md:flex">
        <Input
          name="first_name"
          label="First name"
          type="text"
          icon={<CiUser />}
          placeholder="example"
        />
      </div>
    </form>
  );
};

export default RegisterForm;
