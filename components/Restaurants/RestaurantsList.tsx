import React from "react"
import RestaurantCard from "./RestaurantCard"

const RestaurantsList = ({ restaurants }: { restaurants: { id: number, name: string, image_url: string | null }[] }) => {
    return (
        <>
            {
                restaurants?.map((restaurant) => 
                    <RestaurantCard 
                        key={restaurant.id} 
                        id={restaurant.id} 
                        name={restaurant.name} 
                        image_url={restaurant.image_url}
                    />
                )
            }
        </>
    )
}

export default RestaurantsList;