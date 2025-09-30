import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ProductListUseCase } from '../../../domain/usecases';
import { COLORS } from '../../constants';
import { useListProducts } from '../../hooks/use-list-products';

type Props = {
  productListUseCase: ProductListUseCase;
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

export const HomeScreen = ({ productListUseCase }: Props) => {
  const { products } = useListProducts({ productListUseCase });
  const ProductItem = ({ product }: ProductItemProps) => {
    const abreviateTitle = (title: string) => {
      if (title.length > 20) {
        return title.substring(0, 20) + '...';
      }
      return title;
    };

    return (
      <View style={styles.card}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
        <View>
          <Text style={styles.title}>{abreviateTitle(product.title)}</Text>
          <Text style={styles.price}>${product.price}</Text>
          <View style={styles.rating}>
            {Array.from({ length: Math.round(product.rating) }).map((_) => (
              <Text>⭐</Text>
            ))}
          </View>
        </View>
      </View>
    );
  };

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
        <FlatList
          data={products}
          renderItem={({ item }) => <ProductItem product={item} />}
          ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
          onEndReached={() => {}}
        />
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
});
