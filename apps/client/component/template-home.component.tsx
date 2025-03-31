'use client';
import { Container, Title, Text, Divider, Space } from '@mantine/core';
import ProjectOverview from './project-overview.component';
import { HealthCheckData } from '@shared/client';

export default function TemplateHomeComponent({ healthCheckData }: { healthCheckData: HealthCheckData }) {
  return (
    <Container size="lg" my="xl">
      <Text ta="center" c="dimmed" mt="sm" mb="md">
        System Health: {healthCheckData.status} and {healthCheckData.details.toString()}
      </Text>
      <Title order={1} ta="center" mt="md">
        🚀 NX Monorepo Project Overview
      </Title>
      <Text ta="center" c="dimmed" mt="sm" mb="md">
        A detailed breakdown of the project’s structure to guide developers.
      </Text>
      <Divider my="xl" />
      <ProjectOverview />
      <Space h="xl" />
    </Container>
  );
}
