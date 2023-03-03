import React from 'react';
import { FileText } from 'react-feather';
import { UserProps } from '../../../../util/types';
import { Text, TextWithIcon } from '../../../arwes';
import Ring from '../Ring/Ring';
import House from '../House/House';
import Honor from '../Honor/Honor';
import Ranking from '../Ranking/Ranking';
import Anchor from '../../../Anchor/Anchor';
import useStyles from './TopPart.styles';

export default function TopPart({ user }: { user: UserProps }) {
  const classes = useStyles({ longName: user.name?.length > 20 });

  return (
    <div className={classes.root}>
      <Ring size={300} avatar={user?.avatar_profile?.fields?.file?.url} />
      <div>
        <Text as="h1" className={classes.name}>
          <div className={classes.flex} style={{ alignItems: 'flex-start' }}>
            {user.order && <House house={user.order?.fields} homeless={false} />}
            {user.house && <House house={user.house?.fields} homeless={user.homeless} />}
            <span>{user.name}</span>
          </div>
        </Text>
        {user.honor && (
          <div className={classes.text} style={{ marginBottom: 20 }}>
            <Honor honor={user.honor} />
          </div>
        )}
        {user.rank_number && user.rank_group && (
          <Text className={classes.text} styledFont>
            <Ranking
              rankGroup={user.rank_group}
              rankNumber={user.rank_number}
              style={{ marginBottom: 20, marginLeft: 0 }}
            />
          </Text>
        )}
        {user.profession && user.work && (
          <Text className={classes.text} style={{ marginBottom: 20, fontSize: 20 }} styledFont>
            {user.profession} - {user.work}
          </Text>
        )}
        {user.course && user.cadet_number && (
          <Text className={classes.text} style={{ marginBottom: 20, fontSize: 20 }} styledFont>
            {`Номер: ${user.course}-${user.cadet_number}`}
          </Text>
        )}
        {user.bio && (
          <div style={{ display: 'flex' }}>
            <Anchor href={user.bio} target="_blank" withHover>
              <TextWithIcon
                icon={FileText as unknown}
                iconProps={{ size: 20 }}
                styledFont
                palette="secondary"
                withHover
              >
                Биография
              </TextWithIcon>
            </Anchor>
          </div>
        )}
      </div>
    </div>
  );
}
