import { useState } from 'react';

const useLockerStore = () => {
  const [lockerItems, setLockerItems] = useState([
    {
      id: 1,
      name: 'Package 1',
      description: 'Amazon order',
      receivedDate: '2025-05-10',
      status: 'pending',
      image: 'https://via.placeholder.com/50',
    },
    {
      id: 2,
      name: 'Package 2',
      description: 'Shopee order',
      receivedDate: '2025-05-11',
      status: 'delivered',
      image: 'https://via.placeholder.com/50',
    },
  ]);

  const fetchLockerItems = () => {
    // Giả lập việc lấy dữ liệu từ server
    console.log('Fetching locker items...');
  };

  return { lockerItems, fetchLockerItems };
};

export { useLockerStore };