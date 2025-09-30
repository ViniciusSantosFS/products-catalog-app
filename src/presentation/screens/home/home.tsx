import {
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useDeferredValue, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ProductListUseCase } from '../../../domain/usecases';
import { CategoryListUseCase } from '../../../domain/usecases/category-list';
import { ProductItem } from '../../components/product-item';
import { COLORS } from '../../constants';
import { useListCategories } from '../../hooks/use-list-categories';
import { useListProducts } from '../../hooks/use-list-products';

type Props = {
  productListUseCase: ProductListUseCase;
  categoryListUseCase: CategoryListUseCase;
};

type CategoryProps = {
  category: Category;
  isSelected: boolean;
  onSelect: (category: Category) => void;
};

type Category = {
  id: string;
  name: string;
};

const CategoryBadge = ({ category, onSelect, isSelected }: CategoryProps) => {
  return (
    <Pressable onPress={() => onSelect(category)}>
      <View
        style={[
          styles.categoryBadge,
          { backgroundColor: isSelected ? COLORS.green : COLORS.white },
        ]}
      >
        <Text>{category.name}</Text>
      </View>
    </Pressable>
  );
};

type CategoriesProps = {
  categories: Category[];
  categorySelected: string;
  onSelect: (category: Category) => void;
};

const Categories = ({
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

type SearchBarProps = {
  value: string;
  onSearch: (value: string) => void;
};

const SearchBar = ({ value, onSearch }: SearchBarProps) => {
  const deferredValue = useDeferredValue(value, '');

  return (
    <View style={styles.searchBar}>
      <TextInput
        style={styles.searchInput}
        value={deferredValue}
        placeholder="Search By Name"
        onChangeText={onSearch}
      />
    </View>
  );
};

export const HomeScreen = ({
  productListUseCase,
  categoryListUseCase,
}: Props) => {
  const [search, setSearch] = useState('');
  const [categorySelected, setCategorySelected] = useState<string>('');
  const {
    products,
    fetchNextPage,
    hasNextPage,
    isLoading: isLoadingProducts,
  } = useListProducts({
    productListUseCase,
  });
  const {
    categories,
    isLoading: isLoadingCategories,
    isError,
  } = useListCategories({
    categoryListUseCase,
  });

  const handleSelectCategory = (category: Category) => {
    if (categorySelected === category.id) return setCategorySelected('');
    setCategorySelected(category.id);
  };

  if (isLoadingProducts || isLoadingCategories) return <ActivityIndicator />;

  const table = useReactTable({
    data: products ?? [],
    columns: [
      {
        accessorKey: 'title',
        header: 'Title',
      },
      {
        accessorKey: 'category',
        header: 'Category',
      },
    ],
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: search,
      columnFilters: [
        {
          id: 'category',
          value: categorySelected,
        },
      ],
    },
    onGlobalFilterChange: setSearch,
  });
  const rows = table.getRowModel().rows.map((row) => row.original);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.screenTitle}>Prodcuts</Text>
        <SearchBar value={search} onSearch={setSearch} />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Filter by Category</Text>

          <Categories
            categories={categories ?? []}
            categorySelected={categorySelected}
            onSelect={handleSelectCategory}
          />
        </View>

        <View style={{ paddingBottom: 20 }}>
          <FlatList
            testID="product-list"
            data={rows}
            onEndReachedThreshold={0.5}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <ProductItem product={item} key={`product-${index}`} />
            )}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            onEndReached={() => {
              if (hasNextPage) fetchNextPage();
            }}
            ListFooterComponent={() =>
              isLoadingProducts ? <ActivityIndicator /> : <></>
            }
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.darkBlue,
    backgroundColor: COLORS.white,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  productImage: {
    height: 80,
    width: 80,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginBottom: 4,
    color: COLORS.black,
  },
  searchBar: {
    paddingVertical: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.green,
    borderRadius: 5,
    padding: 10,
  },
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  categoryBadge: {
    padding: 5,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 8,
    marginHorizontal: 8,
    borderColor: COLORS.green,
  },
  filterByCategoryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  clearCategoryButton: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.green,
  },
});
