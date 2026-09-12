import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Rate from "./Rate";
import ListCmt from "./ListCmt";
import Cmt from "./Cmt";
function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState([]);
  const [avg, setAvg] = useState(0);
  const [countVote, setCountVote] = useState(0);
  const [comments, setComment] = useState([]);
  const [prev, setPrev] = useState(null);
  const [next, setNext] = useState(null);
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
        <Rate
          id={id}
          avg={avg}
          countVote={countVote}
          setAvg={setAvg}
          setCountVote={setCountVote}
          user={user}
        />
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
          <ListCmt
            id={id}
            user={user}
            comments={comments}
            setComment={setComment}
            replyId={replyId}
            setReplyId={setReplyId}
            replyContent={replyContent}
            setReplyContent={setReplyContent}
          />
        </div>
        {/*/Response-area*/}
        {user ? (
          <Cmt
            content={content}
            setContent={setContent}
            setComment={setComment}
            id={id}
            user={user}
          />
        ) : (
          ""
        )}
        {/*/Repaly Box*/}
      </div>
    </>
  );
}
export default BlogDetails;
