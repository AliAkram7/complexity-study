'use client'
import { ActionIcon, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { IconSun, IconMoon } from '@tabler/icons-react';
import cx from 'clsx';
import classes from './colorSchemeToggle.module.css';

export function ToggleColorScheme() {
    const { setColorScheme, colorScheme } = useMantineColorScheme();


    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    return (
        <ActionIcon
            size="lg" color="gray" variant="subtle"
            onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
            aria-label="Toggle color scheme"
        >
            <IconSun className={cx(classes.icon, classes.light)} style={{ width: 50, height: 50 }} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} style={{ width: 50, height: 50 }} stroke={1.5} />
        </ActionIcon>
    );
}