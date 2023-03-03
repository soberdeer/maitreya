import React, { useContext } from 'react';
import cx from 'clsx';
import ElementsContext from '../contexts/ElementsContext';
import AnimatedIcon from '../AnimatedIcon/AnimatedIcon';
import useStyles from './ElementTags.styles';

export interface ElementTagsProps extends React.HTMLProps<HTMLHeadingElement> {
  elements: string;
  size?: number;
}

export default function ElementTags({
  className,
  elements,
  size = 26,
  ...others
}: ElementTagsProps) {
  const classes = useStyles({ size });
  const { elements: elementsData } = useContext(ElementsContext);

  if (!elements) {
    return null;
  }

  return (
    <div className={cx(classes.root, className)} {...others}>
      {elements
        .toLowerCase()
        .split('')
        .map((elementKey, index) => {
          const element = elementsData.find((el) => el.shortname.toLowerCase() === elementKey);
          if (!element) {
            return null;
          }
          return (
            <div className={classes.iconWrapper} key={index}>
              <AnimatedIcon width={size} height={size}>
                <div
                  className={classes.imageWrapper}
                  style={{ border: `1px solid ${element.color}` }}
                >
                  <img
                    className={classes.image}
                    src={element.image.fields.file.url}
                    alt={element.name}
                  />
                </div>
              </AnimatedIcon>
            </div>
          );
        })}
    </div>
  );
}
