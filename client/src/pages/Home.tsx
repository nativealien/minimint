import { useOutletContext } from "react-router-dom"

const Home = () => {
    const { local }: any = useOutletContext()

    return <div className="home">
        <h2>Home</h2>
        {local && <>Local chain running</>}
    </div>
}

export default Home