import React from 'react'
import Header from '@/components/Header'
import { getSession, useSession } from 'next-auth/react'
import db from '../../firebase';
import { collection, doc, getDoc, getDocs, query, orderBy } from "firebase/firestore";
import moment from 'moment/moment';
import Order from '@/components/Order';
function Orders({ orders }) {
    const { data: session, status } = useSession();

    console.log(orders)
    
  return (
    <div>
        <Header />

        <main className='max-w-screen-lg mx-auto p-10'>
            <h1 className='text-3xl border-b mb-2 pb-1 border-yellow-400'>Your Orders</h1>
        {session ? (
            <h2> {orders.length} Orders</h2>
        ) : <h2>Please sign in to see your orders</h2>}

        <div className='mt-5 space-y-4'>
            {orders?.map(({
                id, amount, amountShipping, items, timeStamp, images 
            }) => (
                <Order 
                    id={id}
                    key={id}
                    amount={amount}
                    amountShipping={amountShipping}
                    items={items}
                    timeStamp={timeStamp}
                    images={images}
                />
            ))}
        </div>
        </main>
    </div>
  )
}

export default Orders


export async function getServerSideProps(context){
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    
    const session = await getSession(context)
    

   
   
    
    if(!session){
        return {
            props: {},
        };
    } 
  
    
    // stripe orders from firebase db
    // const stripeOrders = await collection(db, 'users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();
    //THE OG ONE BELOW:
    // const stripeOrders = await db.collection('users').doc(session.user.email).collection('orders').orderBy('timestamp', 'desc').get();


    // const sectionsCollectionRef = collection(Firestoredb, collectionId, courseId, 'Sections')
    // const q = query(sectionsCollectionRef, orderBy('section', 'desc'))
    // const querySnapshot = await getDocs(q);
    
    const users = collection(db, "users")
    const singleUser = doc(users, session.user.email)
    const singleUserOrdersRef = collection(singleUser, "orders")
    const q = query(singleUserOrdersRef, orderBy('timestamp', 'desc'))
    const usersOrders = await getDocs(q)
   
    // const stripeOrders = await getDocs(collection(users, 'orders'))

    // stripe orders from stripe
    const orders = await Promise.all(
        usersOrders.docs.map(async (order) => ({
            id: order.id,
            amount: order.data().amount,
            amountShipping: order.data().amount_shipping,
            images: order.data().images,
            timeStamp: moment(order.data().timestamp.toDate()).unix(),
            items: (
                await stripe.checkout.sessions.listLineItems(order.id, {
                    limit: 100
                })
            ).data,
        }))
    )

    return {
        props: {
          orders
        }
      }
}

