import { ChakraProvider } from '@chakra-ui/react'

import 'styles/global.css'
import theme from 'config/theme'

function MyApp({ Component, pageProps }) {
	return (
		<ChakraProvider theme={theme}>
			<Component {...pageProps} />
		</ChakraProvider>
	)
}

export default MyApp
