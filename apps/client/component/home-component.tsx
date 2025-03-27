'use client';
import {
  Container,
  Paper,
  TextInput,
  Title,
  Text,
  Button,
  Stack,
  Box,
  Grid,
  Checkbox,
  Group,
  Divider
} from '@mantine/core';
import { useForm } from 'react-hook-form';
import { loginSchema, signupSchema } from '../schema/auth-validation.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { clientApi } from '../config/axios-client.config';
import { ApiEndpoints } from '../util/api-endpoints';
import { ApiResponse } from '@shared/server';
import { useRouter } from 'next/navigation';
import { notify, ThemeToggle } from '@shared/client';

export const HomeComponent = () => {
  const router = useRouter();

  // ✅ Setup login form
  const {
    register: registerLogin,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  // ✅ Setup signup form
  const {
    register: registerSignup,
    handleSubmit: handleSignupSubmit,
    formState: { errors: signupErrors }
  } = useForm({
    resolver: yupResolver(signupSchema)
  });

  // ✅ Handle login submission
  const onLoginSubmit = async (data: any) => {
    try {
      notify({
        id: 'login',
        title: 'Authenticating...',
        message: 'Please wait while we log you in',
        type: 'loading'
      });
      const res = await clientApi.post<ApiResponse<string>>(
        ApiEndpoints.login,
        data
      );
      if (res.success) {
        await clientApi.post<string>(ApiEndpoints.session, {
          token: res.data
        });
        router.push('/swagger');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // ✅ Handle signup submission
  const onSignupSubmit = async (data: any) => {
    try {
      const res = await clientApi.post<ApiResponse<string>>(
        ApiEndpoints.register,
        data
      );
      if (res.success) {
        alert('Signup successful! Please log in.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {/* ✅ Theme Toggle Positioned Absolutely */}
      <Box
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '0.5rem'
        }}
      >
        <ThemeToggle />
      </Box>

      <Container size="lg" style={{ marginTop: '5rem', position: 'relative' }}>
        <Title order={2} ta="center" mb="xl" c="blue">
          Welcome Back or Join Us!
        </Title>

        <Grid gutter="xl">
          {/* ✅ Login Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="xl" p="xl" radius="md" withBorder>
              <Title order={3} mb="md" ta="center">
                Login
              </Title>
              <form onSubmit={handleLoginSubmit(onLoginSubmit)} noValidate>
                <Stack gap="md">
                  <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...registerLogin('email')}
                    error={loginErrors.email?.message}
                    withAsterisk
                  />
                  <TextInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...registerLogin('password')}
                    error={loginErrors.password?.message}
                    withAsterisk
                  />
                  <Button type="submit" color="blue" fullWidth size="md" mt="md">
                    Login
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>

          {/* ✅ Signup Section */}
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Paper shadow="xl" p="xl" radius="md" withBorder>
              <Title order={3} mb="md" ta="center">
                Signup
              </Title>
              <form onSubmit={handleSignupSubmit(onSignupSubmit)} noValidate>
                <Stack gap="md">
                  <TextInput
                    label="Name"
                    placeholder="Enter your name"
                    {...registerSignup('name')}
                    error={signupErrors.name?.message}
                    withAsterisk
                  />
                  <TextInput
                    label="Email"
                    type="email"
                    placeholder="Enter your email"
                    {...registerSignup('email')}
                    error={signupErrors.email?.message}
                    withAsterisk
                  />
                  <TextInput
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...registerSignup('password')}
                    error={signupErrors.password?.message}
                    withAsterisk
                  />
                  <TextInput
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm your password"
                    {...registerSignup('confirmPassword')}
                    error={signupErrors.confirmPassword?.message}
                    withAsterisk
                  />
                  {/* ✅ Role Selection */}
                  <Group mt="xs">
                    <Text size="sm" fw={500}>
                      Select Roles:
                    </Text>
                    <Checkbox
                      label="Super-Admin"
                      {...registerSignup('roles.superAdmin')}
                    />
                    <Checkbox
                      label="Admin"
                      {...registerSignup('roles.admin')}
                    />
                    <Checkbox
                      label="User"
                      {...registerSignup('roles.user')}
                    />
                  </Group>

                  <Button type="submit" color="teal" fullWidth size="md" mt="md">
                    Signup
                  </Button>
                </Stack>
              </form>
            </Paper>
          </Grid.Col>
        </Grid>

        {/* ✅ Footer Section */}
        <Box mt="xl" style={{ textAlign: 'center' }}>
          <Divider my="lg" />
          <Text size="sm" c="dimmed" ta="center">
            © 2025 John Doe. All rights reserved.
          </Text>
        </Box>
      </Container>
    </>
  );
};
