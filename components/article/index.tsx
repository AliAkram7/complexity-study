'use client'
import { Divider, Flex, Grid, SimpleGrid, TypographyStylesProvider, rem } from '@mantine/core';
import { HeaderArticle } from '../articleHeader';
import { TableOfContentsFloating } from '../tableContent';
import { CodeSpace } from '../codeSpace';
import { constants } from 'buffer';
import { nanoid } from 'nanoid';

type Props = {
  paragraph: string

  title: string
  description?: string
  list?: {
    title: string,
    description: string
  }[]
  content_table: { label: string, link: string, order: number }[]

}






export function Article({ title, description, list,content_table, paragraph }: Props) {

  const pieces = extractCodeBlocksAndText(paragraph);

  // Render the pieces with CodeSpace components.
  const content = pieces.map((piece, index) => {
    if (piece.type === 'text') {
      return (
        <div key={nanoid()}  >
          <TypographyStylesProvider style={{padding : '15px 10px'}} >
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
      <div style={{ padding: '10px' }}>
        <HeaderArticle title={title} description={description} list={list} />

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
          <TableOfContentsFloating links={content_table} />
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