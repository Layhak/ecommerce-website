'use client';
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuToggle,
} from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import NextLink from 'next/link';
import Link from 'next/link';
import { ThemeSwitch } from '@/components/theme-switch';
import { Logo } from '@/components/icons';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@nextui-org/button';
import { signOut, useSession } from 'next-auth/react';
import { useAppSelector } from '@/redux/hook';
import { selectToken } from '@/redux/feature/auth/authSlice';
import { useEffect, useState } from 'react';
import { CartIcon } from '@nextui-org/shared-icons';
import { selectProducts } from '@/redux/feature/cartSlice';
import { CartProductType } from '@/libs/difinition';

// Utility function to get a specific cookie
// Utility function to get a specific cookie

export const NavigationBar = () => {
  const { data: session } = useSession();
  const token = useAppSelector(selectToken);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const router = useRouter();
  const handleCart = () => router.push('/cart');

  //For Carts
  const products = useAppSelector(selectProducts);

  //display number of product that only unique select
  const [uniqueProducts, setUniqueProducts] = useState<CartProductType[]>([]);

  useEffect(() => {
    // Filter unique products based on their IDs
    const unique = products.filter(
      (product, index, self) =>
        index === self.findIndex((t) => t.id === product.id)
    );

    // Update the state with the unique products
    setUniqueProducts(unique);
  }, [products]);
  // const users = useSelector(selectUsers);
  const pathname = usePathname();
  useEffect(() => {
    const authToken = token || session;
    setIsAuthenticated(!!authToken);
  }, [session, token]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand as="li" className="max-w-fit gap-3">
          <NextLink className="flex items-center justify-start gap-1" href="/">
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </NextLink>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent justify={'center'} className={'hidden lg:flex'}>
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href} isActive={item.href === pathname}>
            <NextLink
              className={
                item.href === pathname ? 'text-warning' : 'text-foreground'
              }
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
        {/*<NavbarItem>*/}
        {/*  <NextLink*/}
        {/*    href={'/users'}*/}
        {/*  >*/}
        {/*    Users ({users.length})*/}
        {/*  </NextLink>*/}
        {/*</NavbarItem>*/}
      </NavbarContent>
      <NavbarContent
        className="hidden basis-1/5 sm:flex sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden gap-2 lg:flex">
          <div className={'relative'}>
            <CartIcon fill="#f0a124" onClick={handleCart} />
            <div className="bg-yellow-10 absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full text-xs">
              {uniqueProducts.length}
            </div>
          </div>
        </NavbarItem>
        <NavbarItem className="hidden gap-2 lg:flex">
          <ThemeSwitch />
        </NavbarItem>
        {!isAuthenticated ? (
          <>
            <NavbarItem className="hidden lg:flex">
              <NextLink
                className={
                  'text-foreground transition-colors hover:text-warning'
                }
                href="/register"
              >
                Sign Up
              </NextLink>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <span className={'h-[20px] border-1 border-foreground'}></span>
            </NavbarItem>
            <NavbarItem className="hidden lg:flex">
              <Button
                as={Link}
                color={'warning'}
                className={
                  ' bg-gradient-to-tr from-orange-700 to-warning text-gray-50'
                }
                href="/login"
                variant="shadow"
              >
                Sign in
              </Button>
            </NavbarItem>
          </>
        ) : (
          <NavbarItem className="hidden lg:flex">
            <Dropdown placement="bottom-end" shadow={'md'}>
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="warning"
                  size="sm"
                  src={
                    session?.user?.image ??
                    `https://i.pravatar.cc/150?u=a042581f4e29026704d`
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="shadow">
                <DropdownItem
                  key="profile"
                  className="h-14 gap-2"
                  isDisabled={true}
                >
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold">
                    {session?.user?.email ?? 'test@gmail.com'}
                  </p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  className={'text-danger'}
                  onClick={() => signOut()}
                >
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href} isActive={item.href === pathname}>
              <NextLink
                className={
                  item.href === pathname ? 'text-warning' : 'text-foreground'
                }
                href={item.href}
              >
                {item.label}
              </NextLink>
            </NavbarItem>
          ))}
        </div>
      </NavbarMenu>

      <NavbarContent className="basis-1 pl-4 lg:hidden" justify="end">
        <ThemeSwitch />
        <Avatar
          isBordered
          color="secondary"
          src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          size={'sm'}
        />
        <NavbarMenuToggle />
      </NavbarContent>
    </NextUINavbar>
  );
};
