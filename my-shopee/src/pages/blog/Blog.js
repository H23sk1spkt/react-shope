import { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom";
function Blog(){
    const [blog,setBlog]=useState([]);
    const [page,setPage]=useState(1);
    const [lastPage,setLastPage]=useState(1);
    useEffect(()=> {
        axios.get(`http://127.0.0.1:8000/api/blog/member?page=${page}`)
        .then((res)=> {
            console.log(res)
            setBlog(res.data.blog.data);
            setLastPage(res.data.blog.last_page);
        })
        .catch((error)=> console.log(error))
    },[page])
    // sau khi thay đổi trang thì chạy lại useeffect 
    return (
        <>
            <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {blog.map((value)=> {

            return <>
                <div className="single-blog-post">
                  <h3>{value.title}</h3>
                  <div className="post-meta">
                    <ul>
                      <li><i className="fa fa-user" /> Mac Doe</li>
                      <li><i className="fa fa-clock-o" /> 1:33 pm</li>
                      <li><i className="fa fa-calendar" /> DEC 5, 2013</li>
                    </ul>
                    <span>
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star" />
                      <i className="fa fa-star-half-o" />
                    </span>
                  </div>
                  <a href>
                    <img src={`http://127.0.0.1:8000/uploads/user/avatar/${value.image}`} alt="" />
                  </a>
                  <p>{value.description}</p>
                  <Link className="btn btn-primary" to={`/blog/${value.id}`}>Read More</Link>
                </div>
            </>
          })}
          
          <div className="pagination-area">
            <ul className="pagination">
              {[...Array(lastPage)].map((_,index)=> {
                const number=index+1;
                return <>
                    <li key={number}>
                        <a href="#" className={page===number ? 'active' : ""} onClick={(e)=> {
                            e.preventDefault();
                            setPage(number)
                        }}>{number}</a>
                    </li>
                </>
              })}
              {lastPage>3 && page<lastPage && (
                <li>
                    <a href="#" onClick={(e)=> {
                        e.preventDefault();
                        setPage(page+1);
                    }}>
                        <i className="fa fa-angle-double-right"/>
                    </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
        </>
    )

}
export default Blog