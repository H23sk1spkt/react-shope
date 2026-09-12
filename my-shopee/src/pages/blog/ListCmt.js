import Cmt from "./Cmt";
function ListCmt({id,user,comments,setComment,replyContent,replyId,setReplyContent,setReplyId}){
   return <>
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
                  <li
                    className={`media ${value.level > 0 ? "second-media" : ""}`}
                  >
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
                    <Cmt replyId={replyId} setReplyId={setReplyId} replyContent={replyContent} setReplyContent={setReplyContent} isLastChild={isLastChild} setComment={setComment} id={id} user={user} />
                  )}
                  {showReplyAfterParent && (
                    <Cmt replyId={replyId} setReplyId={setReplyId} replyContent={replyContent} setReplyContent={setReplyContent} showReplyAfterParent={showReplyAfterParent} setComment={setComment} id={id} user={user}/>
                  )}
                </div>
              );
            })}
          </ul>
   </>
}
export default ListCmt