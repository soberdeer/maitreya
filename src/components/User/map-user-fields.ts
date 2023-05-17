import {
  TypeArticles,
  TypeCombat,
  TypeHouse,
  TypeRituals,
  TypeStands,
  TypeUsers,
} from '@src/util/types';
import { Asset } from 'contentful';

export type MappedUser = {
  name?: string;
  code?: string;
  rating?: number;
  bio?: string;
  profession?: string;
  work?: string;
  rank_group?:
    | 'Высший офицерский состав'
    | 'До-офицерский состав'
    | 'Младший офицерский состав'
    | 'Старший офицерский состав';
  rank_number?:
    | '1 - курсант, младший лейтенант, капитан 3-го ранга, контр-адмирал'
    | '2 - младший сержант, лейтенант, капитан 2-го ранга, адмирал'
    | '3 - сержант, старший лейтенант, капитан 1-го ранга, адмирал флота'
    | '4 - энсин, капитан-лейтенант, командор, адмирал системы';
  course?: 'И' | 'Сан' | 'Эр';
  cadet_number?: number;
  homeless: boolean;
  house?: TypeHouse;
  order?: TypeHouse;
  start_health: number;
  start_will: number;
  honor?: 'Человек Высокой Чести' | 'Человек Чести' | 'Человек без Чести';
  introjects?: string[];
  beliefs?: string[];
  creed?: string;
  avatar_profile: Asset;
  avatar_chat: Asset;
  technics?: TypeCombat[];
  rituals?: TypeRituals[];
  personal_access?: (TypeArticles | TypeCombat | TypeStands | TypeRituals)[];
};

export const mapUserFields = ({ fields }: TypeUsers): MappedUser => ({
  name: fields.name ? (fields.name as string) : undefined,
  code: fields.code ? (fields.code as string) : undefined,
  rating: fields.rating as number,
  bio: fields.bio ? (fields.bio as string) : undefined,
  profession: fields.profession ? (fields.profession as string) : undefined,
  work: fields.work ? (fields.work as string) : undefined,
  rank_group: fields.rank_group as
    | 'Высший офицерский состав'
    | 'До-офицерский состав'
    | 'Младший офицерский состав'
    | 'Старший офицерский состав',
  rank_number: fields.rank_number as
    | '1 - курсант, младший лейтенант, капитан 3-го ранга, контр-адмирал'
    | '2 - младший сержант, лейтенант, капитан 2-го ранга, адмирал'
    | '3 - сержант, старший лейтенант, капитан 1-го ранга, адмирал флота'
    | '4 - энсин, капитан-лейтенант, командор, адмирал системы',
  course: fields.course as 'И' | 'Сан' | 'Эр',
  cadet_number: fields.cadet_number as number,
  homeless: fields.homeless as boolean,
  house: fields.house,
  order: fields.order,
  start_health: fields.start_health as number,
  start_will: fields.start_will as number,
  honor: fields.honor as 'Человек Высокой Чести' | 'Человек Чести' | 'Человек без Чести',
  introjects: fields.introjects as string[],
  beliefs: fields.beliefs as string[],
  creed: fields.creed as string,
  avatar_profile: fields.avatar_profile as Asset,
  avatar_chat: fields.avatar_chat as Asset,
  technics: (fields.technics || []) as TypeCombat[],
  rituals: (fields.rituals || []) as TypeRituals[],
  personal_access: (fields.personal_access || []) as (
    | TypeArticles
    | TypeCombat
    | TypeStands
    | TypeRituals
  )[],
});
