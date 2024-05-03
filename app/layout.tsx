import "@mantine/core/styles.css";
import "@mantine/code-highlight/styles.css";

import classes from "./globals.module.css";
import React from "react";
import {
  MantineProvider,
  ColorSchemeScript,
  Flex,
} from "@mantine/core";
import { theme } from "../theme";
import { MainHeader } from "../components/nav";
import { FooterSocial } from "../components/footer";
import { NavbarNested } from "../components/navMenu";
import { supabase } from "../utils/utils";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: {
    default: "complexity study",
    template: "%s | complexity study",
  },
  description: "build with love ❤️ in Mascara",
  openGraph: {
    title: "complexity study",
    description: "complexity study",
    url: "https://complexity-study.vercel.app",
    siteName: "complexity study",
    images: [
      {
        url: "/og.png",
        width: 512,
        height: 512,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};

type MockData =
  | {
      label: string;
      icon: string;
      link: string;
      links?: { label: string; link: string }[];
    }[]
  | undefined;

type SearchOption =
  | {
      label: string;
      link: string;
      description?: string;
      links?: { label: string; link: string; icon?: string }[];
    }[]
  | null;

export default async function RootLayout({ children }: { children: any }) {
  let { data: category, error } = await supabase
    .from("category").select(`
    *,
    article (
      *
    )
  `);

  


  const mockdata: MockData = category?.map((item) => {
    if (item?.article?.length > 0) {
      return {
        label: item.name,
        icon: item.icon || "",
        link: "/" + item.category_address_link,
        links: item.article?.map(
          (article: { article_title: any; address_link: any }) => {
            return {
              label: article.article_title,
              link:
                "/" + item.category_address_link + "/" + article.address_link,
            };
          }
        ),
      };
    } else {
      return {
        label: item.name,
        icon: item.icon || "",
        link: item.category_address_link,
      };
    }
  });

  let { data: searchMetaData } = await supabase
    
    .from("article")
    .select(
      `article_title, address_link,article_description, content_table, category(category_address_link)`
    )
    .returns<
      {
        article_title: string;
        address_link: string;
        article_description: string;
        content_table: { label: string; link: string; order: number }[];
        category: { category_address_link: string };
      }[]
    >();

  const searchOptionMeta: SearchOption =
    searchMetaData?.map((art) => {
      return {
        label: art.article_title,
        description: art.article_description,
        link:
          "/" + art.category?.category_address_link + "/" + art.address_link,
        links: art.content_table
          ?.filter((item) => item.order == 1)
          .map((item: any) => {
            return {
              label: item.label,
              link:
                "/" +
                art.category?.category_address_link +
                "/" +
                art.address_link +
                item.link,
              icon: "IconHash",
            };
          }),
      };
    }) || [];

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
          <MainHeader searchMetaData={searchOptionMeta} mockdata={mockdata} />
          <Flex justify={"flex-start"}>
            <div
              style={{ position: "relative" }}
              className={classes.hideNavBar}
            >
              <div style={{ position: "sticky", top: "0px" }}>
                <NavbarNested mockdata={mockdata} />
              </div>
            </div>
            {children}
          </Flex>
          <FooterSocial />
        </MantineProvider>
      </body>
    </html>
  );
}
