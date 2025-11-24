import supabase from "@/services/supabase";
import { LoginProps, SignupFormData } from "@/components/authentication/types";
import { supabaseUrl } from "@/services/supabase";

export const signUp = async (formData: SignupFormData) => {
  const { email, password, fullName } = formData;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const login = async ({ email, password }: LoginProps) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

export const getCurrentUser = async () => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("User not logged in");
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(error.message);
  }

  return data.user;
};

export const logout = async () => {
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
};

export const updateUser = async (formData: SignupFormData) => {
  const { password, fullName, avatar } = formData;

  //1.更新密码或名字
  let updateData;
  if (password) {
    updateData = {
      password,
    };
  }
  if (fullName) {
    updateData = {
      data: {
        fullName,
      },
    };
  }
  const { data, error } = await supabase.auth.updateUser(updateData || {});
  if (error) {
    throw new Error(error.message);
  }
  if (!avatar) {
    return data;
  }
  //2.加载头像
  const fileName = `avatar-${data.user.id}-${Math.random()
    .toString(36)
    .substring(2, 10)}`;

  const { error: uploadError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar[0]);

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  //3.更新头像
  const { data: updateUser, error: updateUserError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });
  if (updateUserError) {
    throw new Error(updateUserError.message);
  }
  return updateUser;
};
