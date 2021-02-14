import { Box, List, ListItem, Link, Image } from '@chakra-ui/react'

const socialLinks = [
    {
        icon: '/assets/icons/linkedin.svg',
        url: 'https://www.linkedin.com/in/eugen-volosciuc/',
        scale: 0.5
    },
    {
        icon: '/assets/icons/github.svg',
        url: 'https://github.com/EugenVolosciuc',
        scale: 0.7
    },
    {
        icon: '/assets/icons/medium.svg',
        url: 'https://volosciuc-eugen.medium.com/',
        scale: 0.6
    },
]

const Footer = () => {
    return (
        <Box as="footer" py={8}>
            <List d="flex" justifyContent="center" alignItems="center">
                {socialLinks.map((link, index) => (
                    <ListItem key={'social-link-' + index} d="inline-block">
                        <Link 
                            href={link.url} 
                            target="_blank" 
                            rel="noreferrer noopener"
                        >
                            <Image 
                                mx={2}
                                src={link.icon} 
                                style={{ transform: `scale(${link.scale})`}} 
                            />
                        </Link>
                    </ListItem>
                ))}
                <ListItem>
                </ListItem>
            </List>
        </Box>
    )
}

export default Footer
