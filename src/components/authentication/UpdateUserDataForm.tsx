import { useState, useEffect } from "react";
import Button from "@/ui/Button";
import FileInput from "@/ui/FileInput";
import Form from "./form/Form";
import FormRow from "./form/FormRow";
import Input from "@/ui/Input";

import { useGetUser } from "./hooks/useGetUser";
import { useUpdateUser } from "./hooks/useUpdateUser";
import { SignupFormData } from "./types";

const UpdateUserDataForm: React.FC = () => {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user } = useGetUser();

  const [fullName, setFullName] = useState<string>("");
  const [avatar, setAvatar] = useState<FileList | null>(null);
  const { updateUserMutate, isUpdating } = useUpdateUser();

  useEffect(() => {
    if (user) {
      const {
        user_metadata: { fullName: currentFullName },
      } = user;

      setFullName(currentFullName || "");
    }
  }, [user]);

  if (!user) return null;
  const { email } = user;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!fullName) return;

    // 创建符合SignupFormData类型的对象
    const formData: Partial<SignupFormData> = {
      fullName,
    };

    // 只有当avatar存在且有文件时才添加到formData中
    if (avatar && avatar.length > 0) {
      formData.avatar = avatar;
    }

    updateUserMutate(formData as SignupFormData, {
      onSuccess: () => {
        // 重置表单
        if (e.target instanceof HTMLFormElement) {
          e.target.reset();
        }
      },
    });
  };

  const handleCancel = () => {
    setFullName(user?.user_metadata?.fullName || "");
    setAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" name="email">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Username" name="fullName">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow label="Avatar image" name="avatar">
        <FileInput
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files)}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          $variation="secondary"
          onClick={handleCancel}
          disabled={isUpdating}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
};

export default UpdateUserDataForm;
