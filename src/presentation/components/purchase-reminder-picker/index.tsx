import React, { useEffect, useState } from 'react';
import {
  Alert,
  NativeEventEmitter,
  NativeModules,
  Platform,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';

import DatePicker from 'react-native-date-picker';
import { COLORS } from '../../constants';

type Props = {
  productName: string;
};
const isIOS = Platform.OS === 'ios';

const purchaseReminderModule = NativeModules.PurchaseReminder;
const purchaseReminderEmitter = new NativeEventEmitter(purchaseReminderModule);

export const PurchaseReminderPicker = ({ productName }: Props) => {
  const [open, setOpen] = useState(false);

  const onSuccess = () =>
    Alert.alert('Reminder added to calendar with success!🎉');
  const onError = (error: string) => Alert.alert(error);

  useEffect(() => {
    purchaseReminderEmitter.addListener('onSuccess', onSuccess);
    purchaseReminderEmitter.addListener('onError', onError);

    return () => {
      purchaseReminderEmitter.removeAllListeners('onSuccess');
      purchaseReminderEmitter.removeAllListeners('onError');
    };
  }, []);

  const onConfirm = (date: Date) => {
    setOpen(false);
    purchaseReminderModule.addInCalendar(productName, date.toISOString());
  };

  if (!isIOS) return <></>;

  return (
    <>
      <Pressable onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.text}>ADD IN CALENDAR</Text>
      </Pressable>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={new Date()}
        onConfirm={onConfirm}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.green,
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
