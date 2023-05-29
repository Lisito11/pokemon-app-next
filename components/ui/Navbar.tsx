import { Link, Spacer, Text, useTheme } from '@nextui-org/react'
import React from 'react'
import Image from 'next/image';

export const Navbar = () => {


    const { theme } = useTheme()


    return (
        <div style={{
            display: 'flex',
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'start',
            padding: '0px 20px',
            backgroundColor: theme?.colors.gray100.value

        }}>
            <Image
             src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"}
             alt='Icon app'
             width={70}
             height={70}
             />
             <Link href={"/"} >
                <Text color='white' h2 style={{display:'inline'}}>P</Text>
                <Text color='white' h3 style={{display:'inline'}}>okémon</Text>
             </Link>
            <Spacer css={{flex: 1}}/>
            <Link css={{marginRight:'10px'}} href={"/favorites"} >

            <Text color='white'>Favoritos</Text>
            </Link>

        </div>
    )
}
