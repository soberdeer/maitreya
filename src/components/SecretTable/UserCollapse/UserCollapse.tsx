import React from 'react';
import { Inline, Text as ContentfulText } from '@contentful/rich-text-types';
import { Box, Collapse, Group, UnstyledButton } from '@mantine/core';
import { Text } from '@arwes/react';
import { UsersTable } from '@src/util/types';
import { ChevronDownIcon } from '@src/components/icons';
import { Table } from '@src/components/Table';
import { Checkbox } from '../Checkbox';
import useStyles from './UserCollapse.styles';

interface UserCollapseProps {
  user: UsersTable;
  show: boolean;
  selected: boolean;

  setShow(state: boolean): void;

  setSelect(state: boolean): void;
}

const check = (str?: string | null) => (str && str.length > 0 ? str.split('| ') : []);

const headers = [
  [[{ nodeType: 'text', value: 'Добавленные' }]],
  [[{ nodeType: 'text', value: 'Удаленные' }]],
] as (ContentfulText | Inline)[][][];

const mapDataset = (addedString: string, removedString: string) => {
  const added = [...new Set(check(addedString))];
  const removed = [...new Set(check(removedString))];

  return Array(Math.max(added.length, removed.length))
    .fill(0)
    .map((_, i) => [
      [[{ nodeType: 'text', value: added[i] || '' }]],
      [[{ nodeType: 'text', value: removed[i] || '' }]],
    ]) as (ContentfulText | Inline)[][][][];
};

export function UserCollapse({ user, show, setShow, selected, setSelect }: UserCollapseProps) {
  const { classes, cx, theme } = useStyles();

  return (
    <Box pt={20}>
      <Group>
        <Checkbox onChange={(e) => setSelect(e.currentTarget.checked)} checked={selected} />
        <UnstyledButton onClick={() => setShow(!show)}>
          <Group>
            <Text as="h6" className={classes.userName}>
              {user.name}
            </Text>
            <ChevronDownIcon
              color={theme.colors.maitreya[3]}
              size={20}
              className={cx(classes.chevron, { [classes.rotate]: show })}
            />
          </Group>
        </UnstyledButton>
      </Group>
      <Collapse in={show}>
        {(user.added_introjects?.length > 0 || user.removed_introjects?.length > 0) && (
          <Box pt={20}>
            <Text as="p">Интроекты</Text>
            <Table
              headers={headers}
              rows={mapDataset(user.added_introjects, user.removed_introjects)}
              className={classes.table}
            />
          </Box>
        )}
        {(user.added_convictions?.length > 0 || user.removed_convictions?.length > 0) && (
          <Box pt={20}>
            <Text as="p">Убеждения</Text>
            <Table
              headers={headers}
              className={classes.table}
              rows={mapDataset(user.added_convictions, user.removed_convictions)}
            />
          </Box>
        )}
      </Collapse>
    </Box>
  );
}
