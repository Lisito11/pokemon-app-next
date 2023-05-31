import { Layout } from '@/components/layouts'
import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { Pokemon, PokemonListResponse } from '@/interfaces';
import { pokeApi } from '@/api';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import { useState } from 'react';
import { getPokemonInfo, localFavorites } from '@/utils';
import confetti from 'canvas-confetti';
interface Props {
  pokemon: Pokemon
}


const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavorite, setIsInFavorite] = useState(localFavorites.existInFavorites(pokemon.id));

  const onToggleFavorite = () => {
    localFavorites.toogleFavorite(pokemon.id)
    setIsInFavorite(!isInFavorite);

    if (!isInFavorite) {
      confetti({
        zIndex: 999,
        particleCount: 100,
        spread: 160,
        angle: -100,
        origin: {
          x: 1,
          y: 0
        }
      })
    }

  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: '5px' }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} width="100%" height={200} alt={pokemon.name} />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card isHoverable css={{ padding: '30px' }}>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{pokemon.name}</Text>
              <Button
                color="gradient"
                ghost={!isInFavorite}
                onClick={onToggleFavorite}> {!isInFavorite ? 'Guardar en favoritos' : 'En favoritos'}</Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>
              <Container direction='row' display='flex' gap={0}>
                <Card.Image src={pokemon.sprites.front_default} width={100} height={100} alt={pokemon.name} />
                <Card.Image src={pokemon.sprites.back_default} width={100} height={100} alt={pokemon.name} />
                <Card.Image src={pokemon.sprites.front_shiny} width={100} height={100} alt={pokemon.name} />
                <Card.Image src={pokemon.sprites.back_shiny} width={100} height={100} alt={pokemon.name} />

              </Container>
            </Card.Body>

          </Card>
        </Grid>
      </Grid.Container>
    </Layout>
  )
}

export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const {data:pokemons151} = await pokeApi.get<PokemonListResponse>(`pokemon?limit=151`);

  return {
    paths: pokemons151.results.map(({name}) => ({
      params: { name }
    })),
    // fallback: false //404
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };
  const pokemon = await getPokemonInfo(name.toLowerCase());

  if (!pokemon) {
      return {
        redirect: {
          destination: '/',
          permanent: false
        }
      }
  }

  return {
    props: {
      pokemon
    }
  }
}

export default PokemonByNamePage;

