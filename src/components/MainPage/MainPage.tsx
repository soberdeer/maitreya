import React from 'react';
import { Animated, AnimatedProps, Animator, Text } from '@arwes/react';
import { TypeMain_page } from '@src/util/types';
import { RichText } from '@src/components/RichText';
import { FrameWrapper } from '@src/components/FrameWrapper';
import useStyles from './MainPage.styles';

interface MainPageProps extends AnimatedProps {
  data: TypeMain_page;
}

export function MainPage({ data, ...rest }: MainPageProps) {
  const { classes } = useStyles();

  return (
    // <Animator merge>
      <Animated as="header" {...rest}>
        {data.fields?.top_post?.fields?.content && (
          <Animator merge duration={{ enter: 0.4, exit: 0.4 }}>
            <FrameWrapper className={classes.frameWrapper}>
              <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
                <RichText content={data.fields.top_post.fields.content} fullImage />
              </Animator>
            </FrameWrapper>
          </Animator>
        )}
        {data.fields?.posts?.map((post, index) =>
          post?.fields.content ? (
            <Animator key={index} merge duration={{ enter: 0.4, exit: 0.4 }}>
              <FrameWrapper className={classes.frameWrapper}>
                <div style={{ width: '100%' }}>
                  <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
                    <RichText content={post.fields.content} />
                  </Animator>
                  {post.fields.date && (
                    <div className={classes.dateWrapper}>
                      <Animator duration={{ delay: 0.4, stagger: 0.1 }}>
                        <Text>{post.fields.date.split('-').reverse().join('-')}</Text>
                      </Animator>
                    </div>
                  )}
                </div>
              </FrameWrapper>
            </Animator>
          ) : null
        )}
      </Animated>
    // </Animator>
  );
}
