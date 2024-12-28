import { delay } from "../../../utils/utils";
import Lottie from "lottie-react"
import animate from '../../../content/lottie/loading.json'
import "./loading.css";

const Loading: React.FC<{text: string, setStatus: (value?: any)=>void}> = ({text, setStatus}) => {
  let txt = text
  const pros = async () => {
    if(text.includes('_')){
      txt = txt.replace('_', '')
      await delay(3000)
      setStatus(null)
    }
  }
  pros()
  
  return (
    <div className="loading-container" onClick={() => setStatus(null)}>
      <Lottie animationData={animate} />

      <p className="loading-text">{txt}</p>
    </div>
  );
};

export default Loading;