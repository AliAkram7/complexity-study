'use client'

import { Combobox, Flex, InputBase, ScrollArea, useCombobox } from '@mantine/core';
import { IconHash, IconNews, TablerIconsProps } from '@tabler/icons-react';
import React, { ComponentType, useState } from 'react'
import { LinksGroup } from '../linksGroup';


type Mockdata = {
    label: string;
    link: string
    description?: string,
    links?: { label: string; link: string, icon?: string }[]
}[];


type Props = {

    mockData: Mockdata
    closeModal: () => void
}


export default function SearchOptions({ closeModal, mockData }: Props) {

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });


    const [value, setValue] = useState<string | null>(null);
    const [search, setSearch] = useState('');



    const shouldFilterOptions = mockData.every((item) => item.label !== search);

    

    const filteredOptions = shouldFilterOptions
        ? mockData.filter((item) => {
            return (
                item.label.toLowerCase().includes(search.toLowerCase().trim()) ||
                item.description?.toLowerCase().includes(search.toLowerCase().trim()) ||
                (item.links && item.links.some(subItem => subItem.label.toLowerCase().includes(search.toLowerCase().trim())))
            );
        })
        : mockData;


    const options = filteredOptions.map((item) => (
        <Combobox.Option value={item.label} key={item.label}>

            <LinksGroup icon={IconNews} label={item.label} link={item.link} links={item.links} />

        </Combobox.Option>
    ));


    return (
        <>
            <Combobox
                store={combobox}
                onOptionSubmit={(val) => {
                    setValue(val);
                    setSearch(val);
                    combobox.closeDropdown();
                    closeModal()

                }}
            >
                <Combobox.Target>
                    <InputBase
                        rightSection={<Combobox.Chevron />}
                        onClick={() => { combobox.openDropdown() }}
                        onFocus={() => combobox.openDropdown()}
                        onBlur={() => {
                            combobox.closeDropdown();
                            setSearch(value || '');
                            // closeModal()
                        }}

                        placeholder="Search value"
                        value={search}
                        onChange={(event) => {
                            combobox.updateSelectedOptionIndex();
                            setSearch(event.currentTarget.value);
                        }}
                    />
                </Combobox.Target>

                <Combobox.Dropdown>
                    <Combobox.Options>

                        {options.length > 0 ?
                            <ScrollArea h={'300px'}
                                scrollbarSize={'xs'}
                            >
                                {options}
                            </ScrollArea>
                            : <Combobox.Empty>Nothing found</Combobox.Empty>}

                    </Combobox.Options>
                </Combobox.Dropdown>
            </Combobox>        </>
    );

}
