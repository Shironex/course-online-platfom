import { IconHeart } from "@tabler/icons-react";
import {
  Card,
  Image,
  Text,
  Group,
  Badge,
  Button,
  ActionIcon,
  createStyles,
  rem,
  Rating,
} from "@mantine/core";
import { useState } from "react";
import { ConvertRaitingsPepole } from "~/utils/helper";

const useStyles = createStyles((theme, { like }: { like: boolean }) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    width: 340,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
      transition: "fill 0.4s ease-in-out",
    fill: like ? theme.colors.red[7] : theme.colors.dark[4],
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
}));

interface CourseCardProps {
  title: string;
  topic: string;
  author: string;
  raiting: number;
  raiting_pepole: number;
  imagesrc: string;
  badges: string[];
}

export function CourseCard({ title, author, topic, raiting, raiting_pepole, imagesrc, badges }: CourseCardProps) {
  const [like, Setlike] = useState(false);
  const { classes } = useStyles({ like });

  const colorList = [
    "red",
    "violet",
    "green",
    "pink",
    "grape",
    "indigo",
    "cyan",
    "teal",
    "lime",
    "yellow",
    "orange",
  ];
  const features = badges.map((badge, index) => {
    return (
      <Badge color={colorList[index]} key={badge}>
        {badge}
      </Badge>
    );
  });

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <Card.Section>
        <Image src={imagesrc} alt={title} height={180} />
      </Card.Section>

      <Card.Section className={classes.section} mt="md">
        <Group position="apart">
          <Text fz="lg" fw={500}>
            {title}
          </Text>
          <Badge size="sm">{topic}</Badge>
        </Group>
        <Text fz="sm" mt="xs" mb="xs">
          {author}
        </Text>
        <Group position="left" spacing="xs">
          <Text fz="sm">{raiting}</Text>
          <Rating value={raiting} fractions={3} readOnly />
          <Text fz="sm">({ ConvertRaitingsPepole(raiting_pepole) })</Text>
        </Group>
      </Card.Section>

      <Card.Section className={classes.section}>
        <Text mt="md" mb="xs" className={classes.label} c="dimmed">
          Perfect for you, if you know
        </Text>
        <Group spacing={7} mt={5}>
          {features}
        </Group>
      </Card.Section>

      <Group mt="xs">
        <Button  radius="md" style={{ flex: 1 }}>
          Show details
        </Button>
        <ActionIcon variant="default" color="red" radius="md" size={36}>
          <IconHeart onClick={() => Setlike(!like)} size="1.1rem" className={classes.like} stroke={1.5}/>
        </ActionIcon>
      </Group>
    </Card>
  );
}
