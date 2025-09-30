import { Image, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../constants';

type Props = {
  product: Product;
};

type Product = {
  title: string;
  price: string;
  rating: number;
  thumbnail: string;
};

export const ProductItem = ({ product }: Props) => {
  const abbreviateTitle = (title: string) => {
    if (title.length > 20) {
      return title.substring(0, 20) + '...';
    }
    return title;
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.thumbnail }} style={styles.image} />
      <View>
        <Text style={styles.title} testID="product-title">
          {abbreviateTitle(product.title)}
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

export const styles = StyleSheet.create({
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
  image: {
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
  rating: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
