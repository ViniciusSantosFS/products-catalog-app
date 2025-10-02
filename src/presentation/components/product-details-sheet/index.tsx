import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useRef } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { Product } from '../../../domain/entities';
import { COLORS } from '../../constants';
import { PurchaseReminderPicker } from '../purchase-reminder-picker';

type Props = {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
};

export const ProductDetailsSheet = ({ isOpen, product, onClose }: Props) => {
  const bottomSheetRef = useRef<BottomSheet>(null);

  const backdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        {...props}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.expand();
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen]);

  if (product === null) return null;
  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.container}
      onClose={onClose}
      backdropComponent={backdrop}
      snapPoints={['70%', '90%']}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text
          style={product.hasInStock ? styles.hasInStock : styles.outOfStock}
        >
          {product.hasInStock ? 'Available in Stock' : 'Out of Stock'}
        </Text>
        <Image source={{ uri: product.thumbnail }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.description}>{product.description}</Text>
        <Text style={styles.brand}>{product.brand}</Text>
        <View style={{ marginBottom: 40 }} />
        <PurchaseReminderPicker productName={product.title} />
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    marginBottom: 12,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 16,
    marginBottom: 12,
    fontWeight: 'bold',
    color: COLORS.green,
  },
  description: {
    fontSize: 16,
    marginBottom: 12,
  },
  hasInStock: {
    fontSize: 16,
    marginBottom: 12,
    color: COLORS.success,
    fontWeight: 'bold',
  },
  outOfStock: {
    fontSize: 16,
    marginBottom: 12,
    color: COLORS.warning,
    fontWeight: 'bold',
  },
  image: {
    height: 250,
    width: 250,
    marginBottom: 20,
    alignSelf: 'center',
  },
});
