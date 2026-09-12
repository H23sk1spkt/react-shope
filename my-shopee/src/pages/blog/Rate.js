import axios from "axios";
function Rate({id,user,avg,setAvg,countVote,setCountVote}){
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
        console.log('Chạy ổn rồi nè')
        alert(res.data.message);
        setAvg(res.data.rates.avg);
        setCountVote(res.data.rates.countVote);
      })
      .catch((error) =>  alert(error.response?.data?.message || error.message));
  }
    return <>
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
    </>
}
export default Rate