import React, { useEffect, useState } from 'react';
import { useForm, isNotEmpty } from '@mantine/form';
import { Box, Collapse, Group, Input, Select, Stack, TextInput } from '@mantine/core';
import { Text } from '@arwes/react';
import { Button } from '@src/components/Button';
import { ChevronDownIcon, PlusIcon } from '@src/components/icons';
import { SelectElement } from '../SelectElement';
import useStyles from './AddForm.styles';

const elementError = {
  introjects: 'Интроект должен иметь 2 стихии',
  convictions: 'Убеждение должно иметь 3 стихии',
};

const elementLength = {
  introjects: 2,
  convictions: 3,
};

const errText = (type: string) =>
  `Вы не можете добавить больше ${type}, так как их количество не может быть больше пяти`;

const massErr =
  'Вы не можете добавить новые идеи, так как они достигли максимального количества. Пожалуйста, очистите идеи, чтобы добавить новые';

export function AddForm({
  introjectsLength,
  convictionsLength,
  onAdd,
}: {
  introjectsLength: number;
  convictionsLength: number;
  onAdd(idea: string, type: string): void;
}) {
  const { classes, theme } = useStyles();
  const [elements, setElements] = useState<string[]>([]);
  const [lengthError, setLengthError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      type: 'introjects',
      elements: '',
      text: '',
    },

    validate: {
      elements: (value, values) =>
        values.elements.length === elementLength[values.type as keyof typeof elementLength]
          ? null
          : elementError[values.type as keyof typeof elementLength],
      text: isNotEmpty('Это обязательное поле'),
    },
  });

  const checkLength = () =>
    form.values.type === 'introjects' ? introjectsLength < 5 : convictionsLength < 5;

  const add = () => {
    if (!form.validate().hasErrors) {
      if (checkLength()) {
        onAdd(`${form.values.text} -- ${form.values.elements}`, form.values.type);
        form.reset();
        setElements([]);
      } else {
        setLengthError(errText(form.values.type === 'introjects' ? 'интроектов' : 'убеждений'));
      }
    }
  };

  useEffect(() => {
    setElements([...Array(elementLength[form.values.type as keyof typeof elementLength])]);
    form.setFieldValue('elements', '');
  }, [form.values.type]);

  useEffect(() => {
    setLengthError(null);
  }, [form.values]);

  return (
    <>
      <Collapse in={introjectsLength < 5 || convictionsLength < 5}>
        <Box mt={50}>
          <Text as="h3">Новая идея</Text>
          <Group align="top">
            <Select
              label="Тип идеи"
              classNames={classes}
              rightSection={<ChevronDownIcon size={14} color={theme.colors.maitreya[3]} />}
              rightSectionWidth={24}
              data={[
                { value: 'introjects', label: 'Интроект' },
                { value: 'convictions', label: 'Убеждение' },
              ]}
              {...form.getInputProps('type')}
            />
            <Stack spacing={0}>
              <Input.Label sx={{ color: theme.colors.maitreya[1], lineHeight: 1.55 }} pt={3}>
                Стихии
              </Input.Label>
              <Group>
                {[...Array(elementLength[form.values.type as keyof typeof elementLength])].map(
                  (_, i) => (
                    <SelectElement
                      key={i}
                      value={elements[i]}
                      error={form.errors.elements}
                      onAdd={(value) => {
                        const clone = [...elements];
                        clone[i] = value;
                        setElements(clone);
                        form.setFieldValue('elements', clone.filter((l) => !!l).join(''));
                      }}
                    />
                  )
                )}
              </Group>
              <Input.Error
                pt={5}
                sx={{
                  width:
                    60 * elementLength[form.values.type as keyof typeof elementLength] +
                    16 * (elementLength[form.values.type as keyof typeof elementLength] - 1),
                }}
              >
                {form.errors.elements}
              </Input.Error>
            </Stack>
            <TextInput
              style={{ flexGrow: 1 }}
              classNames={classes}
              label="Описание"
              {...form.getInputProps('text')}
            />
            <Button sx={{ height: 54 }} mt={12} color="maitreya" onClick={add} rightIcon={PlusIcon}>
              Добавить
            </Button>
          </Group>
        </Box>
      </Collapse>
      <Collapse in={!!lengthError}>
        <Box pt={40}>
          <Text className={classes.error}>{lengthError}</Text>
        </Box>
      </Collapse>
      {introjectsLength === 5 && convictionsLength === 5 && (
        <Box pt={40}>
          <Text className={classes.error}>{massErr}</Text>
        </Box>
      )}
    </>
  );
}
