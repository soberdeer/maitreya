import React from 'react';
import { Animator, Text } from '@arwes/react';
import { Box } from '@mantine/core';
import { TextWithElements } from './TextWithElements';
import useStyles from './Ideas.styles';

export interface IdeasProps {
  introjects?: string[];
  beliefs?: string[];
  creed?: string;
}

export function Ideas({ introjects, beliefs, creed }: IdeasProps) {
  const { classes } = useStyles();

  return (
    <div className={classes.root}>
      {introjects && introjects.length > 0 && (
        <Box className={classes.group}>
          <Animator combine merge manager="stagger" duration={{ exiting: 0.4, entering: 0.4 }}>
            <Text as="h3">Интроекты</Text>
          </Animator>
          <Box>
            {introjects.map((item, index) => (
              <Box mb={20} key={index}>
                <TextWithElements>{item}</TextWithElements>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {beliefs && beliefs.length > 0 && (
        <Box className={classes.group}>
          <Animator combine merge manager="stagger" duration={{ exiting: 0.4, entering: 0.4 }}>
            <Text as="h3">Убеждения</Text>
          </Animator>
          <Box>
            {beliefs.map((item, index) => (
              <Box mb={20} key={index}>
                <TextWithElements>{item}</TextWithElements>
              </Box>
            ))}
          </Box>
        </Box>
      )}
      {creed && (
        <Box className={classes.group}>
          <Animator combine merge manager="stagger" duration={{ exiting: 0.4, entering: 0.4 }}>
            <Text as="h3">Кредо</Text>
          </Animator>
          <TextWithElements>{creed}</TextWithElements>
        </Box>
      )}
    </div>
  );
}
