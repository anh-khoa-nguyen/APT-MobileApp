import { useState } from 'react';

const usePaymentStore = () => {
  const [payments, setPayments] = useState([
    {
      id: 1,
      nameBill: 'Electricity Bill',
      description: 'Electricity usage for April',
      dueDate: '2025-05-20',
      paymentStatus: 'unpaid',
      money: 50,
    },
    {
      id: 2,
      nameBill: 'Water Bill',
      description: 'Water usage for April',
      dueDate: '2025-05-25',
      paymentStatus: 'paid',
      money: 30,
    },
  ]);

  const fetchPayments = () => {
    // Giả lập việc lấy dữ liệu từ server
    console.log('Fetching payments...');
  };

  return { payments, fetchPayments };
};

export { usePaymentStore };