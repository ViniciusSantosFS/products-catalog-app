import { useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { Product } from '../../../domain/entities';
import { ProductListUseCase } from '../../../domain/usecases';
import { CategoryListUseCase } from '../../../domain/usecases/category-list';
import {
  Categories,
  CategoryBadge,
  ProductDetailsSheet,
  ProductItem,
  SearchBar,
} from '../../components';
import ErrorSheet from '../../components/error-sheet';
import { useListCategories } from '../../hooks/use-list-categories';
import { useListProducts } from '../../hooks/use-list-products';
import { useProductFilters } from '../../hooks/use-product-filters';
import { styles } from './styles';

type Props = {
  productListUseCase: ProductListUseCase;
  categoryListUseCase: CategoryListUseCase;
};

const { height } = Dimensions.get('window');
const LIST_CONTAINER_HEIGHT = height * 0.65;

export const HomeScreen = ({
  productListUseCase,
  categoryListUseCase,
}: Props) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isError: isErrorProducts,
    isLoading: isLoadingProducts,
  } = useListProducts({
    productListUseCase,
  });

  const products = useMemo(
    () => data?.pages.flatMap(({ products }) => products) ?? [],
    [data],
  );

  const {
    categories,
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useListCategories({
    categoryListUseCase,
  });

  const {
    rows,
    categorySelected,
    search,
    setSearch,
    handleSelectCategory,
    sortingFilters,
    handleSelectSortingFilter,
  } = useProductFilters({
    products,
  });

  if (isLoadingProducts || isLoadingCategories) return <ActivityIndicator />;
  if (isErrorProducts || isErrorCategories) return <ErrorSheet />;

  return (
    <>
      <View style={styles.container}>
        <SafeAreaView>
          <Text style={styles.screenTitle}>Prodcuts</Text>
          <View style={styles.searchContainer}>
            <View style={styles.searchBarContainer}>
              <SearchBar value={search} onSearch={setSearch} />
            </View>
            <CategoryBadge
              category={{ id: 'price', name: '$' }}
              onSelect={() => handleSelectSortingFilter('price')}
              isSelected={sortingFilters.price === 'price'}
            />
            <View style={{ marginHorizontal: 4 }} />
            <CategoryBadge
              category={{ id: 'rating', name: '⭐' }}
              onSelect={() => handleSelectSortingFilter('rating')}
              isSelected={sortingFilters.rating === 'rating'}
            />
          </View>

          <View style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>Filter by Category</Text>

            <Categories
              categories={categories ?? []}
              categorySelected={categorySelected}
              onSelect={handleSelectCategory}
            />
          </View>

          <View style={{ height: LIST_CONTAINER_HEIGHT }}>
            <FlatList
              testID="product-list"
              data={rows}
              showsVerticalScrollIndicator={false}
              onEndReachedThreshold={0.5}
              renderItem={({ item, index }) => (
                <Pressable
                  key={`product-${index}`}
                  onPress={() => setSelectedProduct(item)}
                >
                  <ProductItem product={item} />
                </Pressable>
              )}
              ItemSeparatorComponent={(index) => (
                <View key={`separator-${index}`} style={{ height: 20 }} />
              )}
              onEndReached={() => {
                if (hasNextPage) fetchNextPage();
              }}
              ListFooterComponent={() =>
                isLoadingProducts ? (
                  <ActivityIndicator style={{ marginVertical: 20 }} />
                ) : (
                  <></>
                )
              }
            />
          </View>
        </SafeAreaView>
      </View>
      <ProductDetailsSheet
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
};
