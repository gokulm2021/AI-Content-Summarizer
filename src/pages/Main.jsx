import React from "react";
import Header from "../components/Header";
import "../styles/main.css";
import { FiLink2 } from "react-icons/fi";
import { AiOutlineEnter } from "react-icons/ai";
import Summary from "../components/Summary";
import Recent from "../components/Recent";
import { useState, useEffect } from "react";
import checkInputType from "../helper";
import axios from "axios";
import { toast } from "react-toastify";
import {MagnifyingGlass} from "react-loader-spinner"
const Main = () => {
  const [url, setUrl] = useState("");
  const [allSummary, setAllSummary] = useState([]);
  const [summaryData, setSummaryData] = useState({});
  const [oldDatas, setOldData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [validate,setValidate] = useState(false);
  //use UseEffect to fetch data from local storage
  useEffect(() => {
    let oldData = localStorage.getItem("Requests");
    if (oldData) {
      let d = JSON.parse(oldData);
      setAllSummary(d);
      setOldData(d);
    }
  }, [url]);
  //Fetch summary from API
  const FetchSummary = async () => {
    try {
      if (url.length > 0) {
        let bool = checkInputType(url);
        if (bool) {
          setLoading(true);
          let Api_key = process.env.REACT_APP_API_KEY;
          let Api_url = `https://api.smmry.com/&SM_API_KEY=${Api_key}&SM_URL=${url}`;
          let Response = await axios.get(Api_url);
          // console.log(Response)
          if (Response.status == 200) {
            let data = Response.data;
            // console.log(data);
            setValidate(false)
            setLoading(false);
            if (data) {
              let d = {
                Url: url,
                totalWords: parseInt(data.sm_api_character_count),
                title: data.sm_api_title,
                wordsReduced: data.sm_api_content_reduced,
                summary: data.sm_api_content,
              };
              setSummaryData(d);
              let UpdateallSummary = [d, ...allSummary];
              console.log(UpdateallSummary);
              setAllSummary(UpdateallSummary);
              localStorage.setItem(
                "Requests",
                JSON.stringify(UpdateallSummary)
              );
              setUrl("");
            }
          } else {
            toast.warn("Oops some error occurs");
          }
        } else {
          setValidate(true)
          toast.warn("Please enter an valid Url");
          setUrl("");
        }
      } else {
        setValidate(true)
        toast.warning("Url cannot be empty!");
      }
    } catch (e) {
      setLoading(false)
      console.log(e);
      toast.error(e.response.data.sm_api_message);
      setUrl("");
    }
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      FetchSummary();
    }
  };

  // JSX
  return (
    <div>
      <header className="header">
        <Header />
      </header>
      <section className="heading">
        <h1>
          AI content <span className="text">summarizer</span>
        </h1>
        {/* <h3>Unlocking Knowledge, One Click at a Time</h3> */}
        <h3>Instant content summaries</h3>
        <h4>Summarize your article, post, blog from pasting the Url..</h4>
      </section>
      <section>
        <div className="search_container">
          <div className="input" style={validate ? {border: "2px solid red"} : {border : "1px solid black"}}>
            <FiLink2
              className="icons"
              // onClick={() => console.log(summaryData)}
              title="Summarize link"
            />
            <input
              type="url"
              placeholder="Enter the Url to summarize"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={handleEnterKeyPress}
            />
            <AiOutlineEnter className="icons" onClick={FetchSummary} title="Search"/>
          </div>
        </div>
      </section>
      {/* Recent Container */}
      {oldDatas.length > 0 ? (
        <section className="recent_section">
          <h3>Your Recent links</h3>
          <Recent
            data={oldDatas}
            stateVariable={(summary) => setSummaryData(summary)}
          />
        </section>
      ) : (
        ""
      )}
        <section className="summary">
          {loading ? <div className="loaders">
            <MagnifyingGlass
          visible={true}
          height="80"
          width="80"
          ariaLabel="MagnifyingGlass-loading"
          wrapperStyle={{}}
          wrapperClass="MagnifyingGlass-wrapper"
          glassColor="#c0efff"
          color="#e15b64"
          className="search_icon"
        />
          </div> : <Summary data={summaryData} />}
        </section>
    </div>
  );
};

export default Main;
