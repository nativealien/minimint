import GoBack from '../../components/buttons/GoBack'
import Section from '../../components/display/section/Section'
import './about.css'

const About = () => {

    return <div className="about">
        <h2>About</h2>
        <Section imgSrc={'none'} imgAlt='none' h2Text='Title' pText='lorem ipsum' />
        <GoBack />
    </div>
}

export default About