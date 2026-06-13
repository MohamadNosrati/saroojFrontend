"use client";

import { Switch } from "@heroui/switch";
import { useEffect, useState } from "react";

import { MoonIcon, SunIcon } from "@/components/icons";

enum themesEnum {
  dark = "dark",
  light = "light",
}

export default function ToggleTheme() {
  const [theme, setTheme] = useState<themesEnum>(themesEnum.dark);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemPrefersDark = window.matchMedia(
      `(prefers-color-scheme: ${themesEnum.dark})`,
    ).matches;

    const initialTheme =
      savedTheme || (systemPrefersDark ? themesEnum.dark : themesEnum.light);

    setTheme(initialTheme as themesEnum);
    document.documentElement.classList.toggle(
      themesEnum.dark,
      initialTheme === themesEnum.dark,
    );
  }, []);

  const toggleTheme = () => {
    const newTheme =
      theme === themesEnum.dark ? themesEnum.light : themesEnum.dark;

    setTheme(newTheme);
    document.documentElement.classList.toggle(
      themesEnum.dark,
      newTheme === themesEnum.dark,
    );
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Switch
      color="primary"
      endContent={<MoonIcon />}
      isSelected={theme === themesEnum.dark}
      size="lg"
      startContent={<SunIcon />}
      onValueChange={toggleTheme}
    />
  );
}
