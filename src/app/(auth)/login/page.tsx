'use client';
import { useForm, zodResolver } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import {
  TextInput,
  PasswordInput,
  Text,
  Button,
  Anchor,
  Flex,
} from '@mantine/core';
import Logo1 from '@/assets/icons/logo1.svg';
import Logo2 from '@/assets/icons/logo11.svg';
import { QUERIES, ROUTES } from '@/utils/constants';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginSchema } from '@/utils/schemas/auth';
import { logIn } from '@/api/auth';

type FormValues = {
  username: string;
  password: string;
};

const AdminLogin = () => {
  const queryClient = useQueryClient();
  const { getInputProps, onSubmit, reset } = useForm<FormValues>({
    mode: 'uncontrolled',
    validate: zodResolver(loginSchema),
    initialValues: {
      username: 'jojitoon@gmail.com',
      password: 'Password@1',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: logIn,
    onSuccess: () => {
      notifications.show({
        title: 'Success',
        message: 'Login Successful',
        color: 'green',
      });
      queryClient.invalidateQueries({
        queryKey: [QUERIES.ME],
      });
      reset();
      router.push(ROUTES.home);
    },
    onError: (error) => {
      notifications.show({
        title: 'Error',
        message: 'Login Failed',
        color: 'red',
      });
      console.log(error);
    },
  });

  const handleSubmit = (values: FormValues) => {
    mutate(values);
  };
  const router = useRouter();

  return (
    <Flex direction='column'>
      <Flex mx='30px' align='flex-start'>
        <Flex
          align='center'
          justify='center'
          style={{
            cursor: 'pointer',
          }}
          mb='40px'
        >
          <Flex style={{ zIndex: 99 }}>
            <Logo1 />
          </Flex>
          <Flex ml='-25px'>
            <Logo2 />
          </Flex>
        </Flex>
      </Flex>
      <Flex flex='1' justify='center'>
        <Flex
          direction='column'
          w={{
            base: '100%',
            md: '450px',
          }}
          my={40}
        >
          <Flex direction='column' mt='70px'>
            <Text fz='40px' fw={700} c='color.8'>
              Login
            </Text>
            <Text fz='20px' fw={500} c='color.23' mb='20px'>
              Hi! Welcome back
            </Text>
          </Flex>
          <Flex direction='column'>
            <TextInput
              required
              size='lg'
              label='Email'
              placeholder='youremail@mail.com'
              radius='xl'
              key='username'
              autoComplete='new-email'
              {...getInputProps('username')}
            />
            <PasswordInput
              required
              mt='20px'
              radius='xl'
              size='lg'
              label='Password'
              placeholder='*********'
              key='password'
              autoComplete='new-password'
              {...getInputProps('password')}
            />
            <Anchor
              component='button'
              fz='14px'
              mt='5px'
              c='color.1'
              style={{ textAlign: 'right' }}
            >
              Forgot password?
            </Anchor>
          </Flex>

          <Button
            fullWidth
            color='color.1'
            size='lg'
            mt='lg'
            type='submit'
            radius='xl'
            fz='16px'
            loading={isPending}
            onClick={() => onSubmit(handleSubmit)()}
          >
            Sign In
          </Button>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AdminLogin;
