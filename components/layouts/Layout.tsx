import Head from "next/head"
import { FC, ReactNode } from "react"
import { Navbar } from '../ui/Navbar';


interface Props {
    children: ReactNode,
    title?: string,
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;
export const Layout: FC<Props> = ({ children, title }) => {

    return (
        <>
            <Head>
                <title>{title || 'Pokemon App'}</title>
                <meta name="author" content="Lisanny Peña" />
                <meta name="description" content={`Informacion sobre el pokemon ${title}`} />
                <meta name="keywords" content={`${title}, pokemon, pokedex`} />

                <meta property="og:title" content={`Informacion sobre el pokemon ${title}`} />
                <meta property="og:description" content={`Esta es la pagina sobre el pokemon ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />

            </Head>
            <Navbar />
            <main style={{
                padding: '0px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
