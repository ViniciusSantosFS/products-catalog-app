import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text } from 'react-native';

const ErrorSheet = () => {
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      style={styles.container}
      backdropComponent={backdrop}
      snapPoints={['90%']}
      enablePanDownToClose={true}
    >
      <BottomSheetView style={styles.contentContainer}>
        <Text>Ops! Something went wrong 😔</Text>
        <Text>Please try again later.</Text>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 36,
    alignItems: 'center',
  },
});

export default ErrorSheet;
