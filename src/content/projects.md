# Personal projects
Besides work, I'm always trying to keep up with the ever-changing landscape of web development by creating projects of my own. Here is a collection of apps that are close to my heart.

---
## JobList
[Website](http://www.fejoblist.com/)

JobList is a series of web platforms for specialized job boards. At the moment, there are two websites being worked on - frontend and 3D. Easy to use, these websites can help recruiters seek new talent in their field of work, and help job seekers search and find openings that tick their criteria. Recruiters are always able to modify their opening in any way through an edit link they receive through email once the job post is created.

<img src="/assets/images/projects/job-list-1.png" title="Homepage" alt="Homepage" />
<img src="/assets/images/projects/job-list-2.png" title="Job board" alt="Job board" />
<img src="/assets/images/projects/job-list-3.png" title="New job post form" alt="Form" />
<img src="/assets/images/projects/job-list-4.png" title="Job opening" alt="Job opening" />

These websites are configuration based, meaning that through changing some parameters we can get a different variation of a website, such that the creation of a new website would mean just creating a couple of new frontend components, adding the new content in a predefined schema and changing some variables in the API, around one day's worth of work.

#### Technologies
Frontend: [<img src="/assets/images/technologies/ts.svg" title="Typescript" alt="Typescript" width="30" style="display:inline-block; margin-left:6px;margin-right:6px;margin-top:0;margin-bottom:0;" />](https://www.typescriptlang.org/) [<img src="/assets/images/technologies/nextjs.svg" title="NextJS" alt="NextJS" width="60" style="display:inline-block; margin-right:6px;margin-left:6px;margin-top:0;margin-bottom:0;" />](https://nextjs.org/) [<img src="/assets/images/technologies/chakra-ui.svg" title="ChakraUI" alt="ChakraUI" width="30" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;" />](https://chakra-ui.com/) [<img src="/assets/images/technologies/react-hook-form.jpg" title="react-hook-form" alt="react-hook-form" width="30" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;border-radius:5px;" />](https://react-hook-form.com/) [<img src="/assets/images/technologies/draftjs.svg" title="DraftJS" alt="DraftJS" width="30" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;" />](https://draftjs.org/)

Backend: [<img src="/assets/images/technologies/ts.svg" title="Typescript" alt="Typescript" width="30" style="display:inline-block; margin-left:6px;margin-right:6px;margin-top:0;margin-bottom:0;" />](https://www.typescriptlang.org/) [<img src="/assets/images/technologies/expressjs.png" title="ExpressJS" alt="ExpressJS" width="40" style="display:inline-block;margin-top:0;margin-bottom:0;" />](https://expressjs.com/) [<img src="/assets/images/technologies/postgresql.svg" title="PostgreSQL" alt="PostgreSQL" width="40" style="display:inline-block; margin-right:4px;margin-top:0;margin-bottom:0;" />](https://www.postgresql.org/) [<img src="/assets/images/technologies/prisma.svg" title="Prisma" alt="Prisma" width="25" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;" />](https://www.prisma.io/) [<img src="/assets/images/technologies/stripe.svg" title="Stripe" alt="Stripe" width="60" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;" />](https://stripe.com/)

---
## RSSave
[App](https://play.google.com/store/apps/details?id=com.eugenvolosciuc.rssave) | [Code](https://github.com/EugenVolosciuc/rssave-mobile)

RSSave is a RSS feed reader app. With its help, the user can add any RSS feed URL and see the articles distributed through that feed. The user can group the feeds into different "bundles", but also add different articles to "Favorites" for reading later.

<table>
	<tr>
		<td class="w-full sm:w-36"><img src="/assets/images/projects/rssave-2.webp" alt="Feeds list"/></td>
		<td class="w-full sm:w-36"><img src="/assets/images/projects/rssave-3.webp" alt="Japanese feed"/></td>
	</tr>
	<tr>
		<td class="w-full sm:w-36"><img src="/assets/images/projects/rssave-1.webp" alt="Drawing"/></td>
		<td class="w-full sm:w-36"><img src="/assets/images/projects/rssave-4.webp" alt="Drawing"/></td>
	</tr>
</table>

This was my entry in the mobile world, trying for the first time to work with React Native and its quirks. Might try that again someday.

#### Technologies
Mobile: [<img src="/assets/images/technologies/react.svg" title="React Native" alt="React Native" width="30" style="display:inline-block; margin-left:6px;margin-top:0;margin-bottom:0;" />](https://reactnative.dev/) [<img src="/assets/images/technologies/expo.svg" title="Expo" alt="Expo" width="30" style="display:inline-block; margin-left:6px;margin-top:0;margin-bottom:0;" />](https://expo.dev/)

---
## Inspiration scraper
[Code](https://github.com/EugenVolosciuc/inspiration-scraper)

Having difficulty in finding good examples of web design and wanting to write some articles on Medium at the same time, I ventured in creating a tool that would write articles on the topic at hand. Introducing the inspiration scraper. This CLI tool goes through some of the most well-known web design-related platforms and creates an article about their newest entries. It lacks some AI writing capabilities, but it was enough for me to write [two](https://bootcamp.uxdesign.cc/web-design-inspiration-for-november-2021-17a2fb90bdac) [articles](https://bootcamp.uxdesign.cc/web-design-inspiration-for-december-2021-6c86bf913044) on Medium this way :).

The tool scrapes the data it needs from each data source, saves the entry title to a database so that it's not used in other future articles, takes a screenshot and creates images with the color palettes of each website, adds their tech stack which we get from a third-party service and creates a markdown article with all of the data presented.

#### Technologies
CLI: [<img src="/assets/images/technologies/ts.svg" title="Typescript" alt="Typescript" width="30" style="display:inline-block; margin-left:6px;margin-right:6px;margin-top:0;margin-bottom:0;" />](https://www.typescriptlang.org/) [<img src="/assets/images/technologies/puppeteer.svg" title="DraftJS" alt="DraftJS" width="25" style="display:inline-block; margin-right:6px;margin-top:0;margin-bottom:0;" />](https://pptr.dev/)

---
## Auto Iordache
[Website](https://autoiordache.ro/)

We've all got to start somewhere, right? This is the first paid customer I ever had as a freelancer. While on one of my driving lessons, my driving instructor told me that he needs a website for his school, and so we made a deal for it. Not the most fascinating of works, that's for sure, but it was a pivotal point for me as a web developer.

<img src="/assets/images/projects/auto-iordache-1.png" title="Homepage 1" alt="Homepage 1" />
<img src="/assets/images/projects/auto-iordache-2.png" title="Homepage 2" alt="Homepage 2" />
<img src="/assets/images/projects/auto-iordache-3.png" title="Contact" alt="Contact" />
<img src="/assets/images/projects/auto-iordache-4.png" title="FAQ" alt="FAQ" />

The client did not want much, just to display his car collection, a contact form and show some information helpful for the future students. An integration to blogger.com was added so that the client can add updates to the website, too bad they haven't used it so far.

Frontend: [<img src="/assets/images/technologies/nextjs.svg" title="NextJS" alt="NextJS" width="60" style="display:inline-block; margin-right:6px;margin-left:6px;margin-top:0;margin-bottom:0;" />](https://nextjs.org/) [<img src="/assets/images/technologies/tailwind-css.svg" title="TailwindCSS" alt="TailwindCSS" width="30" style="display:inline-block; margin-right:6px;margin-left:6px;margin-top:0;margin-bottom:0;" />](https://tailwindcss.com/)

---

