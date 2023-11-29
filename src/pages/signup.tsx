import { useEffect } from "react";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import FlexBox from "@component/FlexBox";
import Signup from "@component/sessions/Signup";
import NavbarLayout from "@component/layout/NavbarLayout";

interface SignUpPageProps {
  layout?: typeof NavbarLayout;
}

const SignUpPage = ({}: SignUpPageProps) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      const session = await getSession();

      if (session) {
        router.push("/profile");
      }
    };

    checkAuthentication();
  }, [router]);

  return (
    <FlexBox flexDirection="column" alignItems="center" justifyContent="center">
      <Signup />
    </FlexBox>
  );
};

SignUpPage.layout = NavbarLayout;

export default SignUpPage;
