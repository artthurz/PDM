import * as Linking from 'expo-linking';

export default {
  prefixes: [Linking.makeUrl('/')],
  config: {
    screens: {
      Root: {
        screens: {
          createItem: {
            screens: {
              Itens: 'one',
            },
          },
          listItems: {
            screens: {
              ListItems: 'two',
            },
          },
        },
      },
      NotFound: '*',
    },
  },
};
