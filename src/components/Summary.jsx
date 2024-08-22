import {useState} from "react";
import "../styles/Summary.css";
import { FaRegCopy } from "react-icons/fa";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import {toast} from "react-toastify";
const Summary = (props) => {
    // console.log(props.data.wordsReduced)
    let [copied,setCopied] = useState(false);
    if(copied){
      toast("Copied to clipboard");
    }
    let Copy = () => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false)
      },2000)
    }
  return (
    <div className="summary_container">
      <div className="summary_head">
        <h1>Your Article Summary</h1>
        <CopyToClipboard text={props.data.summary} onCopy={Copy}>
        <FaRegCopy className="copy" title="Copy"/>
        </CopyToClipboard>
      </div>
      <div>
        {props.data.totalWords > 0 ? (
          <div>
            <h3 className="title_article">{props.data.title}</h3>
            <p className="summary_article">{props.data.summary}</p>
          </div>
        ) : (
          <div className="no_article">
            <h4>There is No article to summarize</h4>
            <p>Please Enter the article link to summarize</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Summary;
