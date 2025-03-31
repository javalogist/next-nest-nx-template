"use client";
import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <ActionIcon
      variant="filled"
      color={colorScheme === "dark" ? "yellow" : "blue"}
      onClick={() => toggleColorScheme()}
      size="lg"
      radius="xl"
      style={{
        transition: "transform 0.3s ease-in-out",
        transform: "rotate(0deg)",
        "&:hover": {
          transform: "scale(1.1) rotate(180deg)",
        },
      }}
    >
      {colorScheme === "dark" ? (
        <IconSun size="1.2rem" />
      ) : (
        <IconMoon size="1.2rem" />
      )}
    </ActionIcon>
  );
}
