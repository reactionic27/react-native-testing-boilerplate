import {faker} from '@faker-js/faker';

export const mockedResult = Array.from({length: 20}).map(() => {
  return {
    id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    status: faker.word.adjective(),
    species: faker.word.adjective(),
    type: faker.word.adjective(),
    gender: faker.word.adjective(),
    origin: {
      name: faker.word.adjective(),
      url: faker.image.avatar(),
    },
    location: {
      name: faker.word.adjective(),
      url: faker.image.avatar(),
    },
    image: faker.image.avatar(),
    episode: [faker.image.avatar()],
    url: faker.image.avatar(),
    created: faker.date.past().toISOString(),
  };
});

export const mockedInfo = {
  count: 826,
  pages: 42,
  next: 'https://rickandmortyapi.com/api/character?page=2',
  prev: null,
};
