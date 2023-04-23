import { useForm } from "@mantine/form";
import {
  TextInput,
  PasswordInput,
  Modal,
  Group,
  Button,
  Divider,
  Checkbox,
  Stack,
} from "@mantine/core";
import GoogleIcon from "./SocialButtons/GoogleIcon";
import { IconAt } from "@tabler/icons-react";
import { useState } from "react";
import { api } from "~/utils/api";

type tUserProfile = {
  opened: boolean;
  close: () => void;
};

const RegisterModal = ({ opened, close }: tUserProfile) => {
  const [loading, setLoading] = useState(false);
  const RegisterMutation = api.user.create.useMutation();
  
  const form = useForm({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      username: "",
      password: "",
      terms: true,
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      firstname: (val) =>
        val.length < 3
          ? "First name should include at least 4 characters"
          : null,
      lastname: (val) =>
        val.length < 3
          ? "Last name should include at least 4 characters"
          : null,
      username: (val) =>
        val.length < 3 ? "Username should include at least 5 characters" : null,
      password: (val) =>
        val.length <= 8
          ? "Password should include at least 8 characters"
          : null,
      terms: (val) => (val === false ? "U need to accepts our terms" : null),
    },
  });


  return (
    <Modal
      opened={opened}
      onClose={() => {
        form.reset();
        close();
      }}
      title="Register Form"
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
        >
          Google
        </Button>
      </Group>

      <Divider label="Or continue with email" labelPosition="center" my="lg" />

      <form
        onSubmit={form.onSubmit((values) => {
          setTimeout(() => {
            console.log(values);
            RegisterMutation.mutate({...values})
            setLoading(false);
          }, 1500);
        })}
      >
        <Stack>
          <Group grow>
            <TextInput
              label="first name"
              placeholder="Your first name"
              value={form.values.firstname}
              onChange={(event) =>
                form.setFieldValue("firstname", event.currentTarget.value)
              }
              error={
                form.errors.firstname &&
                "First name should include at least 4 characters"
              }
              radius="md"
            />

            <TextInput
              label="last name"
              placeholder="Your last name"
              value={form.values.lastname}
              onChange={(event) =>
                form.setFieldValue("lastname", event.currentTarget.value)
              }
              error={
                form.errors.lastname &&
                "Last name should include at least 4 characters"
              }
              radius="md"
            />
          </Group>
          <TextInput
            label="Username"
            placeholder="Your username"
            value={form.values.username}
            onChange={(event) =>
              form.setFieldValue("username", event.currentTarget.value)
            }
            error={
              form.errors.username &&
              "Username should include at least 5 characters"
            }
            radius="md"
          />

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

          <Checkbox
            label="I accept to sell my soul"
            checked={form.values.terms}
            onChange={(event) =>
              form.setFieldValue("terms", event.currentTarget.checked)
            }
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
            Register
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default RegisterModal;
