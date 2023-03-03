import React from 'react';
import { Entry } from 'contentful';
import { MainPageType } from '../../util/types';
import { Text } from '../arwes';
import FrameWrapper from '../FrameWrapper/FrameWrapper';
import RichText from '../RichText/RichText';
import useStyles from './MainPage.styles';

export default function MainPage({ data }: { data: Entry<MainPageType> }) {
  const classes = useStyles();

  return (
    <>
      {data.fields?.top_post?.fields?.content && (
        <FrameWrapper className={classes.frameWrapper}>
          <RichText content={data.fields.top_post.fields.content} fullImage />
        </FrameWrapper>
      )}
      {data.fields?.posts?.map((post, index) =>
        post.fields.content ? (
          <FrameWrapper key={index} className={classes.frameWrapper}>
            <div style={{ width: '100%' }}>
              <RichText content={post.fields.content} />
              {post.fields.date && (
                <div className={classes.dateWrapper}>
                  <Text styledFont>{post.fields.date.split('-').reverse().join('-')}</Text>
                </div>
              )}
            </div>
          </FrameWrapper>
        ) : null
      )}
    </>
  );
}
