const letters = {
  а: 'a',
  б: 'b',
  в: 'v',
  д: 'd',
  з: 'z',
  й: 'y',
  к: 'k',
  л: 'l',
  м: 'm',
  н: 'n',
  о: 'o',
  п: 'p',
  р: 'r',
  с: 's',
  т: 't',
  у: 'u',
  ф: 'f',
  ь: '',
  г: 'g',
  и: 'i',
  ъ: '',
  ы: 'i',
  э: 'e',
  ё: 'yo',
  ж: 'zh',
  х: 'kh',
  ц: 'ts',
  ч: 'ch',
  ш: 'sh',
  щ: 'shch',
  ю: 'yu',
  я: 'ya',
};

export function translit(phrase?: string) {
  if (!phrase) {
    return null;
  }

  return phrase
    .toLowerCase()
    .split('')
    .map((char) => {
      if (char in letters) {
        return letters[char as keyof typeof letters];
      }
      if (char.match('[a-zа-я]')) {
        return '';
      }
      return '_';
    })
    .join('');
}
