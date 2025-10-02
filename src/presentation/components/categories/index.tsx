import { ScrollView, View } from 'react-native';

import { CategoryBadge } from '../';
import { Category } from '../../../domain/entities';

type CategoriesProps = {
  categories: Category[];
  categorySelected: string;
  onSelect: (category: Category) => void;
};

export const Categories = ({
  categories,
  categorySelected,
  onSelect,
}: CategoriesProps) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {categories.map((category) => (
        <View style={{ marginHorizontal: 4 }} key={`category-${category.id}`}>
          <CategoryBadge
            category={category}
            isSelected={categorySelected === category.id}
            onSelect={onSelect}
          />
        </View>
      ))}
    </ScrollView>
  );
};
