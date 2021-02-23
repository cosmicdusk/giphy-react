import { StyleSheet } from 'react-native';

// You should not separate the styles from the view. This is something that was
// done in web apps but we don't do it in RN apps. Also, there is an increasing
// number of web apps that are nesting scoped styles within the same files anyway.
const styles = StyleSheet.create({
  imageContainerStyle: {
    backgroundColor: 'green',
  },
  listContainerStyle: {
    backgroundColor: 'black',
  },
});

export { styles };
