'use client'
import { useState } from 'react';
import { Container, Group, Burger, Box, Image, Flex, ActionIcon, Drawer } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import classes from './nav.module.css';
import { IconBrandGithub, IconBrandTelegram, IconCode } from '@tabler/icons-react';
import { SearchField } from '../searchFeild';
import { ToggleColorScheme } from '../colorSchemeToggle';
import { NavbarNested } from '../navMenu';


const userLinks = [
    { link: '#', label: 'Privacy & Security' },
    { link: '#', label: 'Account settings' },
    { link: '#', label: 'Support options' },
];

const mainLinks = [
    { link: '#', label: 'Book a demo' },
    { link: '#', label: 'Documentation' },
    { link: '#', label: 'Community' },
    { link: '#', label: 'Academy' },
    { link: '#', label: 'Forums' },
];

export function MainHeader() {
    const [opened, { toggle }] = useDisclosure(false);
    const [active, setActive] = useState(0);


    const navDrawer = <Drawer opened={opened} onClose={toggle}>
        <>
            <NavbarNested />
        </>
    </Drawer>

    return (

        <>
            {navDrawer}
            <header className={classes.header}>
                <Container size={'xl'} className={classes.inner} >
                    <Flex w={'100%'} justify={'space-between'} align={'center'} >
                        <ActionIcon onClick={toggle} variant='transparent' >
                            <IconCode style={{ width: 50, height: 50 }} stroke={1.5} />
                        </ActionIcon>
                        <Flex justify={'space-between'} >
                            <Group justify="flex-end" align='center' >
                                <SearchField />
                                <ToggleColorScheme />
                                <ActionIcon size="lg" color="gray" variant="subtle">
                                    <IconBrandGithub style={{ width: 50, height: 50 }} stroke={1.5} />
                                </ActionIcon>
                                <ActionIcon size="lg" color="gray" variant="subtle">
                                    <IconBrandTelegram style={{ width: 50, height: 50 }} stroke={1.5} />
                                </ActionIcon>
                            </Group>
                        </Flex>
                    </Flex>
                    {/* <Burger
                    opened={opened}
                    onClick={toggle}
                    className={classes.burger}
                    size="sm"
                    hiddenFrom="sm"
                /> */}
                </Container>
            </header>
        </>
    );
}