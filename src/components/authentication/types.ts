export interface LoginProps {
  email: string;
  password: string;
}

export interface SignupFormData {
  fullName: string;
  email: string;
  password: string;
  passwordConfirm?: string;
  avatar?: string | FileList;
}
