import axios from "axios";
function Cmt({
  id,
  user,
  content,
  setContent,
  getCmt
}) {
  function handlePostCmt() {
    if(!content.trim()){
      alert("Vui lòng nhập nội dung bình luận");
      return 
    }
    const data = {
      id_blog: id,
      cmt: content,
      level: 0,
    };
    axios
      .post("http://127.0.0.1:8000/api/blog/member/detail/cmt", data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((res) => {
         console.log("POST RESPONSE:", res.data);
          console.log("COMMENTS:", res.data.comments);
          console.log("TYPE:", typeof res.data.comments);
        getCmt(res.data.comments)
        setContent("");
      })
      .catch((error) => alert(error.message));
  }
  return (
    <>
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
    </>
  );
}
export default Cmt;
