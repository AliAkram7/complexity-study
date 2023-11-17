'use client'
import { ComponentType, useEffect, useState } from 'react';
import { Container, Group, Flex, ActionIcon, Drawer, Modal, ScrollArea, Select } from '@mantine/core';
import { getHotkeyHandler, useDisclosure, useHotkeys } from '@mantine/hooks';
import classes from './nav.module.css';
import { IconBrandGithub, IconBrandTelegram, IconCode, TablerIconsProps } from '@tabler/icons-react';
import { SearchFelid } from '../searchFelid';
import { ToggleColorScheme } from '../colorSchemeToggle';
import { NavbarNested } from '../navMenu';
import { usePathname } from 'next/navigation';
import SearchOptions from '../selectOptions';


type Props = {
    mockdata: {
        label: string,
        icon: string,
        link: string
        links?: { label: string, link: string }[],
    }[] | undefined

    searchMetaData: {
        label: string;
        link: string
        description?: string,
        links?: { label: string; link: string, icon?: string }[]
    }[]
}



export function MainHeader({ searchMetaData, mockdata }: Props) {
    const [opened, { open, close }] = useDisclosure(false);

    const [modalOpened, { open: openModal, close: closeModal }] = useDisclosure(false);



    const [searchValue, SetSearchValue] = useState('')

    const pathname = usePathname()

    useEffect(() => {
        close()
    }, [pathname, close])



    const searchModal = <><Modal
        yOffset={'15dvh'}
        size={'lg'}
        withCloseButton={false}
        // centered
        opened={modalOpened}
        onClose={closeModal} 
        title="Search Article"
        scrollAreaComponent={ScrollArea.Autosize}
    >
        <SearchOptions closeModal={closeModal} mockData={searchMetaData} />


    </Modal></>

    const navDrawer = <Drawer opened={opened} onClose={close}>
        <>
            <NavbarNested mockdata={mockdata} />
        </>
    </Drawer>


    useHotkeys([
        ['/', openModal],

    ]);



    return (

        <>
            {searchModal}
            {navDrawer}
            <header className={classes.header}>
                <Container size={'xl'} className={classes.inner} >
                    <Flex w={'100%'} justify={'space-between'} align={'center'} >
                        <ActionIcon onClick={open} variant='transparent' >
                            <IconCode style={{ width: 50, height: 50 }} stroke={1.5} />
                        </ActionIcon>
                        <Flex justify={'space-between'} >
                            <Group justify="flex-end" align='center' >
                                <SearchFelid openModal={openModal} />
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