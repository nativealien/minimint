import './section.css'

const Section: React.FC<{
    imgSrc: string, 
    imgAlt: string,
    h2Text: string,
    pText: string}> = ({
    imgSrc, imgAlt, h2Text, pText
}) => {

    console.log(imgSrc)

    return <section className='section'>
        {imgSrc !== 'none' && <div className='section-img'>
            <img src={imgSrc} alt={imgAlt} />
        </div>}
        <h3>{h2Text}</h3>
        <p>{pText}</p>
    </section>
}

export default Section