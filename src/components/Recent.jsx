import React, { useEffect } from "react";
import { FiLink2 } from "react-icons/fi";
import { useState } from "react";
const Recent = (props) => {
  const [Recents, setRecent] = useState([]);
  const [content, setContent] = useState("Show more");
  const [toggle, setToggle] = useState(true);
  let { stateVariable } = props;
  useEffect(() => {
    setRecent(props.data.slice(0, 2));
  }, []);
  let ShowMore = () => {
    if (toggle) {
      setRecent(props.data.slice(0,6));
      setContent("Show less");
      setToggle(false);
    } else {
      setRecent(props.data.slice(0, 2));
      setContent("Show more");
      setToggle(true)
    }
  };
  return (
    <div>
      {Recents.map((i, index) => {
        return (
          <div
            className="recent_tab"
            key={index}
            onClick={() =>
              stateVariable({
                totalWords: i.totalWords,
                title: i.title,
                summary: i.summary,
              })
            }
          >
            <div className="recent_container">
              <FiLink2 className="link_icon" />
              <p>{i.Url.slice(0,45)}</p>
            </div>
          </div>
        );
      })}
      {props.data.length > 2 ? <div className="show_more" onClick={ShowMore}>
        {content}
      </div>: " "}
    </div>
  );
};

export default Recent;
