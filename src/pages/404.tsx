import { Animator } from '@arwes/react';
import { Error } from '@src/components/Error';

export default function Restricted() {
  return (
    <Animator combine manager="stagger">
      <Error type="notFound" />
    </Animator>
  );
}
