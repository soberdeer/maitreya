import { TypeElementsFields } from '@src/util/types';
import { Asset } from 'contentful';

export type MappedElements = {
  name?: string;
  shortname?: string;
  eng_key?: string;
  color?: string;
  image?: Asset;
};

export const mapElements = (elements: TypeElementsFields[]): MappedElements[] =>
  elements.map((element) => ({
    name: element.name as unknown as string,
    shortname: element.shortname as unknown as string,
    eng_key: element.eng_key as unknown as string,
    color: element.color as unknown as string,
    image: element.image as unknown as Asset,
  }));
