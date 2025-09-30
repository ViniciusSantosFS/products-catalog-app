import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { ProductListUseCase } from '../../../domain/usecases';
import { CategoryListUseCase } from '../../../domain/usecases/category-list';
import { Categories, SearchBar } from '../../components';
import { ProductItem } from '../../components/product-item';
import { useListCategories } from '../../hooks/use-list-categories';
import { useListProducts } from '../../hooks/use-list-products';
import { useProductFilters } from '../../hooks/use-product-filters';

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

  const { rows, categorySelected, search, setSearch, handleSelectCategory } =
    useProductFilters({
      products,
    });

  if (isLoadingProducts || isLoadingCategories) return <ActivityIndicator />;

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

        <View style={{ height: LIST_CONTAINER_HEIGHT }}>
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    marginBottom: 4,
    fontWeight: 'bold',
  },
  categoryContainer: {
    marginVertical: 20,
  },
  categoryTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
});
