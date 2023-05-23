import { Asset } from 'contentful';
import {
  isTypeCombat,
  isTypeRituals,
  isTypeStands,
  TypeCombat,
  TypeRituals,
  TypeStands,
  TypeStandsSkeleton,
} from '@src/util/types';
import { Document } from '@contentful/rich-text-types';

type Standard = 'Воин' | 'Навигатор' | 'Телепат' | 'Целитель';
type State = 'И в фуге, и вне фуги' | 'Только в фуге' | 'Только вне фуги';
type Level = 'Адепт' | 'Мастер' | 'Ученик';
type Type = 'Ближний бой' | 'Восстановление' | 'Защита' | 'Навигация' | 'Стрельба' | 'Телепатия';
type Target = '1 цель' | '2 цели' | '3 цели' | 'Все поле' | 'Конус (до 180°)' | 'На себя';

export type TechnicProps = {
  name: string;
  restricted?: boolean;
  standard?: Standard;
  stand?: TypeStandsSkeleton;
  state?: State;
  will?: number;
  elements?: string;
  level?: Level;
  type?: Type;
  target?: Target;
  touch?: boolean;
  effect?: string;
  description?: Document;
  video?: Asset;
  manifest?: Document;
};

export function mapTechnicData(data: TypeStands | TypeCombat | TypeRituals): TechnicProps {
  const { fields } = data;
  return {
    name: fields.name as string,
    restricted: fields.restricted as boolean,
    standard: !isTypeStands(data)
      ? ((data as TypeRituals | TypeCombat).fields.standard as unknown as Standard)
      : undefined,
    stand: isTypeCombat(data)
      ? ((data as TypeCombat).fields.stand as unknown as TypeStandsSkeleton)
      : undefined,
    state: isTypeCombat(data) ? ((data as TypeCombat).fields.state as unknown as State) : undefined,
    will: !isTypeStands(data)
      ? ((data as TypeRituals | TypeCombat).fields.will as number)
      : undefined,
    elements: !isTypeStands(data)
      ? ((data as TypeRituals | TypeCombat).fields.elements as string)
      : undefined,
    level: fields.level as Level,
    type: !isTypeRituals(data)
      ? ((data as TypeStands | TypeCombat).fields.type as Type)
      : undefined,
    target: isTypeCombat(data) ? ((data as TypeCombat).fields.target as Target) : undefined,
    touch: isTypeCombat(data) ? ((data as TypeCombat).fields.touch as boolean) : undefined,
    effect: !isTypeStands(data)
      ? ((data as TypeRituals | TypeCombat).fields.effect as string)
      : undefined,
    description: data.fields.description as Document,
    video: !isTypeRituals(data)
      ? ((data as TypeCombat | TypeStands).fields.video as Asset)
      : undefined,
    manifest: isTypeRituals(data) ? ((data as TypeRituals).fields.manifest as Document) : undefined,
  };
}
