'use client';
import { Anchor, AppShell, Flex, Text, useMantineTheme } from '@mantine/core';
import Logo1 from '@/assets/icons/logo-white.svg';
import Logo2 from '@/assets/icons/logo11.svg';
import Home from '@/assets/icons/dash.svg';
import Orders from '@/assets/icons/docs.svg';
import Events from '@/assets/icons/men.svg';
import Menu from '@/assets/icons/menu-new.svg';
import Users from '@/assets/icons/customers.svg';
import Settings from '@/assets/icons/settings.svg';
import Location from '@/assets/icons/location-outline.svg';
import Logout from '@/assets/icons/logout.svg';
import { usePathname } from 'next/navigation';
import { ROUTES } from '@/utils/constants';
import Link from 'next/link';
import { useEffect, useMemo } from 'react';
import { notifications } from '@mantine/notifications';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useMe } from '@/hooks/data/useMe';
import { AdminNavbar } from '../Admin/navbar';

const navLinks = [
  {
    name: 'Dashboard',
    route: ROUTES.home,
    icon: Home,
  },
  {
    name: 'Users',
    route: ROUTES.customers,
    icon: Users,
  },
  {
    name: 'Locations',
    route: ROUTES.locations,
    icon: Location,
  },
  {
    name: 'Schedules',
    route: ROUTES.schedules,
    icon: Location,
  },
  {
    name: 'Orders',
    route: ROUTES.adminOrders,
    icon: Orders,
  },
  {
    name: 'Events',
    route: ROUTES.adminEvents,
    icon: Events,
  },

  {
    name: 'Settings',
    route: ROUTES.settings,
    icon: Settings,
  },
];

const getName = (path: string) => {
  const name = navLinks?.find((n) => n.route === path)?.name;
  return name || '';
};

export const AdminDashboardShell: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const theme = useMantineTheme();
  const pathname = usePathname();
  const { data, isLoading } = useMe({
    retry: false,
    // retry(failureCount, error) {
    //   return failureCount <= 2;
    // },
  });
  const isActivePath = (path: string) => {
    return pathname === path;
  };

  const isAuth = useMemo(() => {
    return pathname === ROUTES.login;
  }, [pathname]);

  const queryClient = useQueryClient();
  const router = useRouter();

  const handleLogout = async () => {
    if (typeof window === 'undefined') {
      return null;
    }
    localStorage.removeItem('token');
    queryClient.clear();
    router.push(ROUTES.login);
    notifications.show({
      title: 'Success',
      message: 'Logout Successful',
      color: 'green',
    });
  };

  useEffect(() => {
    if (!data && !isLoading) {
      router.replace(ROUTES.login);
    } else if (data?.id && isAuth) {
      router.replace(ROUTES.home);
    }
  }, [data, isAuth, isLoading, router]);

  if (isLoading) {
    return (
      <Flex h='100vh' w='100vw' align='center' justify='center'>
        <Text ta='center' fw='bold' fz={18}>
          Loading ....
        </Text>
      </Flex>
    );
  }

  return (
    <AppShell
      layout='alt'
      navbar={{
        width: isAuth ? 0 : 250,
        breakpoint: 'sm',
      }}>
      {!isAuth && (
        <AppShell.Navbar>
          <Flex
            direction='column'
            justify='space-between'
            h='100%'
            bg='color.27'>
            <Flex direction='column'>
              <Flex
                align='center'
                px='10px'
                style={{
                  cursor: 'pointer',
                }}
                mt='30px'
                mb='40px'>
                <Flex style={{ zIndex: 99 }}>
                  <Logo1 />
                </Flex>
                <Flex ml='-25px'>
                  <Logo2
                    style={{
                      fill: theme.colors.color[3],
                      stroke: theme.colors.color[3],
                      strokeWidth: '0',
                    }}
                  />
                </Flex>
              </Flex>
              <Flex direction='column'>
                {navLinks.map((link) => (
                  <Anchor
                    key={link.route}
                    component={Link}
                    underline='never'
                    href={link.route}>
                    <Flex
                      align='center'
                      mb='15px'
                      h='40px'
                      px='16px'
                      bg={isActivePath(link.route) ? 'color.4' : 'transparent'}
                      style={{
                        borderRight: isActivePath(link.route)
                          ? `3px solid ${theme.colors.color[27]}`
                          : 'none',
                      }}>
                      <link.icon
                        style={{
                          stroke: isActivePath(link.route)
                            ? theme.colors.color[27]
                            : theme.colors.color[3],
                          fill: isActivePath(link.route)
                            ? theme.colors.color[27]
                            : theme.colors.color[3],
                        }}
                        strokeWidth='0'
                      />
                      <Text
                        c={isActivePath(link.route) ? 'color.1' : 'color.2'}
                        fz='14px'
                        fw={isActivePath(link.route) ? '600' : '400'}
                        ml='24px'>
                        {link.name}
                      </Text>
                    </Flex>
                  </Anchor>
                ))}
              </Flex>
            </Flex>

            <Flex
              align='center'
              mb='15px'
              h='40px'
              px='16px'
              style={{
                cursor: 'pointer',
              }}
              onClick={() => handleLogout()}>
              <Logout />
              <Text c='color.5' fz='14px' fw={400} ml='24px'>
                Log out
              </Text>
            </Flex>
          </Flex>
        </AppShell.Navbar>
      )}

      {!isAuth && (
        <AppShell.Header>
          <AdminNavbar title={getName(pathname)} />
        </AppShell.Header>
      )}
      <AppShell.Main
        bg='color.0'
        pt={80}
        style={{
          overflow: 'auto',
        }}
        h='100vh'>
        {children}
      </AppShell.Main>
    </AppShell>
  );
};
