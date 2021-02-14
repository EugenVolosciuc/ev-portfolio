import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    styles: {
        global: {
            body: {
                letterSpacing: '1.3px',
                overflowX: 'hidden'
            }
        }
    },
    fonts: {
        body: 'Overpass, sans-serif',
        heading: 'Overpass, sans-serif'
    },
    colors: {
        beige: "#FAF0E6"
    },
    sizes: {
        screenWidth: '100vw',
        screenHeight: '100vh'
    }
})

export default theme