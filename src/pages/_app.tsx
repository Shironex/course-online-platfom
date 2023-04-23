import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";
import { ClerkProvider } from "@clerk/nextjs";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/components/Header";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const tabs = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Courses",
      link: "/courses",
    },
    {
      label: "Others",
      link: "/others",
    },
  ];
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <ClerkProvider {...pageProps}>
        <Header tabs={tabs} />
        <Component {...pageProps} />
      </ClerkProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
