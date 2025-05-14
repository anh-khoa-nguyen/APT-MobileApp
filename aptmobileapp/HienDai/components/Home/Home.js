import React, { use } from 'react';
import { View, Text, ScrollView } from 'react-native';
import QuickSummaryCard from './QuickSummaryCard';
import PaymentCardList from './PaymentCardList';
import QuickActions from './QuickActions';
import { styles } from './style';


export default function Home() {
    const payments = [
        { title: 'Management Fee - Feb 2023', amount: '$150' },
        { title: 'Parking Fee - Feb 2023', amount: '$100' },
    ];
    // const [count, setCount] = useState(0);
    // const
    

    // useEffect(() => {
      

    // const cards = await get() http://127.0.0.1:8000/cards/
    // const count = cards.length;
    // setCount(count);

    // }, []);

    return (
        <ScrollView style={{ padding: 16 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Hello,</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 16 }}>
                <QuickSummaryCard icon="credit-card" count={3} label="Unpaid Bills" color="#4299e1" />
                <QuickSummaryCard icon="cube" count={1} label="Pending Packages" color="#f6ad55" />
                <QuickSummaryCard icon="comment" count={3} label="Active Surveys" color="#48bb78" />
            </View>

            <PaymentCardList payments={payments} />

            <QuickActions
                onManageVehicle={() => console.log('Go to Vehicles')}
                onFeedback={() => console.log('Go to Feedback')}
            />
        </ScrollView>
    );
}
