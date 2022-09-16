import { useForm } from "react-hook-form";
import { object, string, TypeOf } from "zod";
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

interface RegisterProps { }
const registerSchema = object({
  name: string().min(1, 'Full name is required').max(100),
  email: string()
    .min(1, 'Email address is required')
    .email('Email Address is invalid'),
  password: string()
    .min(1, 'Password is required')
    .min(8, 'Password must be more than 8 characters')
    .max(32, 'Password must be less than 32 characters'),
  passwordConfirm: string().min(1, 'Please confirm your password'),
}).refine((data) => data.password === data.passwordConfirm, {
  path: ['passwordConfirm'],
  message: 'Passwords do not match',
});

export type RegisterInput = TypeOf<typeof registerSchema>;

const Register: React.FC<RegisterProps> = ({ }) => {
  const methods = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  });
    // 👇 Calling the Register Mutation
    // const [registerUser, { isLoading, isSuccess, error, isError }] =
    // useRegisterUserMutation();
  const navigate = useNavigate();
  const {
    reset,
    handleSubmit,
    formState: { isSubmitSuccessful },
  } = methods;


  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSubmitSuccessful]);
  return <div>register</div>;
};
export default Register;
