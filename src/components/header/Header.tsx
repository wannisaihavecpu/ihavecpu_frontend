import Link from "next/link";
import { FC, useState, useCallback } from "react";
import Box from "@component/Box";
import Image from "@component/Image";
import Icon from "@component/icon/Icon";
import FlexBox from "@component/FlexBox";
import MiniCart from "@component/mini-cart";
import Container from "@component/Container";
import { Tiny } from "@component/Typography";
import Login from "@component/sessions/Login";
import { IconButton } from "@component/buttons";
import Sidenav from "@component/sidenav/Sidenav";
import { H3, Span } from "@component/Typography";
import Categories from "@component/categories/Categories";
import { SearchInputWithCategory } from "@component/search-box";
import { useAppContext } from "@context/AppContext";
import StyledHeader from "./styles";
import { useSession, signOut } from "next-auth/react";
import MenuItem from "../MenuItem";
import Card from "@component/Card";

// import UserLoginDialog from "./LoginDialog";
// import Modal from "@component/Modal";

// ====================================================================
type HeaderProps = { isFixed?: boolean; className?: string };
// =====================================================================

const Header: FC<HeaderProps> = ({ isFixed, className }) => {
  const { state } = useAppContext();
  const [open, setOpen] = useState(false);
  const toggleSidenav = () => setOpen(!open);

  const [openModal, setOpenModal] = useState(false);
  const toggleDialog = useCallback(
    () => setOpenModal((openModal) => !openModal),
    []
  );
  const { data: session } = useSession();

  const [showCard, setShowCard] = useState(false);

  const toggleShow = () => {
    setShowCard(!showCard);
  };

  const CART_HANDLE = (
    <Box ml="20px" position="relative">
      <IconButton bg="gray.200" p="12px">
        <Icon size="20px">bag</Icon>
      </IconButton>

      {!!state.cart.length && (
        <FlexBox
          top={-5}
          right={-5}
          height={20}
          minWidth={20}
          bg="primary.main"
          borderRadius="50%"
          alignItems="center"
          position="absolute"
          justifyContent="center"
        >
        <Tiny color="white" fontWeight="600" lineHeight={1}>
            {state.cart.length}
          </Tiny>
        </FlexBox>
      )}
    </Box>
  );

  // const LOGIN_HANDLE = (
  //   <IconButton ml="1rem" bg="gray.200" p="8px">
  //     <Icon size="28px">user</Icon>
  //   </IconButton>
  // );

  return (
    <StyledHeader className={className}>
      <Container
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        height="100%"
      >
        <FlexBox className="logo" alignItems="center" mr="1rem">
          <Link href="/">
            <a>
              <Image src="/assets/images/logo.svg" alt="logo" height="50px" />
            </a>
          </Link>

          {isFixed && (
            <div className="category-holder">
              <Categories>
                <FlexBox color="text.hint" alignItems="center" ml="1rem">
                  <Icon>categories</Icon>
                  <Icon>arrow-down-filled</Icon>
                </FlexBox>
              </Categories>
            </div>
          )}
        </FlexBox>

        <FlexBox justifyContent="center" flex="1 1 0">
          <SearchInputWithCategory openModal={openModal} />
        </FlexBox>

        <FlexBox className="header-right" alignItems="center">
          {/* <UserLoginDialog handle={LOGIN_HANDLE}>
            <Login />
          </UserLoginDialog> */}
          {/* {session?.user?.firstname} */}

          {!session ? (
            <IconButton ml="1rem" bg="gray.200" p="8px" onClick={toggleDialog}>
              <Icon size="28px">user</Icon>
            </IconButton>
          ) : (
            <IconButton ml="1rem" bg="gray.200" p="8px" onClick={toggleShow}>
              <Box width={28} height={28}>
                <H3 fontSize={20}>
                  {session?.user.email.length > 2
                    ? session?.user.email.slice(0, 2)
                    : session?.user.email}
                </H3>
              </Box>
            </IconButton>
          )}
          {showCard && (
            <Card
              position="absolute"
              top="100%"
              py="0.1rem"
              width="15%"
              boxShadow="large"
              style={{ boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px" }}
              zIndex={99}
            >
              <Link href={`/profile`}>
                <MenuItem>
                  <Span fontSize="14px">บัญชีของฉัน</Span>
                </MenuItem>
              </Link>
              <Link href={`/wishlist`}>
                <MenuItem>
                  <Span fontSize="14px">รายการสินค้าโปรด</Span>
                </MenuItem>
              </Link>

              <MenuItem onClick={() => signOut()}>
                <Span fontSize="14px">ออกจากระบบ</Span>
              </MenuItem>
            </Card>
          )}

          {/* {session?.user.email} */}

          <Login open={openModal} onClose={toggleDialog} />
          <Sidenav
            open={open}
            width={380}
            position="right"
            handle={CART_HANDLE}
            toggleSidenav={toggleSidenav}
          >
            <MiniCart toggleSidenav={toggleSidenav} />
          </Sidenav>
        </FlexBox>
      </Container>
    </StyledHeader>
  );
};

export default Header;
