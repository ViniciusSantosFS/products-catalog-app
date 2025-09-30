import {
  FlatList,
  Image,
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
  thumbnail: string;
};

type ProductItemProps = {
  product: Product;
};

export const HomeScreen = ({ productListUseCase }: Props) => {
  const { products } = useListProducts({ productListUseCase });
  console.log(products);
  const ProductItem = ({ product }: ProductItemProps) => {
    return (
      <View style={styles.card}>
        <Image
          source={{ uri: product.thumbnail }}
          style={styles.productImage}
        />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>{product.price}</Text>
      </View>
    );
  };

  const SearchBar = () => {
    return (
      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SearchBar />
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductItem product={item} />}
        onEndReached={() => {}}
      />
    </View>
  );
};

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.gray,
    elevation: 1,
  },
  productImage: {
    height: 100,
    width: 100,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    color: COLORS.primary,
  },

  searchBar: {
    padding: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: COLORS.gray,
    borderRadius: 10,
  },
});
