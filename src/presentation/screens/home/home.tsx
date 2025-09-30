import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ProductListUseCase } from '../../../domain/usecases';
import { CategoryListUseCase } from '../../../domain/usecases/category-list';
import { COLORS } from '../../constants';
import { useListCategories } from '../../hooks/use-list-categories';
import { useListProducts } from '../../hooks/use-list-products';

type Props = {
  productListUseCase: ProductListUseCase;
  categoryListUseCase: CategoryListUseCase;
};

type Product = {
  title: string;
  price: string;
  rating: number;
  thumbnail: string;
};

type ProductItemProps = {
  product: Product;
};

type CategoryProps = {
  category: Category;
  isSelected: boolean;
};

type Category = {
  id: string;
  name: string;
};

const ProductItem = ({ product }: ProductItemProps) => {
  const abreviateTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20) + '...';
    }
    return title;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.productImage} />
      <View>
        <Text style={styles.title} testID="product-title">
          {abreviateTitle(product.title)}
        </Text>
        <Text style={styles.price} testID="product-price">
          ${product.price}
        </Text>
        <View style={styles.rating}>
          {Array.from({ length: Math.round(product.rating) }).map((_) => (
            <Text>⭐</Text>
          ))}
        </View>
      </View>
    </View>
  );
};

const CategoryBadge = ({ category, isSelected }: CategoryProps) => {
  return (
    <View
      style={[
        styles.categoryBadge,
        { backgroundColor: isSelected ? COLORS.green : COLORS.white },
      ]}
    >
      <Text>{category.name}</Text>
    </View>
  );
};

export const HomeScreen = ({
  productListUseCase,
  categoryListUseCase,
}: Props) => {
  const { products, fetchNextPage, hasNextPage, isLoading } = useListProducts({
    productListUseCase,
  });
  const { categories } = useListCategories({ categoryListUseCase });

  const SearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by a Product"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Text style={styles.screenTitle}>Prodcuts</Text>
        <SearchBar />

        <View style={styles.categoryContainer}>
          <Text style={styles.categoryTitle}>Filter by Category</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map((category) => (
              <CategoryBadge category={category} isSelected={false} />
            ))}
          </ScrollView>
        </View>

        <View style={{ paddingBottom: 20 }}>
          <FlatList
            testID="product-list"
            data={products}
            onEndReachedThreshold={0.5}
            renderItem={({ item }) => <ProductItem product={item} />}
            ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
            onEndReached={() => {
              if (hasNextPage) {
                fetchNextPage();
              }
            }}
            ListFooterComponent={() =>
              isLoading ? <ActivityIndicator /> : <></>
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
});
