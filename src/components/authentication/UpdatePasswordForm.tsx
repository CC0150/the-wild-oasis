import { useForm } from "react-hook-form";
import Button from "@/ui/Button";
import Form from "./form/Form";
import FormRow from "./form/FormRow";
import Input from "@/ui/Input";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { SignupFormData } from "./types";

const UpdatePasswordForm: React.FC = () => {
  const { register, handleSubmit, formState, getValues, reset } = useForm<{
    password: string;
    passwordConfirm: string;
  }>();
  const { errors } = formState;

  const { updateUserMutate, isUpdating } = useUpdateUser();

  const onSubmit = ({ password }: { password: string }) => {
    // 创建符合SignupFormData接口的对象
    const formData: Partial<SignupFormData> = {
      password,
    };

    updateUserMutate(formData as SignupFormData, {
      onSuccess: () => {
        reset();
      },
    });
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow
        label="New password (min 6 chars)"
        errors={errors}
        name="password"
      >
        <Input
          type="password"
          autoComplete="current-password"
          disabled={isUpdating}
          {...register("password", {
            required: "New password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters long",
            },
          })}
        />
      </FormRow>

      <FormRow label="Confirm password" errors={errors} name="passwordConfirm">
        <Input
          type="password"
          autoComplete="new-password"
          disabled={isUpdating}
          {...register("passwordConfirm", {
            required: "Confirm password is required",
            validate: (value) =>
              getValues().password === value || "Passwords must match",
          })}
        />
      </FormRow>
      <FormRow>
        <Button onClick={() => reset()} type="reset" $variation="secondary">
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update password</Button>
      </FormRow>
    </Form>
  );
};

export default UpdatePasswordForm;
