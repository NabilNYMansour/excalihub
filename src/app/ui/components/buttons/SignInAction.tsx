import { ActionIcon } from "@mantine/core";
import Link from "next/link";
import { CiLogin } from "react-icons/ci";

const SignInAction = () => {

  return (
    <Link href="/sign-in">
      <ActionIcon variant="light" radius="xl" size={28}>
        <CiLogin size={20} />
      </ActionIcon>
    </Link>
  );
};

export default SignInAction;