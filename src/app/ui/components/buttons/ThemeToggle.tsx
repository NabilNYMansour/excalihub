import cx from 'clsx';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group, Tooltip, ActionIconVariant } from '@mantine/core';
import classes from './ThemeToggle.module.css';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ThemeToggle({ size = "xl", toolTipPos, variant = "subtle", radius = "md", ...props }: {
  size?: "xs" | "sm" | "md" | "lg" | "xl", toolTipPos?: 'top' | 'right' | 'bottom' | 'left',
  variant?: ActionIconVariant,
  radius?: "xs" | "sm" | "md" | "lg" | "xl"
}) {
  // These are not hooks
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center" {...props}>
      <Tooltip
        withArrow
        position={toolTipPos}
        label="Toggle Theme">
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          size={size}
          variant={variant}
          radius={radius}
          aria-label="Toggle color scheme"
        >
          <LuSun className={cx(classes.icon, classes.light)} />
          <LuMoon className={cx(classes.icon, classes.dark)} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}