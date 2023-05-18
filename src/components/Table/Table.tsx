import React from 'react';
import { Text } from '@arwes/react';
import { Table as MantineTable, TableProps as MantineTableProps } from '@mantine/core';
import { Inline, Text as ContentfulText } from '@contentful/rich-text-types';
import useStyles from './Table.styles';

export interface TableProps extends MantineTableProps {
  headers?: (ContentfulText | Inline)[][][] | null;
  rows?: (ContentfulText | Inline)[][][][] | null;
}

export function Table({ headers, rows, className, ...others }: TableProps) {
  const { classes, cx } = useStyles();

  return (
    <MantineTable className={cx(classes.table, className)} {...others}>
      {headers && (
        <thead>
          <tr>
            {headers.map((h, index) => (
              <th key={index}>
                {h.map((c) =>
                  c.map((item, k) => {
                    if (item.nodeType === 'text') {
                      return (
                        <Text key={k} as="p" className={classes.header}>
                          {item.value}
                        </Text>
                      );
                    }
                    return null;
                  })
                )}
              </th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>
        {rows?.map((row, i) => (
          <tr key={i}>
            {row.map((h, index) => (
              <td key={index}>
                {h.map((c) =>
                  c.map((item, k) => {
                    if (item.nodeType === 'text') {
                      return (
                        <Text key={k} as="p" className={classes.cell}>
                          {item.value}
                        </Text>
                      );
                    }
                    return null;
                  })
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </MantineTable>
  );
}
