import { useEffect, useState } from "react";
import {
  createStyles,
  Container,
  Avatar,
  UnstyledButton,
  Group,
  Text,
  Menu,
  Tabs,
  Burger,
  rem,
  Button,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  IconLogout,
  IconHeart,
  IconSettings,
  IconChevronDown,
  IconAdjustmentsCog,
  IconCertificate,
} from "@tabler/icons-react";
import Link from "next/link";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import UserProfile from "./ui/UserProfile";
import RegisterModal from "./ui/RegisterModal";

const useStyles = createStyles((theme) => ({
  header: {
    paddingTop: theme.spacing.sm,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? "transparent" : theme.colors.gray[2]
    }`,
  },

  title: {
    fontSize: theme.fontSizes.xl,
  },

  mainSection: {
    paddingBottom: theme.spacing.sm,
  },

  user: {
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    padding: `${theme.spacing.xs} ${theme.spacing.sm}`,
    borderRadius: theme.radius.sm,
    transition: "background-color 100ms ease",

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
    },

    [theme.fn.smallerThan("xs")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("xs")]: {
      display: "none",
    },
  },

  userActive: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
  },

  tabs: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  tabsList: {
    borderBottom: "0 !important",
  },

  tab: {
    fontWeight: 500,
    height: rem(38),
    backgroundColor: "transparent",
    marginInline: 5,
    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[1],
    },

    "&[data-active]": {
      backgroundColor:
        theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
      borderColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[2],
    },
  },

  link: {
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
  },
}));

interface HeaderTabsProps {
  tabs: { label: string; link: string }[];
}

export function Header({ tabs }: HeaderTabsProps) {
  const { classes, theme, cx } = useStyles();
  const [opened, { toggle }] = useDisclosure(false);
  const [ProfileOpened, ProfileHandler] = useDisclosure(false);
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  const signOut = useClerk().signOut;
  const router = useRouter();
  const { user } = useUser();


  const items = tabs.map((tab) => (
    <Tabs.Tab value={tab.label} key={tab.label}>
      <Link className={classes.link} href={tab.link}>
        {tab.label}
      </Link>
    </Tabs.Tab>
  ));

  return (
    <div className={classes.header}>
      <Container className={classes.mainSection}>
        <Group position="apart">
          <h1 className={classes.title}>Online Courses</h1>
          <Burger
            opened={opened}
            onClick={toggle}
            className={classes.burger}
            size="sm"
          />
          <Tabs
            defaultValue="Home"
            variant="outline"
            classNames={{
              root: classes.tabs,
              tabsList: classes.tabsList,
              tab: classes.tab,
            }}
          >
            <Tabs.List>{items}</Tabs.List>
          </Tabs>
          <SignedIn>
            <Menu
              width={260}
              position="bottom-end"
              transitionProps={{ transition: "pop-top-right" }}
              onClose={() => setUserMenuOpened(false)}
              onOpen={() => setUserMenuOpened(true)}
              withinPortal
            >
              <Menu.Target>
                <UnstyledButton
                  className={cx(classes.user, {
                    [classes.userActive]: userMenuOpened,
                  })}
                >
                  <Group spacing={7}>
                    <Avatar
                      src={user?.profileImageUrl}
                      alt={user?.username ? user?.username : "user"}
                      radius="xl"
                      size={20}
                    />
                    <Text weight={500} size="sm" sx={{ lineHeight: 1 }} mr={3}>
                      {user?.username}
                    </Text>
                    <IconChevronDown size={rem(12)} stroke={1.5} />
                  </Group>
                </UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Label>Main section</Menu.Label>
                <Menu.Item
                  icon={
                    <IconHeart
                      size="0.9rem"
                      color={theme.colors.red[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Liked courses
                </Menu.Item>
                <Menu.Item
                  icon={
                    <IconCertificate
                      size="0.9rem"
                      color={theme.colors.blue[6]}
                      stroke={1.5}
                    />
                  }
                >
                  Bought courses
                </Menu.Item>

                <Menu.Label>Settings</Menu.Label>
                <Menu.Item
                  icon={<IconSettings size="0.9rem" stroke={1.5} />}
                  onClick={ProfileHandler.open}
                >
                  Account settings
                </Menu.Item>

                <Menu.Item
                  icon={<IconAdjustmentsCog size="0.9rem" stroke={1.5} />}
                >
                  Manage courses
                </Menu.Item>
                <Menu.Item
                  color="red"
                  icon={<IconLogout size="0.9rem" stroke={1.5} />}
                  onClick={() => void signOut()}
                >
                  Logout
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </SignedIn>
          <SignedOut>
            <Group position="right">
              <Button
                variant="default"
                onClick={() => void router.push("/sign-in")}
              >
                Log in
              </Button>
              <Button onClick={() => setRegisterModal(true)}>
                Sign up
              </Button>
            </Group>
          </SignedOut>
        </Group>
      </Container>
      <RegisterModal opened={registerModal} close={() => setRegisterModal(false)} />
      <UserProfile opened={ProfileOpened} close={ProfileHandler.close} />
    </div>
  );
}
