import React from 'react'
import Image from 'next/image'
import { StarIcon } from '@heroicons/react/24/solid'
import Currency from "react-currency-formatter"
import { useDispatch } from 'react-redux'
import { addToBasket, removeFromBasket } from '@/slices/basketSlice'

export default function CheckoutProduct({ id, title, price, rating, description, category, image, hasPrime }) {

    const dispatch = useDispatch()
    const removeItemFromBasket = () => {
        dispatch(removeFromBasket({ id }))
    }
    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price, 
            rating, 
            description,
            category,
            image,
            hasPrime
        };

        dispatch(addToBasket(product))
    }
  return (
    <div className='grid grid-cols-5'>
        <Image src={image} height={200} width={200}/>

        <div className='col-span-3 mx-5'>
            <p>{title}</p>
            <div className='flex'>
                {Array(rating).fill().map((_, i)=> (
                    <StarIcon key={i} className='h-5 text-yellow-500'/>
                ))}
            </div>
            <p className='text-xs mt-2 mb-2 line-clamp-3'>{description}</p>

            <Currency quantity={price} />

            {hasPrime && (
                <div className='flex items-center space-x-2'>
                    <img 
                    className="w-12" 
                    alt="" 
                    src="https://links.papareact.com/fdw" 
                    loading="lazy"
                    />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
        </div>

       <div className='flex flex-col space-y-2 my-auto justify-self-end'>
          <button className='button' onClick={addItemToBasket}>Add to Basket</button>
          <button className='button' onClick={removeItemFromBasket}>Remove from Basket</button>
       </div>
    </div>
  )
}
