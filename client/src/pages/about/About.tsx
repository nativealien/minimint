import GoBack from '../../components/buttons/goback/GoBack'
import Section from '../../components/display/section/Section'

import about from '../../content/about.md?raw'
import './about.css'

const About = () => {

    return <div className="about">
        <Section markdown={about} />
        <GoBack />
    </div>
}

export default About