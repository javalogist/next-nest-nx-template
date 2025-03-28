import { showNotification, updateNotification, cleanNotifications, hideNotification } from '@mantine/notifications';
import { IconCheck, IconX, IconInfoCircle } from '@tabler/icons-react';


export type NotificationType = 'success' | 'error' | 'info' | 'loading';

interface NotifyProps {
  id?: string;
  title: string;
  message: string;
  type: NotificationType;
  autoClose?: boolean | number;
}

export const notify = ({ id, title, message, type, autoClose = 3000 }: NotifyProps) => {
  const icons = {
    success: <IconCheck size={20} />,
    error: <IconX size={20} />,
    info: <IconInfoCircle size={20} />,
    loading: null
  };

  if (type === 'loading') {
    // Show loading notification if loading type
    showNotification({
      id,
      title,
      message,
      loading: true,
      autoClose: false,
      withBorder: true
    });
  } else {
    // Regular notification
    showNotification({
      id,
      title,
      message,
      color: type === 'error' ? 'red' : type === 'success' ? 'teal' : 'blue',
      icon: icons[type],
      withBorder: true,
      autoClose
    });
  }
};

// ✅ Update notification dynamically (for long-running actions)
export const updateNotify = ({ id, title, message, type }: NotifyProps) => {
  updateNotification({
    id,
    title,
    message,
    color: type === 'error' ? 'red' : type === 'success' ? 'teal' : 'blue',
    icon: type === 'success' ? <IconCheck size={20} /> : <IconX size={20} />,
    loading: type === 'loading',
    autoClose: 3000
  });
};

// ✅ Clear all notifications
export const clearAllNotifications = () => cleanNotifications();

export const clearNotification = (notificationId:string) => hideNotification(notificationId);
