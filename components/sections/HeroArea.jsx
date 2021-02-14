import { Box, Flex, Heading } from "@chakra-ui/react"

const HeroArea = () => {
    return (
        <Flex 
            as="section" 
            flexDirection={['column-reverse', 'column-reverse', 'column-reverse', 'row', 'row']}
        >
            <Flex 
                flexDirection="column"
                flexBasis="50%" 
                textAlign={['center', 'center', 'center', 'left', 'left']}
                justifyContent='center'
            >
                <Heading mt={[4, 4, 4, 0]} fontSize={['3xl', '3xl', '4xl', '5xl', '6xl']}>Make your web presence special.</Heading>
                <Heading mt={[4, 4, 4, 4, 4]} fontSize={['lg', 'xl', '2xl', '2xl', '3xl']} color="gray.500">Custom web solutions tailored to your needs, made with passion.</Heading>
            </Flex>
            <Box flexBasis="50%" maxW={['inherit', 'inherit', '500px', 'inherit']} mx="auto" overflow="hidden">
                <img
                    src="/assets/illustrations/ev-sapiens.svg" 
                    alt="Sapiens" 
                    style={{ transform: 'scaleX(-1.15) scaleY(1.15)' }} 
                />
            </Box>
        </Flex>
    )
}

export default HeroArea
