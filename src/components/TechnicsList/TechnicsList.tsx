import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useMediaQuery } from '@mantine/hooks';
import { Box, Group, Stack, Tabs } from '@mantine/core';
import { LevelType, TypeStands } from '@src/util/types';
import { Animator, Text } from '@arwes/react';
import { COLORS_MAP_EN, ICONS_MAP } from '@src/components/icons';
import { TECHNIC_TYPES } from '@src/util/constants';
import { SmallBlock } from './SmallBlock';
import useStyles from './TechnicsList.styles';

export type TechnicsListDataProps = {
  stand: LevelType<TypeStands>;
  melee: LevelType;
  navigation: LevelType;
  shooting: LevelType;
  telepathy: LevelType;
  protection: LevelType;
  recovery: LevelType;
};

export interface TechnicsListProps {
  className?: string;
  data: TechnicsListDataProps;
  defaultTab?: string;
}

export function TechnicsList({ className, data, defaultTab, ...others }: TechnicsListProps) {
  const { classes, cx } = useStyles();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>(
    (router.query.type as string) || defaultTab || 'melee'
  );
  const mobile = useMediaQuery('(max-width: 720px)');

  const replaceRouter = async (tab: string) => {
    router.push(
      {
        pathname: '/technics',
        query: {
          type: tab,
        },
      },
      undefined,
      {
        shallow: true,
      }
    );
  };

  const setTab = (tab: string) => {
    setActiveTab(tab);
    setTimeout(() => {
      replaceRouter(tab);
    }, 150);
  };

  useEffect(() => {
    if (!router.query.type) {
      router.push(
        {
          pathname: '/technics',
          query: {
            type: defaultTab || 'melee',
          },
        },
        undefined,
        {
          shallow: true,
        }
      );
    }
  }, []);

  return (
    <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
      <Box className={cx(classes.root, className)} {...others}>
        <Group position="center" sx={{ width: '100%' }}>
          <Text as="h1" style={{ marginBottom: 0 }}>
            Техники и стойки
          </Text>
          {/*<Filter value={filter} onSelect={setFilter} />*/}
        </Group>

        <Tabs
          variant="default"
          defaultValue={activeTab}
          onTabChange={setTab}
          orientation={mobile ? 'horizontal' : 'vertical'}
          sx={{ width: '100%' }}
          classNames={{ tab: classes.tab, tabIcon: classes.tabIcon, tabsList: classes.tabList }}
        >
          <Tabs.List grow={mobile}>
            {Object.keys(data).map((key) => {
              const item = data[key as keyof TechnicsListDataProps];

              if (Object.keys(item).find((k) => item[k as keyof LevelType]?.length > 0)) {
                const Icon = ICONS_MAP[TECHNIC_TYPES[key as keyof typeof TECHNIC_TYPES]];
                const color = COLORS_MAP_EN[key as keyof typeof TECHNIC_TYPES];

                return (
                  <Tabs.Tab value={key} key={key}>
                    <Animator merge duration={{ enter: 0.4, exit: 0.4, delay: 0.2 }}>
                      <Group
                        spacing={5}
                        align="center"
                        noWrap
                        sx={(theme) => ({ color: theme.colors.maitreya[3] })}
                      >
                        <Icon size={mobile ? 20 : 30} key={key} />
                        <Text as="span" className={classes.tabText} color={color} data-styled>
                          {TECHNIC_TYPES[key as keyof typeof TECHNIC_TYPES]}
                        </Text>
                      </Group>
                    </Animator>
                  </Tabs.Tab>
                );
              }
              return null;
            })}
          </Tabs.List>
          {Object.keys(data).map((key) => {
            const item = data[key as keyof TechnicsListDataProps];

            if (Object.keys(item).find((k) => item[k as keyof LevelType]?.length > 0)) {
              return (
                <Tabs.Panel value={key} pt={mobile ? 'xl' : 0} pl={mobile ? 0 : 'xl'} key={key}>
                  <Animator merge manager="stagger" duration={{ enter: 0.4, exit: 0.4, offset: 1 }}>
                    <Stack align="flex-start">
                      <SmallBlock data={item.pupil} />
                      <SmallBlock data={item.adept} />
                      <SmallBlock data={item.master} />
                    </Stack>
                  </Animator>
                </Tabs.Panel>
              );
            }
            return null;
          })}
        </Tabs>
      </Box>
    </Animator>
  );
}
