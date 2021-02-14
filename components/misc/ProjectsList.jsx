import { List, ListItem } from '@chakra-ui/react'
import Project from 'components/misc/Project'

const ProjectsList = ({ projects }) => {
    return (
        <List d="flex" justifyContent="space-around" flexWrap="wrap" mt={4}>
            {projects.map(project => (
                <ListItem key={project.id} d="inline-block" mt={4}>
                    <Project project={project} />
                </ListItem>
            ))}
        </List>
    )
}

export default ProjectsList
