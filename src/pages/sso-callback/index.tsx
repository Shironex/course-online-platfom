import { type NextPage } from "next";
import { AuthenticateWithRedirectCallback, useSignUp } from "@clerk/nextjs";
import { Button, Flex, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";

const SignCompletePage: NextPage = () => {
  const clerk = useSignUp();
  const [missingfields, setMissingFields] = useState<string[]>();

  useEffect(() => {
    if (!clerk.isLoaded) return;
    setMissingFields(clerk.signUp.missingFields);
    console.log(clerk.signUp.missingFields);
    //TODO USE CLERK UPDATE TO COMPLETE LAST ATTEMP REGISTER USING GOOGLE AUTH 
  }, [clerk.isLoaded]);

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      gap={20}
      sx={{ width: "100%", height: "100%", padding:"20px" }}
    >
      <AuthenticateWithRedirectCallback continueSignUpUrl="http://localhost:3000/sso-callback" />
      {missingfields?.map((fields) => {
        return (
          <TextInput
            key={fields}
            label={fields}
            placeholder={`Your ${fields}`}
            radius="md"
          />
        );
      })}
      <Button
        type="submit"
        radius="xl"
      >
        Complete Register
      </Button>
    </Flex>
  );
};

export default SignCompletePage;
