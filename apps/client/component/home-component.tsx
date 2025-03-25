'use client';
import {
  Container,
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Box
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { loginSchema } from '../schema/auth-validation.schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { clientApi } from '../config/axios-client.config';
import { ApiEndpoints } from '../util/api-endpoints';
import { ApiResponse } from '@shared/server';
import { useRouter } from 'next/navigation';
import ThemeToggleButton from '../theme/theme-toggle';

export const HomeComponent = () => {

  const router = useRouter();

  // ✅ Setup form with react-hook-form and yup
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(loginSchema)
  });

  // ✅ Handle form submission (for now, just log the data)
  const onSubmit = async (data: any) => {
    try {
      const res = await clientApi.post<ApiResponse<string>>(
        ApiEndpoints.login,
        data
      );
      if (res.success) {
        const sessionRes = await clientApi.post<string>(ApiEndpoints.session, { token: res.data });
        router.push('/swagger');
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          padding: '0.5rem'
        }}
      >
        <ThemeToggleButton />
      </Box>
      <Container maxWidth="sm" sx={{ marginTop: '5rem', position: 'relative' }}>
        {/* ✅ Toggle Button Positioned Absolutely */}


        <Paper
          elevation={4}
          sx={{
            padding: '2rem',
            textAlign: 'center',
            backgroundColor: 'background.paper'
          }}
        >
          <Typography variant="h4" color="primary" gutterBottom>
            Welcome Back!
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Please login to your account to continue.
          </Typography>

          {/* ✅ Login Form */}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack spacing={3}>
              <TextField
                label="Email"
                type="email"
                variant="outlined"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                fullWidth
              >
                Login
              </Button>
            </Stack>
          </form>

          {/* ✅ Signup Button */}
          <Box sx={{ marginTop: '1rem' }}>
            <Typography variant="body2" color="text.secondary">
              Don’t have an account?
            </Typography>
            <Button variant="outlined" color="secondary" size="large" fullWidth>
              Signup
            </Button>
          </Box>
        </Paper>

        {/* ✅ Footer */}
        <Box sx={{ marginTop: '3rem', textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © 2025 John Doe. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </>
  );

};
