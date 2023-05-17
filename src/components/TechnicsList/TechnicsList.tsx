import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Box, Group, Stack, Tabs } from '@mantine/core';
import { LevelType, TypeStands } from '@src/util/types';
import { Animator, Text } from '@arwes/react';
import { iconsMap } from '@src/components/Technic';
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
  // const [filter] = useState<AllTechnicStateType>('Все');
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>((router.query.type as string) || 'melee');

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
            type: 'melee',
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
        <Group position="left">
          <Text as="h1" style={{ marginBottom: 0 }}>
            Техники и стойки
          </Text>
          {/*<Filter value={filter} onSelect={setFilter} />*/}
        </Group>

        <Tabs
          variant="default"
          defaultValue={activeTab}
          onTabChange={setTab}
          sx={{ width: '100%' }}
          classNames={{ tab: classes.tab, tabIcon: classes.tabIcon, tabsList: classes.tabList }}
        >
          <Tabs.List grow>
            {Object.keys(data).map((key) => {
              const item = data[key as keyof TechnicsListDataProps];

              if (Object.keys(item).find((k) => item[k as keyof LevelType]?.length > 0)) {
                const obj = iconsMap[TECHNIC_TYPES[key as keyof typeof TECHNIC_TYPES]];
                const Icon = obj?.icon;

                return (
                  <Tabs.Tab value={key} icon={<Icon color={obj.props.color} size={20} key={key} />}>
                    <Box ml={5} sx={(theme) => ({ color: theme.colors.maitreya[3] })}>
                      <Animator merge duration={{ enter: 0.4, exit: 0.4, delay: 0.2 }}>
                        <Text as="span" className={classes.tabText} color={obj?.props.color}>
                          {TECHNIC_TYPES[key as keyof typeof TECHNIC_TYPES]}
                        </Text>
                      </Animator>
                    </Box>
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
                <Tabs.Panel value={key} pt="xl" key={key}>
                  <Stack align="flex-start">
                    <SmallBlock data={item.pupil} />
                    <SmallBlock data={item.adept} />
                    <SmallBlock data={item.master} />
                  </Stack>
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
