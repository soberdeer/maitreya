import React, { SVGProps } from 'react';
import { Animated, Text, Animator, aaVisibility } from '@arwes/react';
import { Asset } from 'contentful';
import {
  Block,
  BLOCKS,
  Inline,
  INLINES,
  Table as TableBlock,
  TableRow,
} from '@contentful/rich-text-types';
import { MantineTheme, List, Center, Text as MantineText } from '@mantine/core';
import { Anchor } from '@src/components/Anchor';
import { Image } from '@src/components/Image';
import { Table } from '@src/components/Table';
import { Video } from '@src/components/Video';
import { Frame } from '@src/components/Frame';
import { Blockquote } from '@src/components/Blockquote';

export const options = (
  classes: Record<string | number | symbol, string>,
  theme: MantineTheme,
  fullImage?: boolean
) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: Block | Inline) => {
      const entry = node?.data?.target;
      let middleLink;
      if (['combat', 'stands', 'rituals'].includes(entry?.sys?.contentType?.sys?.id)) {
        middleLink = '/technics/';
      }
      if (entry?.sys?.contentType?.sys?.id === 'articles') {
        middleLink = entry.fields?.tags === 'модели' ? '/models/' : '/setting/';
      }

      return middleLink ? (
        <div>
          <Anchor href={`${middleLink}${entry?.sys?.id}`} color="maitreyaSecondary">
            {(entry?.fields.name as string) || ''}
          </Anchor>
        </div>
      ) : null;
    },
    [INLINES.EMBEDDED_ENTRY]: ({ data }: Block | Inline) => {
      const entry = data?.target;
      let middleLink;
      if (['combat', 'stands', 'rituals'].includes(entry?.sys?.contentType?.sys?.id)) {
        middleLink = '/technics/';
      }
      if (entry?.sys?.contentType?.sys?.id === 'articles') {
        middleLink = entry.fields?.tags === 'модели' ? '/models/' : '/setting/';
      }

      return middleLink ? (
        <Anchor href={`${middleLink}${entry?.sys?.id}`} color="maitreyaSecondary">
          {(entry?.fields.name as string) || ''}
        </Anchor>
      ) : null;
    },
    [BLOCKS.EMBEDDED_ASSET]: (node: Block | Inline) => {
      const { description } = node.data.target.fields;
      if (node.data.target.fields?.file?.contentType?.includes('image')) {
        return (
          <div className={classes.imageWrapper}>
            <Image
              image={node.data.target as Asset}
              className={classes.asset}
              fullImage={fullImage}
            >
              {description}
            </Image>
          </div>
        );
      }

      if (node.data.target.fields?.file?.contentType?.includes('video')) {
        return (
          <Video
            type={node.data.target.fields?.file?.contentType}
            title={node.data.target.fields?.title}
            src={node.data.target.fields?.file?.url}
          />
        );
      }

      return (
        <div style={{ marginBottom: 20 }}>
          <Anchor
            href={`https:${node.data.target.fields?.file?.url}`}
            color="maitreyaSecondary"
            target="_blank"
          >
            {node.data.target.fields?.title}
          </Anchor>
        </div>
      );
    },
    [BLOCKS.QUOTE]: (node: Block | Inline, children: React.ReactNode) => (
      <Animator duration={{ enter: 0.4, exit: 0.4 }}>
        <Blockquote>{children}</Blockquote>
      </Animator>
    ),
    [BLOCKS.HR]: () => (
      <Animator duration={{ enter: 0.4, exit: 0.4 }}>
        <Frame sx={{ width: '100%', height: 0, marginBottom: '1rem' }} />
      </Animator>
    ),
    [BLOCKS.UL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <Animated animated={aaVisibility()}>
        <List
          withPadding
          sx={{ marginBlockEnd: '2rem' }}
          icon={
            <Center sx={{ height: '100%', marginTop: 7 }}>
              <Animator duration={{ enter: 0.4, exit: 0.4 }}>
                <svg className={classes.circleSvg} viewBox="0 0 50 50" width={8} height={8}>
                  <Animated<SVGPathElement, SVGProps<SVGPathElement>>
                    animated={{
                      initialStyle: { strokeDashoffset: 100 },
                      transitions: {
                        entering: { strokeDashoffset: 0 },
                        exiting: { strokeDashoffset: 100 },
                      },
                    }}
                    as="path"
                    d="M1.07 12.99A11.93 11.93 0 1013 1.06 11.93 11.93 0 001.07 12.99"
                    fill="none"
                    stroke={theme.colors.maitreya[3]}
                    strokeWidth={10}
                    // className={classes.circle}
                    style={{ transform: 'translate(40%, 40%)' }}
                  />
                </svg>
              </Animator>
            </Center>
          }
        >
          {children}
        </List>
      </Animated>
    ),
    [BLOCKS.OL_LIST]: (node: Block | Inline, children: React.ReactNode) => (
      <Animated animated={aaVisibility()}>
        <List type="ordered" withPadding sx={{ marginBlockEnd: '2rem' }}>
          {children}
        </List>
      </Animated>
    ),
    [BLOCKS.LIST_ITEM]: (node: Block | Inline, children: React.ReactNode) => {
      const newChildren = Array.isArray(children)
        ? children.map((child) => (child.props.as === 'p' ? child.props.children : child))
        : (children as React.ReactElement)?.props?.as === 'p'
        ? [(children as React.ReactElement)?.props?.children]
        : [children];
      return (
        <List.Item sx={{ color: theme.colors.maitreya[3], marginBottom: '1rem' }}>
          {newChildren.map((child, index) =>
            !child.$$typeof ? <MantineText key={index}>{child}</MantineText> : child
          )}
        </List.Item>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="p">{children}</Text>
    ),
    [INLINES.HYPERLINK]: (node: Block | Inline, children: React.ReactNode) => (
      <Anchor href={node.data.uri} color="maitreyaSecondary">
        {children}
      </Anchor>
    ),
    [BLOCKS.HEADING_1]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h1" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h2" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_3]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h3" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_4]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h4" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_5]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h5" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_6]: (node: Block | Inline, children: React.ReactNode) => (
      <Text as="h6" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: () => null,
    [BLOCKS.TABLE_CELL]: () => null,
    [BLOCKS.TABLE]: (node: Block | Inline) => {
      const n = node as TableBlock;
      const withHeaders = n.content[0].content[0].nodeType === BLOCKS.TABLE_HEADER_CELL;

      const headers = withHeaders
        ? n.content[0].content.map((item) => item.content.map((k) => k.content))
        : null;
      const rows = withHeaders ? n.content.slice(1) : node.content;
      return (
        <Table
          headers={headers}
          rows={rows.map((row) =>
            (row as TableRow).content.map((item) => item.content.map((k) => k.content))
          )}
        />
      );
    },
  },
});
