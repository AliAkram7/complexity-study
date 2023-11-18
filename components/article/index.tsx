'use client'
import { Divider, Flex, Grid, SimpleGrid, TypographyStylesProvider, rem, useMantineTheme } from '@mantine/core';
import { HeaderArticle } from '../articleHeader';
import { TableOfContentsFloating } from '../tableContent';
import { CodeSpace } from '../codeSpace';
import { nanoid } from 'nanoid';

import classes from './article.module.css'

type Props = {
  paragraph: string

  title: string
  author: string
  description?: string
  list?: {
    label: string,
    description: string
  }[]
  content_table: { label: string, link: string, order: number }[]

}



export function Article({ title, author, description, list, content_table, paragraph }: Props) {

  const theme = useMantineTheme()



  const pieces = extractCodeBlocksAndText(paragraph);


  // Render the pieces with CodeSpace components.
  const content = pieces.map((piece, index) => {
    if (piece.type === 'text') {
      return (
        <div key={nanoid()}  >
          <TypographyStylesProvider style={{ padding: '15px 10px' }} >
            <div dangerouslySetInnerHTML={{ __html: piece.content }} />
          </TypographyStylesProvider>
        </div>
      );
    } else {
      return (
        <div key={index}>
          <CodeSpace code={piece.content} lang={piece.lang} />
        </div>
      );
    }
  });

  return (
    <>
      <div style={{ padding: '10px 20px' }}>
        <HeaderArticle author={author} title={title} description={description} list={list} />
        <Divider />
      </div>

      <Flex className={classes.ArticleAndContentTableContainerFlex} >

        <div className={classes.articleContent}>
          {content}
        </div>
        <div className={classes.ContentTable}>
          <TableOfContentsFloating links={content_table} />
        </div>

      </Flex>

    </>
  );
}




function extractCodeBlocksAndText(paragraph: string) {
  const blocksAndText = paragraph.split('```');
  const result = [];
  let currentLang = '';


  for (let i = 0; i < blocksAndText.length; i++) {
    if (i % 2 === 0) {
      // Text piece
      result.push({ type: 'text', content: blocksAndText[i] });
    } else {
      const blockContent = blocksAndText[i].trim();
      const langMatch = blockContent.match(/^(\S+)(?:\s|$)/); // Extract the language reference
      // Code block
      if (langMatch) {
        currentLang = langMatch[1];
        const codeWithoutLang = blockContent.replace(langMatch[0], '').trim();
        result.push({ type: 'code', content: codeWithoutLang, lang: currentLang });
      } else {
        // If no language reference found, use the current language reference
        result.push({ type: 'code', content: blockContent, lang: currentLang });
      }
    }
  }
  return result;
}

function extractChartAndCodeBlocksAndText(paragraph: string) {
  const blocksAndText = paragraph.split('````');
  const result = [];
  let currentLang = '';

  for (let i = 0; i < blocksAndText.length; i++) {
    if (i % 2 === 0) {
      // Text piece
      result.push({ type: 'text', content: blocksAndText[i] });
    } else {
      const blockContent = blocksAndText[i].trim();
      const langMatch = blockContent.match(/^(\S+)(?:\s|$)/); // Extract the language reference
      // Code block
      if (langMatch) {
        currentLang = langMatch[1];
        const codeWithoutLang = blockContent.replace(langMatch[0], '').trim();
        result.push({ type: 'code', content: codeWithoutLang, lang: currentLang });
      } else {
        // Check for the new chart block
        try {
          const chartObject = JSON.parse(blockContent);
          if (chartObject.type && chartObject.data && chartObject.option) {
            result.push({ type: 'chart', content: chartObject });
          }
        } catch (error) {
          // Handle JSON parsing error if needed
        }
      }
    }
  }
  return result;
}