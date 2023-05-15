import React from 'react';
import { Text } from '@arwes/react';
import { Entry } from 'contentful';
import {
  Block,
  BLOCKS,
  Hyperlink,
  INLINES,
  Table as TableBlock,
} from '@contentful/rich-text-types';
// import Anchor from '../Anchor/Anchor';
// import Image from '../Image/Image';
// import { Circle } from 'react-feather';
import { TypeFetch } from '@src/util/types';
import { Anchor } from '@src/components/Anchor';
import { MantineTheme } from '@mantine/core';
import { Video } from '../Video/Video';

const linkMap = {
  articles: '/articles/',
};

export const options = (
  classes: Record<string | number | symbol, string>,
  theme: MantineTheme,
  fullImage?: boolean
) => ({
  renderNode: {
    [BLOCKS.EMBEDDED_ENTRY]: (node: { data: { target: Entry<any> } }) => {
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
    [INLINES.EMBEDDED_ENTRY]: ({ data }: { data: { target: TypeFetch } }) => {
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
    [BLOCKS.EMBEDDED_ASSET]: (node: Block) => {
      const { title, description } = node.data.target.fields;
      const { url } = node.data.target.fields.file;

      // console.log(node.data.target.fields?.file);
      if (node.data.target.fields?.file?.contentType?.includes('image')) {
        return (
          <div className={classes.imageWrapper}>
            image
            {/*<Image*/}
            {/*  src={url}*/}
            {/*  alt={title}*/}
            {/*  className={classes.asset}*/}
            {/*  fullImage={fullImage}*/}
            {/*  imageWidth={node.data.target.fields.file?.details?.image?.width}*/}
            {/*  imageHeight={node.data.target.fields.file?.details?.image?.height}*/}
            {/*>*/}
            {/*  {description}*/}
            {/*</Image>*/}
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
    [BLOCKS.LIST_ITEM]: (node: Block, children: React.ReactNode) => (
        <li className={classes.listItem}>
          <Text as="span">{children}</Text>
          {/*<TextWithIcon*/}
          {/*  icon={Circle}*/}
          {/*  iconProps={{*/}
          {/*    size: 7,*/}
          {/*    fill: palette ? palette.primary.main : 'currentColor',*/}
          {/*    stroke: palette ? palette.primary.main : 'currentColor',*/}
          {/*  }}*/}
          {/*  className={classes.listItemContent}*/}
          {/*  wrapperProps={{ style: { marginTop: 8 } }}*/}
          {/*  iconWrapperProps={{ style: { transform: 'translateY(calc(-100% + 12px))' } }}*/}
          {/*>*/}
          {/*  {children}*/}
          {/*</TextWithIcon>*/}
        </li>
      ),
    // [BLOCKS.PARAGRAPH]: (node: Block, children: React.ReactNode) => (
    //     <Text as="p">{children}</Text>
    // ),
    [INLINES.HYPERLINK]: (node: Hyperlink, children: React.ReactNode) => (
      <Anchor href={node.data.uri} color="maitreyaSecondary">
        {children}
      </Anchor>
    ),
    [BLOCKS.HEADING_1]: (node: Block, children: React.ReactNode) => (
      <Text as="h1" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (node: Block, children: React.ReactNode) => (
      <Text as="h2" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_3]: (node: Block, children: React.ReactNode) => (
      <Text as="h3" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_4]: (node: Block, children: React.ReactNode) => (
      <Text as="h4" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_5]: (node: Block, children: React.ReactNode) => (
      <Text as="h5" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_6]: (node: Block, children: React.ReactNode) => (
      <Text as="h6" color={theme.colors.maitreyaSecondary[4]}>
        {children}
      </Text>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: TableBlock, children: React.ReactNode) => children,
    [BLOCKS.TABLE_CELL]: (node: TableBlock, children: React.ReactNode) => children,
    [BLOCKS.TABLE]: (node: TableBlock, children: React.ReactNode) =>
       children
      // const withHeaders = node.content[0].content[0].nodeType === BLOCKS.TABLE_HEADER_CELL;
      // const headers = withHeaders
      //   ? node.content[0].content.map((item, index) => ({
      //       id: index,
      //       data: children[0].props.children[index],
      //     }))
      //   : null;
      // const rows = withHeaders ? node.content.slice(1) : node.content;
      // const dataset = rows.map((item, index) => ({
      //   id: withHeaders ? index + 1 : index,
      //   columns: item.content.map((cell, j) => {
      //     return {
      //       id: `${withHeaders ? index + 1 : index}_${j}`,
      //       data: children[withHeaders ? index + 1 : index].props.children[j],
      //     };
      //   }),
      // }));
      // return (
      //   <div className={classes.tableWrapper}>
      //     <Table
      //       condensed
      //       className={classes.table}
      //       headers={headers || []}
      //       dataset={dataset || []}
      //     />
      //   </div>
      // );
    ,
  },
});
