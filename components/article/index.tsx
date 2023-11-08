'use client'
import { Divider, Flex, Grid, SimpleGrid, TypographyStylesProvider, rem } from '@mantine/core';
import { HeaderArticle } from '../articleHeader';
import { TableOfContentsFloating } from '../tableContent';
import { CodeSpace } from '../codeSpace';
import { constants } from 'buffer';

type Props = {
  paragraph: string
}


const testcode = `
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
}`

export function Article({ paragraph }: Props) {

  const pieces = extractCodeBlocksAndText(paragraph);

  // Render the pieces with CodeSpace components.
  const content = pieces.map((piece, index) => {
    if (piece.type === 'text') {
      return (
        <div key={index}>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: piece.content }} />
          </TypographyStylesProvider>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <CodeSpace code={piece.content} lang="tsx" />
        </div>
      );
    }
  });

  return (
    <>
      <div style={{ padding: '40px' }}>
        <HeaderArticle title='insertion sort' description={`first sort will be Selection Sort a simple sorting method ,it repeatedly finds the minimum (or maximum) element
    ,the found element is swapped with the first unsorted element (data) and process will continues until the array is sorted. Selection sort has a time complexity of O(n^2).
`} list={[{ title: 'Insertion', description: 'description example' }]} />

        <Divider />
      </div>

      <Grid
        justify="space-between"

        // align="stretch"
        // grow
        columns={12}
      >
        <Grid.Col
          order={{ base: 1, lg: 2 }}
          span={{ base: 12, sm: 12, lg: 3 }}
          style={{
            padding: '10px 30px',

          }}


        >
          <TableOfContentsFloating />
        </Grid.Col>

        <Grid.Col
          order={{ base: 2, lg: 1 }}
          span={{ base: 12, sm: 12, lg: 9 }}
        >
          <div style={{
            padding: '0 30px',
           
          }} >
            {content}
          </div>
        </Grid.Col>




      </Grid  >

    </>
  );
}




function extractCodeBlocksAndText(paragraph: string) {
  const blocksAndText = paragraph.split('```');
  const result = [];
  for (let i = 0; i < blocksAndText.length; i++) {
    if (i % 2 === 0) {
      // Text piece
      result.push({ type: 'text', content: blocksAndText[i] });
    } else {
      // Code block
      result.push({ type: 'code', content: blocksAndText[i] });
    }
  }
  return result;
}