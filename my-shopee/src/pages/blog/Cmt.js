import axios from "axios";
function Cmt({
  id,
  user,
  setComment,
  replyContent,
  replyId,
  setReplyContent,
  setReplyId,
  content,
  setContent,
  showReplyAfterParent,
  isLastChild,
}) {
  function handlePostCmt() {
    const isReply = replyId != null;
    const data = {
      id_blog: id,
      cmt: isReply ? replyContent : content,
      level: isReply ? replyId : 0,
    };
    axios
      .post("http://127.0.0.1:8000/api/blog/member/detail/cmt", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        setComment(res.data.comments);
        if (isReply) {
          setReplyContent("");
          setReplyId(null);
        } else {
          setContent("");
        }
      })
      .catch((error) => alert(error.message));
  }
  return (
    <>
      {isLastChild || showReplyAfterParent ? (
        <li
          style={{
            marginLeft: "50px",
            marginBottom: "20px",
            clear: "both",
          }}
        >
          <textarea
            className="form-control"
            rows="5"
            placeholder="Nội dung reply"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
          />
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "10px" }}
            onClick={handlePostCmt}
          >
            Post reply
          </button>
          <button
            type="button"
            className="btn btn-primary"
            style={{ marginTop: "10px", marginLeft: "10px" }}
            onClick={() => {
              setReplyId(null);
              setReplyContent("");
            }}
          >
            Cancel
          </button>
        </li>
      ) : (
        <div className="replay-box">
          <div className="row">
            <div className="col-sm-12">
              <h2>Leave a replay</h2>
              <div className="text-area">
                <div className="blank-arrow">
                  <label>{user.Auth.name}</label>
                </div>
                <span>*</span>
                <textarea
                  name="message"
                  rows={11}
                  defaultValue={""}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
                <a className="btn btn-primary" onClick={handlePostCmt}>
                  post comment
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
export default Cmt;
