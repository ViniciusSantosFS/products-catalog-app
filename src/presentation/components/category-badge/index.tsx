import { Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';

type Props = {
  category: Category;
  isSelected: boolean;
  onSelect: (category: Category) => void;
};

type Category = {
  id: string;
  name: string;
};

export const CategoryBadge = ({ category, onSelect, isSelected }: Props) => {
  return (
    <Pressable
      testID={`category-badge-${category.id}`}
      onPress={() => onSelect(category)}
    >
      <View
        style={[
          styles.badge,
          { backgroundColor: isSelected ? COLORS.green : COLORS.white },
        ]}
      >
        <Text>{category.name}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  badge: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    borderColor: COLORS.green,
  },
});
