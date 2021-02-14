import React from 'react'
import NextLink from 'next/link'
import { Box, Heading, Link, List, ListItem } from '@chakra-ui/react'
import { EditIcon, EmailIcon} from '@chakra-ui/icons'

import HEADER_HEIGHT from 'constants/HEADER_HEIGHT'

const links = [
    {
        href: '/blog',
        label: 'Blog',
        icon: EditIcon
    },
    {
        href: '/contact',
        label: 'Contact',
        icon: EmailIcon
    }
]

const Header = () => {
    return (
        <Box h={HEADER_HEIGHT} d="flex" alignItems="center" justifyContent="space-between">
            <NextLink href="/">
                <Heading as="h4" size="lg" cursor="pointer">Eugen Voloșciuc</Heading>
            </NextLink>
            <List>
                {links.map(link => (
                    <ListItem key={link.label + '-link-item'} ml={[4, 4, 8, 8, 16]} d="inline-block">
                        <NextLink href={link.href}>
                            <Link role="group" d="flex" alignItems="center">
                                <link.icon boxSize="1.2em" color="gray.500" _groupHover={{ color: 'black' }} />
                                <Box as="span" ml={[2, 2, 4]}>
                                    {link.label}
                                </Box>
                            </Link>
                        </NextLink>
                    </ListItem>
                ))}
            </List>
            {/* Portfolio / Blog / Get in Touch / About */}
        </Box>
    )
}

export default Header
