import { SpotlightActionProps } from '@mantine/spotlight';
import { Highlight, Text, UnstyledButton } from '@mantine/core';
import useStyles from './Action.styles';

export function Action({
  action,
  styles,
  classNames,
  hovered,
  query,
  onTrigger,
  highlightQuery,
  ...others
}: SpotlightActionProps & { query: string }) {
  const { classes } = useStyles();
  return (
    <UnstyledButton
      className={classes.action}
      data-hovered={hovered || undefined}
      tabIndex={-1}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onTrigger}
      {...others}
    >
      <Text className={classes.title}>{action.title}</Text>

      {action.description && (
        <Highlight
          className={classes.description}
          size="xs"
          highlight={query.split(' ').filter((str) => str.length > 2)}
          highlightStyles={() => ({
            backgroundColor: 'transparent',
            color: 'rgba(0, 255, 255, 1)',
            fontWeight: 700,
          })}
        >
          {action.description}
        </Highlight>
      )}
    </UnstyledButton>
  );
}
