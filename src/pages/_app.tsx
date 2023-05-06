import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider, createEmotionCache } from '@mantine/core';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Navbar from "~/components/Navbar";
import {SkeletonTheme} from "react-loading-skeleton";

// Do this to prevent mantine clashing with tailwind.
const myCache = createEmotionCache({ key: 'mantine', prepend: false });

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
        <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            emotionCache={myCache}
            theme={{
                colorScheme: 'dark',
            }}
        >
            <SkeletonTheme baseColor={"rgba(255, 255, 255, 0.05)"} highlightColor={"rgba(255, 255, 255, 0.4)"}>
                <Navbar/>
                <Component {...pageProps} />
            </SkeletonTheme>
        </MantineProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
