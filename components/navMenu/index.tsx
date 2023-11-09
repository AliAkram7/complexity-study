'use client'
import { LoadingOverlay, ScrollArea } from '@mantine/core';
import {
    TablerIconsProps,
    IconNews,
} from '@tabler/icons-react';
import classes from './navMenu.module.css';
import { LinksGroup } from '../linksGroup';



import dynamic from 'next/dynamic';
import React, { ComponentType } from 'react';
import { nanoid } from 'nanoid';

const iconMap: { [key: string]: ComponentType<TablerIconsProps> } = {
    IconGauge: dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconGauge)),
    IconPresentationAnalytics: dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconPresentationAnalytics)),
    IconFileAnalytics: dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconFileAnalytics)),
    IconAdjustments: dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconAdjustments)),
    IconArrowsSort: dynamic(() => import('@tabler/icons-react').then((mod) => mod.IconArrowsSort)),
};








type Props = {
    mockdata: {
        label: string,
        icon: string,
        link: string
        links?: { label: string, link: string }[],
    }[] | undefined
}



export function NavbarNested({ mockdata }: Props) {



    const transformedData = mockdata?.map((item) => {
        if (typeof iconMap[item.icon] == 'function') {
            const IconComponent = iconMap[item.icon];
            return { ...item, icon: IconComponent };
        }
        else {
            return { ...item, icon: IconNews };
        }

    })


    const links = transformedData?.map((item) => <LinksGroup {...item} key={nanoid()} />);

    const loading = <LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} loaderProps={{ type: 'bars' }} />

    return (
        <nav className={classes.navbar} >
            <ScrollArea className={classes.links}>
                {
                    links ?
                        <div className={classes.linksInner}>{links}</div>
                        : loading
                }

            </ScrollArea>
        </nav>
    );
}