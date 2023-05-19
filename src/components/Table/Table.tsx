import React, { useEffect, useState } from 'react';
import { Animated, Animator, Text } from '@arwes/react';
import { useViewportSize } from '@mantine/hooks';
import { Box, px, Table as MantineTable, TableProps as MantineTableProps } from '@mantine/core';
import { Inline, Text as ContentfulText } from '@contentful/rich-text-types';
import useStyles from './Table.styles';

export interface TableProps extends MantineTableProps {
  headers?: (ContentfulText | Inline)[][][] | null;
  rows?: (ContentfulText | Inline)[][][][] | null;
}

export function Table({ headers, rows, className, ...others }: TableProps) {
  const { classes, cx } = useStyles();
  const [maxWidth, setMaxWidth] = useState<number | string>('auto');
  const { width: screenWidth } = useViewportSize();

  useEffect(() => {
    if (document) {
      const frame = document.querySelector('div[data-name="frame-wrapper"]');
      if (frame) {
        const padding = px('0.75rem');
        setMaxWidth(frame.getBoundingClientRect().width - padding * 2 - 2);
      }
    }
  }, [screenWidth]);

  return (
    <Box className={classes.root} sx={{ maxWidth }}>
      <Animator manager="stagger" duration={{ enter: 0.3, exit: 0.4, stagger: 0.003 }}>
        <MantineTable className={cx(classes.table, className)} {...others}>
          {headers && (
            <thead>
              <tr>
                {headers.map((h, index) => (
                  <Box component="th" key={index} sx={{ position: 'relative' }}>
                    {h.map((c, j) =>
                      c.map((item, k) =>
                        item.nodeType === 'text' ? (
                          <Animator merge key={`${j}_${k}`}>
                            <Text as="p" className={classes.header}>
                              {item.value}
                            </Text>
                          </Animator>
                        ) : null
                      )
                    )}
                    <Animated
                      as="div"
                      className={classes.underline}
                      animated={{
                        initialStyle: { width: 0 },
                        transitions: {
                          entering: { width: '100%' },
                          exiting: { width: 0 },
                        },
                      }}
                    />
                  </Box>
                ))}
              </tr>
            </thead>
          )}
          <tbody>
            {rows?.map((row, i) => (
              <tr key={i}>
                {row.map((h, index) => (
                  <td key={index}>
                    {h.map((c, j) =>
                      c.map((item, k) =>
                        item.nodeType === 'text' ? (
                          <Animator merge key={`${j}_${k}`}>
                            <Text as="p" className={classes.cell}>
                              {item.value}
                            </Text>
                          </Animator>
                        ) : null
                      )
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </MantineTable>
      </Animator>
    </Box>
  );
}
