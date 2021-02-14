import React from 'react'
import { Box } from '@chakra-ui/react'

import Header from 'components/navigation/Header'
import Footer from 'components/navigation/Footer'

const MainLayout = ({ children }) => {
    return (
        <Box d="flex" flexDirection="column" bg="beige" minH="screenHeight" px={[2, 4, 8, 20, 44]}>
            <Header />
            <Box flex="1" py={4}>
                {children}
            </Box>
            <Footer />
        </Box>
    )
}

export default MainLayout
