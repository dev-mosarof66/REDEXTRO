// NotificationHandler.js
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
    }),
});

export async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('myNotificationChannel', {
            name: 'Reminders',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return null;
        }
        try {
            const projectId =
                Constants?.expoConfig?.extra?.eas?.projectId ?? Constants?.easConfig?.projectId;
            if (!projectId) throw new Error('Project ID not found');
            token = (await Notifications.getExpoPushTokenAsync({ projectId })).data;
        } catch (e) {
            console.error('Error getting push token:', e);
            return null;
        }
    } else {
        alert('Must use physical device for Push Notifications');
        return null;
    }

    return token;
}

export function scheduleReminderNotification(reminderTime, planTitle = "Reminder", planNote = "") {
    const interval = setInterval(() => {
        // console.log(planTitle ,"reminder function is calling",reminderTime)
        const now = new Date();
        const target = new Date(reminderTime);

        const nowDate = now.toISOString().split('T')[0];
        const targetDate = target.toISOString().split('T')[0];

        const nowTime = now.toTimeString().slice(0, 5);
        const targetTime = target.toTimeString().slice(0, 5);

        if (nowDate === targetDate && nowTime === targetTime) {
            Notifications.scheduleNotificationAsync({
                content: {
                    title: `🔔 ${planTitle}`,
                    body: planNote || "Get Ready ! Smash Your Goals",
                    sound: true,
                    priority: Notifications.AndroidNotificationPriority.HIGH,
                    channelId: 'myNotificationChannel',
                },
                trigger: null,
            });
            clearInterval(interval);
        }
    }, 30000);
}

export function useNotificationListeners(setNotification) {
    useEffect(() => {
        const notificationListener = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        const responseListener = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('Notification response:', response);
        });

        return () => {
            notificationListener.remove();
            responseListener.remove();
        };
    }, []);
}
