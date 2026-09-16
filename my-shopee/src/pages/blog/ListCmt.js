import axios from "axios";
function ListCmt({
  id,
  user,
  comments,
  replyContent,
  replyId,
  setReplyContent,
  setReplyId,
  getCmt,
}) {
  function handlePostCmt() {
    const data = {
      id_blog: id,
      cmt: replyContent,
      level: replyId,
    };
    axios
      .post("http://127.0.0.1:8000/api/blog/member/detail/cmt", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        getCmt(res.data.comments);
        setReplyContent("");
        setReplyId(null);
      })
      .catch((error) => alert(error.message));
  }
  return (
    <>
      <ul className="media-list">
        {comments.map((value, key) => {
          // kiểm tra xem cmt đó có cmt con ko
          const hasChildren = comments.some(
            (comment) => comment.level === value.id,
          );
          // kiểm tra xem cmt con này có phải cmt cuối của cmt cha ko
          const isLastChild =
            replyId !== null &&
            value.level === replyId &&
            (!comments[key + 1] || comments[key + 1].level !== replyId);
          const showReplyAfterParent = replyId === value.id && !hasChildren;
          return (
            <div
              key={value.id}
              style={{ display: "block", width: "100%", clear: "both" }}
            >
              <li className={`media ${value.level > 0 ? "second-media" : ""}`}>
                <a className="pull-left" href="#">
                  <img
                    className="media-object"
                    src="images/blog/man-two.jpg"
                    alt=""
                  />
                </a>
                <div className="media-body">
                  <ul className="sinlge-post-meta">
                    <li>
                      <i className="fa fa-user" />
                      {value.name}
                    </li>
                    <li>
                      <i className="fa fa-clock-o" /> 1:33 pm
                    </li>
                    <li>
                      <i className="fa fa-calendar" /> DEC 5, 2013
                    </li>
                  </ul>
                  <p>{value.cmt}</p>
                  {value.level === 0 && (
                    <a
                      className="btn btn-primary"
                      onClick={(e) => {
                        e.preventDefault();
                        // lưu id của cha lại
                        // sau khi replyId có giá trị thì sẽ render lại từ đầu để hiện thị form reply
                        setReplyId(value.id);
                        // Xoá nội dung text cũ
                        setReplyContent("");
                      }}
                    >
                      <i className="fa fa-reply" />
                      Replay
                    </a>
                  )}
                </div>
              </li>
              {isLastChild && (
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
              )}
              {showReplyAfterParent && (
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
              )}
            </div>
          );
        })}
      </ul>
    </>
  );
}
export default ListCmt;
