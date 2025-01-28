import axios from 'axios'
import React from 'react'
import SearchForm from '../components/SearchForm'
import { useLoaderData } from 'react-router-dom'
import CocktailLists from '../components/CocktailLists'
import { useQuery } from '@tanstack/react-query'

const cocktailSearchUrl = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='

const serachCocktailQuery = (searchTerm) => {


  return {


    queryKey: ['search', searchTerm || 'all'],
    queryFn: async () => {
      const response = await axios.get(`${cocktailSearchUrl}${searchTerm}`)

      return response.data.drinks

    },
  }
}
export const loader = (queryClient) => async ({ request }) => {
  const url = new URL(request.url)

  const searchTerm = url.searchParams.get('search') || 'all';

  // const response =await axios.get(`${cocktailSearchUrl}${searchTerm}`)
  // drinks:response.data.drinks,
  await queryClient.ensureQueryData(serachCocktailQuery(searchTerm))
  return { searchTerm }

}

const Landing = () => {
  // drinks,
  const { searchTerm } = useLoaderData()
  const { data: drinks } = useQuery(serachCocktailQuery(searchTerm))

  return (
    <>
      <SearchForm searchTerm={searchTerm} />
      <CocktailLists drinks={drinks} />
    </>
  )
}

export default Landing
