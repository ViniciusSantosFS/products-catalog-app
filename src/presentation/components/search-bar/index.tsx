import { StyleSheet, TextInput, View } from 'react-native';
import { COLORS } from '../../constants';

type Props = {
  value: string;
  onSearch: (value: string) => void;
};

export const SearchBar = ({ value, onSearch }: Props) => {
  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        value={value}
        placeholder="Search a product by name"
        onChangeText={onSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    paddingVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 5,
    padding: 10,
  },
});
