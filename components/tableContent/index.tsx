'use client'
import cx from 'clsx';
import { useState } from 'react';
import { Box, Text, Group, rem } from '@mantine/core';
import { IconListSearch } from '@tabler/icons-react';
import classes from './tableContent.module.css';
import { useRouter } from 'next/navigation';



type Props = {
  links: {
    label: string
    link: string,
    order: number
  }[]
}


export function TableOfContentsFloating({ links }: Props) {
  const [active, setActive] = useState(0);

  const router = useRouter()

  const items = links.map((item, index) => (
    <Box<'a'>
      component="a"
      href={item.link}

      onClick={(event) => {
        event.preventDefault();
        router.push(item.link)
        setActive(index);
        const targetElement = document.getElementById('introduction');
        targetElement?.scrollIntoView({
          behavior: 'smooth'
        });


      }}
      key={item.label}
      className={cx(classes.link, { [classes.linkActive]: active === index })}
      style={{ paddingLeft: `calc(${item.order} * var(--mantine-spacing-lg))`, paddingRight: '20px' }}
    >
      {item.label}
    </Box>
  ));

  return (
    <div className={classes.root}>
      <Group mb="md">
        <IconListSearch style={{ width: rem(18), height: rem(18) }} stroke={1.5} />
        <Text>Table of contents</Text>
      </Group>
      <div className={classes.links}>
        <div
          className={classes.indicator}
          style={{
            transform: `translateY(calc(${active} * var(--link-height) + var(--indicator-offset)))`,
          }}
        />
        {items}
      </div>
    </div>
  );
}