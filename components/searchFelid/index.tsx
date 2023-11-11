import { TextInput, TextInputProps, ActionIcon, useMantineTheme, rem, Badge, Kbd } from '@mantine/core';
import { IconSearch, IconArrowRight } from '@tabler/icons-react';

import classes from './searchField.module.css'
import { getHotkeyHandler, useHotkeys } from '@mantine/hooks';


type Props = {
    openModal: () => void
}

export function SearchFelid({ openModal}: Props) {
    const theme = useMantineTheme();

    return (
        <>
            <TextInput
                className={classes.searchField}
                radius="xl"
                size="md"
                display={'false'}
                placeholder="Search Article"
                rightSectionWidth={42}
                leftSection={<IconSearch  onClick={openModal}  style={{ width: rem(18), height: rem(18) }} stroke={1.5} />}
                value=''
                onChange={openModal}
                onClick={openModal}
                rightSection={
                    <>
                        <Kbd  onClick={openModal} variant='light'>/</Kbd>
                        {/* <ActionIcon size={32} radius="xl" color={theme.primaryColor} variant="filled">
                            <IconArrowRight style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
                        </ActionIcon> */}
                    </>
                }
            
            />
            <div className={classes.searchIcon}   >
                <ActionIcon size="lg" onClick={openModal} radius={'xl'} variant="filled">
                    <IconSearch style={{ width: 20, height: 20 }} />
                </ActionIcon>
            </div>

        </>
    );
}