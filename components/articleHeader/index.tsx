'use client'
import { Container, Title, Text, List, ThemeIcon, rem } from '@mantine/core';
import { IconCheck } from '@tabler/icons-react';
// import image from './image.svg';
import classes from './articleHeader.module.css';
import { nanoid } from 'nanoid';


type Props = {
    title: string
    description?: string
    list?: {
        title: string,
        description: string
    }[]
}


export function HeaderArticle({ title, description, list }: Props) {


    const item = list?.map((item) => {
        return (
            <List   
                key={nanoid()}
                mt={30}
                spacing="sm"
                size="sm"
                icon={
                    <ThemeIcon size={20} radius="xl">
                        <IconCheck style={{ width: 30, height: 30 }} stroke={1.5} />
                    </ThemeIcon>
                }
            >
                <List.Item>
                    <b>{item.title}</b> – {item.description}
                </List.Item>
            </List>)
    })


    return (
        // <Container >
            <div className={classes.inner}>
                <div className={classes.content}>
                    <Title className={classes.title}>
                        {title}
                    </Title>
                    <Text c="dimmed" mt="md">
                        {description}
                    </Text>
                    {item}
                </div>
            </div>
        // </Container>
    );
}