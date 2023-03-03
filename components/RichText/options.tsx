import React from 'react';
import { Table } from '@arwes/core';
import { Entry } from 'contentful';
import { Block, BLOCKS, INLINES, Table as TableBlock } from '@contentful/rich-text-types';
import Anchor from '../Anchor/Anchor';
import Image from '../Image/Image';
import { Text, TextWithIcon } from '../arwes';
import { Circle } from 'react-feather';
import { FetchType } from '../../util/types';
import Video from '../Video/Video';
import { defaultPalette } from '../../util/theme';

const linkMap = {
  articles: `/articles/`,
};

export const options = (
  classes: Record<string | number | symbol, string>,
  fullImage?: boolean,
  palette?: typeof defaultPalette
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
          <Anchor href={`${middleLink}${entry?.sys?.id}`} styledFont palette="secondary">
            {entry.fields.name}
          </Anchor>
        </div>
      ) : null;
    },
    [INLINES.EMBEDDED_ENTRY]: ({ data }: { data: { target: Entry<FetchType> } }) => {
      const entry = data?.target;
      let middleLink;
      if (['combat', 'stands', 'rituals'].includes(entry?.sys?.contentType?.sys?.id)) {
        middleLink = '/technics/';
      }
      if (entry?.sys?.contentType?.sys?.id === 'articles') {
        middleLink = entry.fields?.tags === 'модели' ? '/models/' : '/setting/';
      }

      return middleLink ? (
        <Anchor href={`${middleLink}${entry?.sys?.id}`} styledFont palette="secondary">
          {entry.fields.name}
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
            <Image
              src={url}
              alt={title}
              className={classes.asset}
              fullImage={fullImage}
              imageWidth={node.data.target.fields.file?.details?.image?.width}
              imageHeight={node.data.target.fields.file?.details?.image?.height}
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
            styledFont
            palette="secondary"
            target="_blank"
          >
            {node.data.target.fields?.title}
          </Anchor>
        </div>
      );

      return null;
    },
    [BLOCKS.LIST_ITEM]: (node: Block, children: React.ReactNode) => {
      return (
        <li className={classes.listItem}>
          <TextWithIcon
            icon={Circle}
            iconProps={{
              size: 7,
              fill: palette ? palette.primary.main : 'currentColor',
              stroke: palette ? palette.primary.main : 'currentColor',
            }}
            className={classes.listItemContent}
            wrapperProps={{ style: { marginTop: 8 } }}
            iconWrapperProps={{ style: { transform: 'translateY(calc(-100% + 12px))' } }}
          >
            {children}
          </TextWithIcon>
        </li>
      );
    },
    [BLOCKS.PARAGRAPH]: (node: Block, children: React.ReactNode) => (
      <div>
        <Text as="p" palette="primary">
          {children}
        </Text>
      </div>
    ),
    [BLOCKS.HEADING_1]: (node: Block, children: React.ReactNode) => (
      <Text as="h1" palette="secondary" style={{ marginTop: 60, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_2]: (node: Block, children: React.ReactNode) => (
      <Text as="h2" palette="secondary" style={{ marginTop: 55, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_3]: (node: Block, children: React.ReactNode) => (
      <Text as="h3" palette="secondary" style={{ marginTop: 50, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_4]: (node: Block, children: React.ReactNode) => (
      <Text as="h4" palette="secondary" style={{ marginTop: 45, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_5]: (node: Block, children: React.ReactNode) => (
      <Text as="h5" palette="secondary" style={{ marginTop: 40, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.HEADING_6]: (node: Block, children: React.ReactNode) => (
      <Text as="h6" palette="secondary" style={{ marginTop: 35, width: '100%' }}>
        {children}
      </Text>
    ),
    [BLOCKS.TABLE_HEADER_CELL]: (node: TableBlock, children: React.ReactNode) => children,
    [BLOCKS.TABLE_CELL]: (node: TableBlock, children: React.ReactNode) => children,
    [BLOCKS.TABLE]: (node: TableBlock, children: React.ReactNode) => {
      const withHeaders = node.content[0].content[0].nodeType === BLOCKS.TABLE_HEADER_CELL;
      const headers = withHeaders
        ? node.content[0].content.map((item, index) => ({
            id: index,
            data: children[0].props.children[index],
          }))
        : null;
      const rows = withHeaders ? node.content.slice(1) : node.content;
      const dataset = rows.map((item, index) => ({
        id: withHeaders ? index + 1 : index,
        columns: item.content.map((cell, j) => {
          return {
            id: `${withHeaders ? index + 1 : index}_${j}`,
            data: children[withHeaders ? index + 1 : index].props.children[j],
          };
        }),
      }));
      return (
        <div className={classes.tableWrapper}>
          <Table
            condensed
            className={classes.table}
            headers={headers || []}
            dataset={dataset || []}
          />
        </div>
      );
    },
  },
});
