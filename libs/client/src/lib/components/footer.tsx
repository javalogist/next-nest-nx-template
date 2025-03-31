'use client';
import { Box, Container, Text, Divider } from '@mantine/core';

export const AppFooter = () => {
  return (
    <Box
      component="footer"
      bg="var(--mantine-color-body)" // Adapts to light/dark mode
      p="md"
      style={{
        borderTop: '1px solid var(--mantine-color-gray-4)',
      }}
    >
      <Divider my="sm" />
      <Container size="lg" style={{ textAlign: 'center' }}>
        <Text size="sm" c="dimmed">
          Made with ❤️ by <strong>Your Name</strong> | ©{' '}
          {new Date().getFullYear()} All rights reserved.
        </Text>
      </Container>
    </Box>
  );
};
