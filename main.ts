type Translations = {
  [key: string]: string | undefined;
};

type OptionalTranslations = {
  default?: string;
};

const appTranslations: Translations = {
  en: 'Failure is simply the opportunity to begin again, but this time smarter.',
  ua: 'Невдача — це просто можливість почати знову, але цього разу розумніше.',
  fr: "L'échec est simplement l'occasion de recommencer, mais cette fois-ci avec plus d'intelligence.",
  de: 'Misserfolg ist einfach die Gelegenheit, noch einmal anzufangen, aber dieses Mal klüger.',
  fi: 'Epäonnistuminen on vain mahdollisuus aloittaa alusta, mutta tällä kertaa viisaammin.',
};

const france = 'fi';
const poland = 'pl';

appTranslations[poland].toUpperCase();
appTranslations[france].toUpperCase();

const defaultName: OptionalTranslations = {
  default: 'Cześć',
};
const someTranslations: Translations = defaultName;
