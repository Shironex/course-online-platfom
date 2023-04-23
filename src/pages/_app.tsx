import { type AppType } from "next/app";
import { MantineProvider } from "@mantine/core";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { Header } from "~/components/Header";

const MyApp: AppType = ({ Component, pageProps: { ...pageProps } }) => {
  const user = {
    name: "Admin",
    image: "",
  };
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
      <Header user={user} tabs={tabs} />
      <Component {...pageProps} />
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
