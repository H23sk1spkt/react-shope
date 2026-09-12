import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [avg, setAvg] = useState(0);
  const [countVote, setCountVote] = useState(0);
  const [comments, setComment] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
  const [hover, setHover] = useState(0);
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();
  // reply ban đầu bằng null nghĩa là ng dùng chưa chọn comment nào để reply
  const [replyId, setReplyId] = useState(null);
  // nội dung nhập của reply
  const [replyContent, setReplyContent] = useState("");
  // nội dung của comment chaa
  const [content, setContent] = useState("");

  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/blog/member/detail/${id}`)
      .then((res) => {
        setBlog(res.data.blog);
        setAvg(res.data.avgRate);
        setCountVote(res.data.countVote);
        setComment(res.data.comments);
        setPrev(res.data.prev);
        setNext(res.data.next);
      })
      .catch((error) => console.log(error));
  }, [id]);
  function handleSubmitRating(value) {
    axios
      .post(
        "http://127.0.0.1:8000/api/blog/member/detail/rate",
        {
          rate: value,
          id_blog: id,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        },
      )
      .then((res) => {
        alert(res.data.message);
        setAvg(res.data.rates.avg);
        setCountVote(res.data.rates.countVote);
      })
      .catch((error) => alert(error.response?.data?.message || error.message));
  }
  function handlePostCmt() {
    const isReply = replyId !== null;
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
      .catch((error) => alert(error.data.message));
  }
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          <div className="single-blog-post">
            <h3>{blog.description}</h3>
            <div className="post-meta">
              <ul>
                <li>
                  <i className="fa fa-user" /> Mac Doe
                </li>
                <li>
                  <i className="fa fa-clock-o" /> 1:33 pm
                </li>
                <li>
                  <i className="fa fa-calendar" /> DEC 5, 2013
                </li>
              </ul>
              {/* <span>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star"></i>
									<i class="fa fa-star-half-o"></i>
								</span> */}
            </div>
            <a href>
              <img
                src={`http://127.0.0.1:8000/uploads/user/avatar/${blog.image}`}
                alt=""
              />
            </a>
            <p>{blog.content}</p>
            <div className="pager-area">
              <ul className="pager pull-right">
                {prev ? (
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/blog/${prev.id}`);
                      }}
                    >
                      Pre
                    </a>
                  </li>
                ) : (
                  ""
                )}
                {next ? (
                  <li>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/blog/${next.id}`);
                      }}
                    >
                      Next
                    </a>
                  </li>
                ) : (
                  ""
                )}
              </ul>
            </div>
          </div>
        </div>
        {/*/blog-post-area*/}
        <div className="rating-area">
          <ul className="ratings">
            <li className="rate-this">Rate this item:</li>
            <li>
              {[...Array(5)].map((_, i) => {
                return (
                  <i
                    key={i}
                    className={`fa fa-star ${i + 1 <= avg ? "color" : ""}`}
                    onClick={() => {
                      handleSubmitRating(i + 1);
                    }}
                    style={{ cursor: "pointer" }}
                  />
                );
              })}
            </li>
            <li className="color">
              {countVote} {countVote >= 2 ? "votes" : "vote"}
            </li>
          </ul>
          <ul className="tag">
            <li>TAG:</li>
            <li>
              <a className="color" href>
                Pink <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                T-Shirt <span>/</span>
              </a>
            </li>
            <li>
              <a className="color" href>
                Girls
              </a>
            </li>
          </ul>
        </div>
        {/*/rating-area*/}
        <div className="socials-share">
          <a href>
            <img src="images/blog/socials.png" alt="" />
          </a>
        </div>
        {/*/socials-share*/}
        {/* <div class="media commnets">
						<a class="pull-left" href="#">
							<img class="media-object" src="images/blog/man-one.jpg" alt="">
						</a>
						<div class="media-body">
							<h4 class="media-heading">Annie Davis</h4>
							<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.  Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
							<div class="blog-socials">
								<ul>
									<li><a href=""><i class="fa fa-facebook"></i></a></li>
									<li><a href=""><i class="fa fa-twitter"></i></a></li>
									<li><a href=""><i class="fa fa-dribbble"></i></a></li>
									<li><a href=""><i class="fa fa-google-plus"></i></a></li>
								</ul>
								<a class="btn btn-primary" href="">Other Posts</a>
							</div>
						</div>
					</div> */}
        {/*Comments*/}
        <div className="response-area">
          <h2>3 RESPONSES</h2>
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
        </div>
        {/*/Response-area*/}
        {user ? (
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
        ) : (
          ""
        )}
        {/*/Repaly Box*/}
      </div>
    </>
  );
}
export default BlogDetails;
