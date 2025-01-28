import React from 'react'
import Wrapper from '../assets/wrappers/CocktailList';
import Cocktailcard from './Cocktailcard';

const CocktailLists = ({drinks}) => {

    if(!drinks){

        return <h2>no drinks</h2>
    }
    const formattedDrinks=drinks.map((item)=>{

        const {
            idDrink,strDrink,strGlass,strDrinkThumb,
            strAlcoholic
            } =item;
            
        return  {id:idDrink,name:strDrink,image:strDrinkThumb,info:strAlcoholic,glass:strGlass
            }
        })

  return (
   <Wrapper>
        {formattedDrinks.map((item)=>{

            return(

                <Cocktailcard key={item.id}  {...item} />
            )
        })}

   </Wrapper>
  )
}

export default CocktailLists
