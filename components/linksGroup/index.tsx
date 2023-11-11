'use client'
import { ComponentType, useCallback, useState } from 'react';
import { Group, Box, Collapse, ThemeIcon, Text, UnstyledButton, rem } from '@mantine/core';
import { IconChevronRight, IconHash } from '@tabler/icons-react';
import classes from './linksGroup.module.css';
import { TablerIconsProps } from '@tabler/icons-react';
import Link from 'next/link';

interface LinksGroupProps {
  icon: ComponentType<TablerIconsProps>;
  label: string;
  link: string
  links?: { label: string; link: string, icon?: string }[];
}

export function LinksGroup({ icon: Icon, label, link, links }: LinksGroupProps) {
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(true);


  const items = (hasLinks ? links : []).map((link) => (
    <Text
      component={Link}
      className={classes.linkLabel}
      href={link.link}
      key={link.label}

    >
      <Box style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-start' }}>
        {link.icon ?

          <ThemeIcon variant="transparent" size={18}>
            <IconHash style={{ width: 20, height: 20 }} />
          </ThemeIcon>

          : null}
        {link.label}
      </Box >
    </Text>
  ));

  const handleOpenCategory = useCallback(() => {
    // e.preventDefault()
    // setOpened((o) => !o)
    // router.push(link)
  }, [])

  return (
    <>
      <UnstyledButton component={Link} href={link} onClick={handleOpenCategory} className={classes.control}>
        <Group justify="space-between" gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center', gap: '5px', justifyContent: 'flex-start' }}>
            <ThemeIcon variant="transparent" size={18}>
              <Icon style={{ width: 18, height: 18 }} />
            </ThemeIcon>
            <Box>{label}</Box>
          </Box>

          {/* {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )} */}
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