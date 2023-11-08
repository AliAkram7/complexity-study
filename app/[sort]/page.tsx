import React from 'react'
import { Article } from '../../components/article'


const p = `
<h1>
Example article
</h1>
This is example article from <a target="_blank" href="/hello">CSS-Tricks website</a> written by <a target="_blank" href="/hello">Sarah Drasner.</a> It is used as an example to showcase real world styles of TypographyStylesProvider component, please read full article on <a target="_blank" href="/hello">CSS-Tricks website.</a>
\`\`\`
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
\`\`\`
<h1>
Example article
</h1>
This is example article from <a target="_blank" href="/hello">CSS-Tricks website</a> written by <a target="_blank" href="/hello">Sarah Drasner.</a> It is used as an example to showcase real world styles of TypographyStylesProvider component, please read full article on <a target="_blank" href="/hello">CSS-Tricks website.</a>
\`\`\`
import { CodeHighlightTabs } from '@mantine/code-highlight';
import { Group, Button, MantineProvider, createTheme } from '@mantine/core';
import classes from './Demo.module.css';

const theme = createTheme({
  components: {
    Button: Button.extend({
      classNames: classes,
    }),
  },
});

function Demo() {
  return (
    <MantineProvider theme={theme}>
      <Group>
        <Button variant="danger">Danger variant</Button>
        <Button variant="primary">Primary variant</Button>
      </Group>
    </MantineProvider>
  );
}
\`\`\`

`


export default function Sort({ params }: { params: { sort: string } }) {
        return (

                <>

                        <div style={{ minHeight: '100%', width: '100%' }}  >
                                <Article paragraph={p} />
                        </div>
                </>

        )
}

