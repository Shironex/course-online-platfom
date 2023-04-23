import { Modal } from "@mantine/core";

type tUserProfile = {
    opened: boolean,
    close: () => void,
}

const UserProfile = ({opened, close} : tUserProfile) => {
  return (
    <Modal opened={opened} onClose={close} title="Authentication" centered>
      test
    </Modal>
  );
};

export default UserProfile;
