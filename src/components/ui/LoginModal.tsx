/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Modal,
  Group,
  Button,
  Divider,
  Stack,
} from "@mantine/core";
import GoogleIcon from "./SocialButtons/GoogleIcon";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { useSignIn } from "@clerk/nextjs";

type tUserProfile = {
  opened: boolean;
  close: () => void;
};

const LoginModal = ({ opened, close }: tUserProfile) => {
  const [loading, setLoading] = useState(false);
  const { isLoaded, signIn, setActive } = useSignIn();
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
    },
  });

  if (!isLoaded) {
    return null;
  }

  async function LoginwithGoogle() {
    try {
      await signIn?.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "http://localhost:3000/sso-callback",
        redirectUrlComplete: "http://localhost:3000/",
      });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        close();
      }}
      title="Login Form"
      centered
      closeOnClickOutside={false}
    >
      <Group position="center" mb="md" mt="md">
        <Button
          leftIcon={<GoogleIcon />}
          variant="default"
          color="gray"
          radius="xl"
          px={50}
          onClick={() => void LoginwithGoogle()}
        >
          Google
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          signIn
            .create({
              identifier: values.email,
              password: values.password,
            })
            .then(async (result) => {
              if (result.status === "complete") {
                console.log(result);
                await setActive({ session: result.createdSessionId });
                form.reset();
                close();
              } else {
                console.log(result);
              }
            })
            .catch((err) => {
              console.log(err.errors[0].message);
              console.error("error", err.errors[0].message);
            })
            .finally(() => {
              setLoading(false);
            });
        })}
      >
        <Stack>
          <TextInput
            required
            label="Email"
            placeholder="hello@mantine.dev"
            value={form.values.email}
            onChange={(event) =>
              form.setFieldValue("email", event.currentTarget.value)
            }
            icon={<IconAt size="0.8rem" />}
            error={form.errors.email && "Invalid email"}
            radius="md"
          />

          <PasswordInput
            required
            label="Password"
            placeholder="Your password"
            value={form.values.password}
            onChange={(event) =>
              form.setFieldValue("password", event.currentTarget.value)
            }
            error={
              form.errors.password &&
              "Password should include at least 6 characters"
            }
            radius="md"
          />
        </Stack>

        <Group position="right" mt="xl">
          <Button
            variant="default"
            type="button"
            radius="xl"
            onClick={() => {
              form.reset();
              close();
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            radius="xl"
            loading={loading}
            onClick={() => setLoading(true)}
          >
            Login
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default LoginModal;
