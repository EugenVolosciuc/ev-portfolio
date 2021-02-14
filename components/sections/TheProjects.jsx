import { Box } from '@chakra-ui/react'
import isEmpty from 'lodash/isEmpty'

import ProjectsList from 'components/misc/ProjectsList'
import SectionTitle from 'components/sections/SectionTitle'

const TheProjects = ({ projects }) => {
    return (
        <Box mt={[12, 12, 12, 8, 8]}>
            <SectionTitle title="The Projects" />
            <Box>
                {!isEmpty(projects) && <ProjectsList projects={projects} />}
            </Box>
        </Box>
    )
}

export default TheProjects
