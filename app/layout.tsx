import "@mantine/core/styles.css";
import '@mantine/code-highlight/styles.css';

import classes from './globals.module.css'
import React from "react";
import { MantineProvider, ColorSchemeScript, Flex } from "@mantine/core";
import { theme } from "../theme";
import { MainHeader } from "../components/nav";
import { FooterSocial } from "../components/footer";
import { NavbarNested } from "../components/navMenu";

export const metadata = {
  title: "complexity study",
  description: "build with love from RSD student",
};



export default function RootLayout({ children }: { children: any }) {
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
          <MainHeader />
          <Flex justify={'flex-start'}  >
            <div style={{ position: 'relative'  }} className={classes.hideNavBar} >
              <div style={{ position: 'sticky', top : '0px' }} >
                <NavbarNested />
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
