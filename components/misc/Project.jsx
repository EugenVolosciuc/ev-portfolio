import { Box, Flex, Heading, Img } from '@chakra-ui/react'

const ROTATION_FACTOR = 3

const Project = ({ project }) => {
    return (
        <Flex
            flexDirection="column"
            role="group"
            position="relative"
            cursor="pointer"
            d="inline-flex"
            mx="2"
        >
            {project.images.map((img, index) => {
                return <Img
                    className="with-transform-transition"
                    boxShadow="lg"
                    position={index == 0 ? "static" : "absolute"}
                    top={index == 0 ? 'initial' : 0}
                    htmlWidth="400px"
                    borderRadius="xl"
                    transformOrigin="bottom right"
                    _groupHover={{ 
                        transform: `rotate(${index * ROTATION_FACTOR + 4 * (1 - `0.${index + 2}`)}deg)` 
                    }}
                    key={img.id}
                    src={img.url}
                    alt={project.title + ' ' + (index + 1)}
                />
            })}
            <Heading 
                as="h6" 
                fontSize="xl" 
                mt={2}
                className="with-transform-transition"
                _groupHover={{ transform: 'translateY(-75%)' }}
            >
                {project.title}
            </Heading>
        </Flex>
    )
}

export default Project
