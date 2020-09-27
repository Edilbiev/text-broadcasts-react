import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import dayjs from "dayjs";
import s from "./onlines.module.css";
import { useDispatch } from "react-redux";
import DropdownMenu from "../DropdownMenu";
import { onlineDeleted } from "../../redux/actions";
import Popup from "../common/Popup";
import OnlineEditor from "../OnlineEditor";

function Onlines({ online, isAdmin }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = () => {
    if (isAdmin) {
      history.push("/admin/" + online._id);
    } else {
      history.push("/" + online._id);
    }
  };

  const [popup, setPopup] = useState(false);
  const handlePopup = () => setPopup(!popup);

  const handleDelete = (e) => {
    e.stopPropagation();
    dispatch(onlineDeleted(online._id));
  };

  const [editor, setEditor] = useState(false);
  const handleEditor = () => setEditor(!editor);

  return (
    <div>
      <div className={s.online} onClick={handleClick}>
        <div className={s.time}>
          {dayjs(online.startedDate).format("HH:mm")}
          {isAdmin ? (
            <DropdownMenu
              handlePopup={handlePopup}
              handleEditor={handleEditor}
            />
          ) : null}
        </div>
        <div className={s.title}>{online.title}</div>
        <div
          className={s.content}
          dangerouslySetInnerHTML={{ __html: online.introtext }}
        />
      </div>
      <Popup
        isOpened={popup}
        cancel={handlePopup}
        action={handleDelete}
        text={"Подтвердите действие"}
      />
      <OnlineEditor
        online={online}
        isOpened={editor}
        cancel={handleEditor}
      />
    </div>
  );
}

export default Onlines;
