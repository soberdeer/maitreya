import { Animator } from '@arwes/react';
import { Error } from '@src/components/Error';

export default function ServerError() {
  return (
    <Animator combine manager="stagger">
      <Error type="changeFail" />
    </Animator>
  );
}
