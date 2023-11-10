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
        label: string,
        description: string
    }[]
}


export function HeaderArticle({ title, description, list }: Props) {


    const item = list?.map((item) => {
        return (

            <List.Item key={nanoid()}>
                <b>{item.label}</b> – {item.description}
            </List.Item>
        )
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
                <List
                    key={nanoid()}
                    mt={30}
                    spacing="sm"
                    size="sm"
                    icon={
                        <ThemeIcon size={25} radius="xl"  >
                            <IconCheck style={{ width: 20, height: 20 }} stroke={1.5} />
                        </ThemeIcon>
                    }
                >
                    {item}
                </List>
            </div>
        </div >
        // </Container>
    );
}