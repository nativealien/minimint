import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import './section.css'

const Section: React.FC<{markdown: any}> = ({markdown}) => {

    return <section className='section'>
        <div className="content">
            <ReactMarkdown rehypePlugins={[rehypeRaw]} children={markdown} />
        </div>
    </section>
}

export default Section