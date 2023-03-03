import React from 'react';
import { Text } from '../../../arwes';
import TextWithElements from './TextWithElements/TextWithElements';
import useStyles from './Ideas.styles';

export default function Ideas({
  introjects,
  beliefs,
  creed,
}: {
  introjects?: string[];
  beliefs?: string[];
  creed?: string;
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {introjects && introjects.length > 0 && (
        <div className={classes.group}>
          <Text as="h3">Интроекты</Text>
          <div>
            {introjects.map((item, index) => (
              <TextWithElements key={index}>{item}</TextWithElements>
            ))}
          </div>
        </div>
      )}
      {beliefs && beliefs.length > 0 && (
        <div className={classes.group}>
          <Text as="h3">Убеждения</Text>
          <div>
            {beliefs.map((item, index) => (
              <TextWithElements key={index}>{item}</TextWithElements>
            ))}
          </div>
        </div>
      )}
      {creed && (
        <div className={classes.group}>
          <Text as="h3">Кредо</Text>
          <TextWithElements>{creed}</TextWithElements>
        </div>
      )}
    </div>
  );
}
