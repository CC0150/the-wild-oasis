import Button from "@/ui/Button";
import Form from "./form/Form";
import FormRow from "./form/FormRow";
import Input from "@/ui/Input";
import { useForm } from "react-hook-form";
import { SignupFormData } from "@/components/authentication/types";
import { useSignUp } from "@/components/authentication/hooks/useSignUp";
import SpinnerMini from "@/ui/SpinnerMini";

const SignupForm: React.FC = () => {
  const { signUpMutate, isPending: isSignUpPending } = useSignUp();
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<SignupFormData>({
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = ({ fullName, email, password }: SignupFormData) => {
    signUpMutate(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      }
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow name="fullName" label="Full name" errors={errors}>
        <Input
          type="text"
          {...register("fullName", { required: "Fullname is required" })}
          disabled={isSignUpPending}
        />
      </FormRow>

      <FormRow name="email" label="Email address" errors={errors}>
        <Input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Email is not valid",
            },
          })}
          disabled={isSignUpPending}
        />
      </FormRow>

      <FormRow
        name="password"
        label="Password (min 6 characters)"
        errors={errors}
      >
        <Input
          type="password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          disabled={isSignUpPending}
        />
      </FormRow>

      <FormRow name="passwordConfirm" label="Confirm password" errors={errors}>
        <Input
          type="password"
          {...register("passwordConfirm", {
            required: "Confirm password is required",
            validate: (value) =>
              value === getValues().password || "Passwords do not match",
          })}
          disabled={isSignUpPending}
        />
      </FormRow>

      <FormRow>
        <Button $variation="secondary" type="reset" disabled={isSignUpPending}>
          Cancel
        </Button>
        <Button disabled={isSignUpPending}>
          {isSignUpPending ? <SpinnerMini /> : "Create new user"}
        </Button>
      </FormRow>
    </Form>
  );
};

export default SignupForm;
