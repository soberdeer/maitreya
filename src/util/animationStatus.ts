const ENTERING = 'entering';
const ENTERED = 'entered';
const EXITING = 'exiting';
const EXITED = 'exited';

export type StatusType = 'entering' | 'entered' | 'exiting' | 'exited';

const getAnimationStatusState = (status: StatusType) => ({
  status,
  [ENTERING]: status === ENTERING,
  [ENTERED]: status === ENTERED,
  [EXITING]: status === EXITING,
  [EXITED]: status === EXITED,
});

export { ENTERING, ENTERED, EXITING, EXITED, getAnimationStatusState };
