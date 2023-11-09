'use client'
import { ComponentType, useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import {  IconChevronRight } from '@tabler/icons-react';
import classes from './linksGroup.module.css';
import { TablerIconsProps } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface LinksGroupProps {
  icon: ComponentType<TablerIconsProps>;
  label: string;
  link: string
  initiallyOpened?: boolean;
  links?: { label: string; link: string }[];
}

export function LinksGroup({ icon: Icon, label, link, initiallyOpened, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component="a"
      className={classes.linkLabel}
      href={link.link}
      key={link.label}
      onClick={(event) => {event.preventDefault()
        router.push(link.link)
      }
      }
    >
      {link.label}
    </Text>
  ));

  const router = useRouter()
  const handleOpenCategory = () => {
    setOpened((o) => !o)
    router.push(link)


  }

  return (
    <>
      <UnstyledButton onClick={handleOpenCategory} className={classes.control}>
        <Group justify="space-between" gap={0}>

          <Box  style={{ display: 'flex', alignItems: 'center',gap:'5px', justifyContent:'flex-start' }}>
            <ThemeIcon variant="transparent" size={18}>
              <Icon style={{ width: 18, height: 18 }} />
            </ThemeIcon>
            <Box>{label}</Box>
          </Box>


          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened} ml="md" >{items}</Collapse> : null}
    </>
  );
}

// const mockdata = {
//   label: 'Releases',
//   icon: IconCalendarStats,
//   links: [
//     { label: 'Upcoming releases', link: '/' },
//     { label: 'Previous releases', link: '/' },
//     { label: 'Releases schedule', link: '/' },
//   ],
// };

// export function NavbarLinksGroup() {
//   return (
//     <Box mih={220} p="md">
//       <LinksGroup {...mockdata} />
//     </Box>
//   );
// }