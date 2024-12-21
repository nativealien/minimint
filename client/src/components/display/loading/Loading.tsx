import { delay } from "../../../utils/utils";
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
      <div className="spinner"></div>
      <div className="spinner2"></div>
      <div className="spinner3"></div>
      <div className="spinner4"></div>
      <div className="spinner5"></div>
      <div className="spinner6"></div>
      <p className="loading-text">{txt}</p>
    </div>
  );
};

export default Loading;