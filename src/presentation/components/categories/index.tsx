import { ScrollView } from 'react-native';

import { CategoryBadge } from '../';

type Category = {
  id: string;
  name: string;
};

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
        <CategoryBadge
          category={category}
          isSelected={categorySelected === category.id}
          key={`category-${category.id}`}
          onSelect={onSelect}
        />
      ))}
    </ScrollView>
  );
};
