'use client';
import { Box, Container, Group, Button, Text } from '@mantine/core';
import Link from 'next/link';
import { ThemeToggle } from '../mantine-theme';

export const  AppHeader =() => {
  return (
    <Box
      component="header"
      bg="var(--mantine-color-body)" // Inherits background from theme
      p="md"
      style={{
        borderBottom: '1px solid var(--mantine-color-gray-4)', // Dynamic border based on theme
      }}
    >
      <Container size="lg">
        <Group p="apart">
          {/* Logo / Title */}
          <Text size="lg" fw={700} c="blue.6">
            🚀 NX Full Stack Template
          </Text>

          {/* Action Items */}
          <Group>
            <Link href="/login" passHref>
              <Button variant="subtle" size="sm">
                Login
              </Button>
            </Link>
            <Link href="/api-docs" passHref>
              <Button variant="subtle" size="sm">
                Swagger
              </Button>
            </Link>
            <Link href="/architecture" passHref>
              <Button variant="subtle" size="sm">
                Architecture
              </Button>
            </Link>
            <Link href="/communication" passHref>
              <Button variant="subtle" size="sm">
                Communication
              </Button>
            </Link>
            {/* ✅ Theme Toggle - Positioned to the right */}
            <ThemeToggle />
          </Group>
        </Group>
      </Container>
    </Box>
  );
}
