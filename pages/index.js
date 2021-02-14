import MainLayout from 'components/layouts/MainLayout'

import graphcms from 'config/graphcms'
import HeroArea from 'components/sections/HeroArea'
import TheProjects from 'components/sections/TheProjects'

const Homepage = ({ projects }) => {
	return (
		<MainLayout>
			<HeroArea />
			<TheProjects projects={projects} />
		</MainLayout>
	)
}

export default Homepage

export async function getStaticProps() {
	try {
		const { projects } = await graphcms.request(`
		{
			projects (where: { projectIsShown: true } ) {
			  id
			  images {
				id
				url
			  }
			  title
			  description
			}
		  }
		`)

		return {
			props: {
				projects
			},
			revalidate: 60 // 1 minute
		}
	} catch (error) {
		console.log("ERROR FETCHING POSTS", error)
		return {
			props: {
				projects: []
			}
		}
	}
}