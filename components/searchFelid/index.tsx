import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

import classes from './searchField.module.css'
export function SearchFelid(props: TextInputProps) {
    const theme = useMantineTheme();



    return (
        <>
            <TextInput
                className={classes.searchField}
                radius="xl"
                size="md"
                display={'false'}
                placeholder="Search questions"
                rightSectionWidth={42}
                leftSection={<IconSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                rightSection={
                    <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                        <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                    </ActionIcon>
                }
                {...props}
            />
            <div className={classes.searchIcon}>
            <ActionIcon  size="lg" radius={'xl'} variant="filled">
                <IconSearch  style={{ width: 20, height: 20 }}  />
            </ActionIcon>
            </div>

        </>
    );
}