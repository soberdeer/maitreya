import React from 'react';
import { Text } from '@arwes/react';
import { Table as MantineTable } from '@mantine/core';
import { Inline, Text as ContentfulText } from '@contentful/rich-text-types';
import useStyles from './Table.styles';

export interface TableProps {
  headers?: (ContentfulText | Inline)[][][] | null;
  rows?: (ContentfulText | Inline)[][][][] | null;
}

export function Table({ headers, rows }: TableProps) {
  const { classes } = useStyles();
  return (
    <MantineTable className={classes.table}>
      {headers && (
        <thead>
          <tr>
            {headers.map((h, index) => (
              <th key={index}>
                {h.map((c) =>
                  c.map((item, k) => {
                    if (item.nodeType === 'text') {
                      return (
                        <Text key={k} as="p" className={classes.header} >
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
