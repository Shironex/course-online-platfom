import { type NextPage } from "next";
import Head from "next/head";
import { Flex } from "@mantine/core";
import { SignUp } from "@clerk/nextjs";


const SignUpPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Course Platform</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main style={{height: "calc(100vh - 65px)"}}>
        <Flex align="center" justify="center" sx={{width: "100%", height: "100%"}}>
          <SignUp />
        </Flex>
      </main>
    </>
  );
};

export default SignUpPage;
