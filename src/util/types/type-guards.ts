import type { Entry, EntrySkeletonType } from 'contentful';
import {
  TypeArticles,
  TypeBlock,
  TypeCombat,
  TypeElements,
  TypeHouse,
  TypeMain,
  TypeMain_page,
  TypePage,
  TypePost,
  TypeRituals,
  TypeStands,
  TypeUsers,
} from '@src/util/types/content-types';

export function isTypeArticles(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeArticles {
  return entry.sys.contentType.sys.id === 'articles';
}

export function isTypeBlock(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeBlock {
  return entry.sys.contentType.sys.id === 'block';
}

export function isTypeCombat(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeCombat {
  return entry.sys.contentType.sys.id === 'combat';
}

export function isTypeElements(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeElements {
  return entry.sys.contentType.sys.id === 'elements';
}

export function isTypeHouse(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeHouse {
  return entry.sys.contentType.sys.id === 'house';
}

export function isTypeMain_page(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeMain_page {
  return entry.sys.contentType.sys.id === 'main_page';
}

export function isTypeMain(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeMain {
  return entry.sys.contentType.sys.id === 'main';
}

export function isTypePage(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypePage {
  return entry.sys.contentType.sys.id === 'page';
}

export function isTypePost(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypePost {
  return entry.sys.contentType.sys.id === 'post';
}

export function isTypeRituals(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeRituals {
  return entry.sys.contentType.sys.id === 'rituals';
}

export function isTypeStands(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeStands {
  return entry.sys.contentType.sys.id === 'stands';
}

export function isTypeUsers(
  entry: Entry<EntrySkeletonType, 'WITHOUT_UNRESOLVABLE_LINKS', 'ru-RU'>
): entry is TypeUsers {
  return entry.sys.contentType.sys.id === 'users';
}
