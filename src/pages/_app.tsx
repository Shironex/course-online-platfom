import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { MantineProvider } from "@mantine/core";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/components/Header";

const MyApp: AppType<{ session: Session | null }> = ({Component,pageProps: { session, ...pageProps },}) => {
  const user = {
    name: "Admin",
    image: ""
  }
  const tabs = [
    {
      label: "Home",
      link: "/"
    },
    {
      label: "Courses",
      link: "/courses"
    },
    {
      label: "Others",
      link: "/others"
    },

  ]
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        /** Put your mantine theme override here */
        colorScheme: "dark",
      }}
    >
      <SessionProvider session={session}>
        <Header user={user} tabs={tabs} />
        <Component {...pageProps} />
      </SessionProvider>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
