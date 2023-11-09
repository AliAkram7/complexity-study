import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';

import classes from './globals.module.css'
import React from "react";
import { MantineProvider, ColorSchemeScript, Flex, LoadingOverlay } from "@mantine/core";
import { theme } from "../theme";
import { MainHeader } from "../components/nav";
import { FooterSocial } from "../components/footer";
import { NavbarNested } from "../components/navMenu";
import { PostgrestSingleResponse, createClient } from "@supabase/supabase-js";
import { mock } from "node:test";

export const metadata = {
  title: "complexity study",
  description: "build with love from RSD student",
};



export default async function RootLayout({ children }: { children: any }) {


  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || "", process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "")





  let { data: category, error } = await supabase
    .from('category')
    .select(`
    *,
    article (
      category_id,
      article_title,
      address_link

    )
  `)


  // console.log(category)

  type MockData = {
    label: string;
    icon: string;
    link: string;
    links?: { label: string, link: string }[];
  }[] | undefined



  const mockdata: MockData = category?.map((item => {

    if (item?.article.length > 0) {
      return {
        label: item.name,
        icon: item.icon || "",
        link: item.category_address_link,
        links: item.article?.map((article: { article_title: any; address_link: any; }) => {
          return { label: article.article_title, link: article.address_link }
        }),
      }
    }
    else {
      return {
        label: item.name,
        icon: item.icon || "",
        link: item.category_address_link,
      }
    }
  }))




  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <MainHeader  mockdata={mockdata} />
          <Flex justify={'flex-start'}  >
            <div style={{ position: 'relative' }} className={classes.hideNavBar} >
              <div style={{ position: 'sticky', top: '0px' }} >
                <NavbarNested mockdata={mockdata} />
              </div>
            </div>
            {children}
          </Flex>
          <FooterSocial />
        </MantineProvider>
      </body>
    </html >
  );
}
