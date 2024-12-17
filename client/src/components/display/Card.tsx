
const Card = ({meta}: {meta: IMeta}) => {

    return <div className={`${meta.type}-card grid-item`}>
        <img src={meta.image} alt="" />
        <h3>{meta.name}</h3>
        <p>{meta.description}</p>
        <p>{meta.type}</p>
    </div>
}

export default Card