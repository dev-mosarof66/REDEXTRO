import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import axiosInstance from '../axios/axios';
import { useNavigation } from '@react-navigation/native';
import store from '../store/store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Navbar from '../components/SetPlan/Navbar';
import colors from '../constants/colors';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'expo-linear-gradient';
import { toast } from '@backpackapp-io/react-native-toast';


const Notification = () => {
  const navigation = useNavigation();
  const { user, notifications, setNotifications } = useContext(store);
  const [loading, setLoading] = useState(true);

  const fetchNotification = async () => {
    try {
      const res = await axiosInstance.get('/user/notifications');
      setNotifications(res.data?.notifications);
    } catch (error) {
      if (error?.response?.status === 500) {
        navigation.push('Error');
      } else if (error?.response?.status === 403) {
        toast.error(
          'Login session expired.Redirecting to Login', {
          position: 'top',
          duration: 3000
        })
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) fetchNotification();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Navbar title='Notifications' />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {
            loading ? (
              <>
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
                <CardPlaceholder />
              </>
            ) : notifications.length > 0 ? (
              notifications.map((notification, index) => (
                <Card key={index} notification={notification} />
              ))
            ) : (
              <View style={styles.noNotificationContainer}>
                <Text style={styles.noNotificationText}>No Notification Found</Text>
              </View>
            )
          }
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const Card = ({ notification }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>
        {notification?.title || 'No Title'}
      </Text>
      <Text style={styles.body}>
        {notification?.body || 'No message content'}
      </Text>
      <Text style={styles.date}>
        {new Date(notification?.createdAt).toLocaleString() || ''}
      </Text>
    </View>
  );
};

const CardPlaceholder = () => {
  return (
    <View style={styles.card}>
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{ width: wp(50), height: 15, borderRadius: 8, marginBottom: 10 }}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{ width: wp(70), height: 12, borderRadius: 6, marginBottom: 10 }}
      />
      <ShimmerPlaceholder
        LinearGradient={LinearGradient}
        style={{ width: wp(40), height: 12, borderRadius: 5 }}
      />
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.five,
    paddingHorizontal: wp(4),
  },
  content: {
    marginTop: hp(2),
  },
  card: {
    backgroundColor: colors.five,
    padding: wp(4),
    borderRadius: 10,
    marginBottom: hp(1.5),
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  title: {
    fontSize: wp(4.5),
    fontWeight: 'bold',
    marginBottom: 5,
    color: colors.one,
  },
  body: {
    fontSize: wp(3.8),
    color: colors.two,
  },
  date: {
    fontSize: wp(3.2),
    color: colors.three,
    marginTop: 5,
  },
  noNotificationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  noNotificationText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    color: colors.one,
  },
});
