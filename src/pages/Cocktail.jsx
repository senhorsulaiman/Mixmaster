import React from 'react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { Link, Navigate, useLoaderData } from 'react-router-dom'
import Wrapper from '../assets/wrappers/CocktailPage';
const singleCocktailUrl = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
const detailCocktailQuery = (id) => {
  return {
    queryKey: ['cocktail', id],
    queryFn: async () => {
      const { data } = await axios.get(`${singleCocktailUrl}${id}`)

      return data

    },
  }




}
export const loader = (queryClient) => async ({ params }) => {
  const { id } = params;
  // const { data } = await axios.get(`${singleCocktailUrl}${id}`)
  await queryClient.ensureQueryData(detailCocktailQuery(id))
  return { id }
  //data 
}
const Cocktail = () => {

  const { id } = useLoaderData();

  const { data } = useQuery(detailCocktailQuery(id));


  if (!data) return <Navigate to='/' />
  const singleDrink = data.drinks[0];
  // console.log(singleDrink)
  const { strDrink: name, strDrinkThumb: image, strAlcoholic: info, strCategory: category, strGlass: glass, strInstructions: insructions } = singleDrink;
  const validIngredinets = Object.keys(singleDrink).filter((key) => key.startsWith('strIngredient') && singleDrink[key] !== null).map((key) => singleDrink[key]);

  return (
    <Wrapper>
      <header>
        <Link to='/' className='btn'>Home</Link>
        <h3>{name}</h3>

      </header>
      <div className="drink">

        <img src={image} alt={name} className='img' />

        <div className="drink-info">

          <p>
            <span className="drink-data">
              name:
            </span>{name}</p>
          <p> <span className="drink-data">
            category:
          </span>{category}</p>
          <p>

            <span className="drink-data">
              galss:
            </span>
            {glass}</p>

          <p> <span className="drink-data">
            Ingredinets:
          </span>{

              validIngredinets.map((item, index) => {

                return (<span key={index}>
                  {item} {index < validIngredinets.length - 1 ? ',' : ''}
                </span>)
              })
            }</p>

          <p> <span className="drink-data">
            insructions:
          </span>{insructions}</p>

        </div>
      </div>


    </Wrapper>
  )
}
export default Cocktail

