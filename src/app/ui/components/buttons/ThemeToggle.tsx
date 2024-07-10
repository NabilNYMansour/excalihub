import cx from 'clsx';
import { ActionIcon, useMantineColorScheme, useComputedColorScheme, Group, Tooltip, Text } from '@mantine/core';
import classes from './ThemeToggle.module.css';
import { LuMoon, LuSun } from 'react-icons/lu';

export function ThemeToggle({ ...props }) {
  // These are not hooks
  const { setColorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Group justify="center" {...props}>
      <Tooltip
        withArrow
        color='main-dark.9'
        openDelay={750}
        label={<Text fz="xs" lh="md">Toggle Theme</Text>}>
        <ActionIcon
          onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
          variant='subtle'
          size="xl"
          aria-label="Toggle color scheme"
        >
          <LuSun className={cx(classes.icon, classes.light)} />
          <LuMoon className={cx(classes.icon, classes.dark)} />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
}