import { NextPage } from 'next';
import { Layout } from '@/components/layouts';
import { NoFavorites } from '@/components/ui';
import { useEffect, useState } from 'react';
import { localFavorites } from '@/utils';
import { Card, Grid } from '@nextui-org/react';
import { FavoritesPokemons } from '@/components/pokemon';

const FavoritesPage: NextPage = () => {

  const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

  useEffect(() => {
    setFavoritePokemons(localFavorites.pokemons)
  }, [])

  return (
    <Layout title='Pokemons - Favoritos'>

      {
        favoritePokemons.length === 0
          ? (<NoFavorites />)
          : (
            <FavoritesPokemons favoritePokemons={favoritePokemons}/>
          )

      }
    </Layout>
  )
};

export default FavoritesPage