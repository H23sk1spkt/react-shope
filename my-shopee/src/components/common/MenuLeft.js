import { use, useState } from "react"
import Slider from "@mui/material/Slider"
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
function MenuLeft(){
    const {min,max}=useParams();
    const [price,setPrice]=useState([Number(min??0),Number(max ?? 20)]);
    const navigate=useNavigate();
    function handlePriceChange(e,newValue){
        e.preventDefault();
        setPrice(newValue)
        navigate(`/searchPrice/${newValue[0]}/${newValue[1]}`)
    }
    return (
        <>
        <div className="col-sm-3">
            <div className="left-sidebar">
                <h2>Category</h2>
                <div className="panel-group category-products" id="accordian">{/*category-productsr*/}
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#sportswear">
                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Sportswear
                        </a>
                    </h4>
                    </div>
                    <div id="sportswear" className="panel-collapse collapse">
                    <div className="panel-body">
                        <ul>
                        <li><a href="#">Nike </a></li>
                        <li><a href="#">Under Armour </a></li>
                        <li><a href="#">Adidas </a></li>
                        <li><a href="#">Puma</a></li>
                        <li><a href="#">ASICS </a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#mens">
                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Mens
                        </a>
                    </h4>
                    </div>
                    <div id="mens" className="panel-collapse collapse">
                    <div className="panel-body">
                        <ul>
                        <li><a href="#">Fendi</a></li>
                        <li><a href="#">Guess</a></li>
                        <li><a href="#">Valentino</a></li>
                        <li><a href="#">Dior</a></li>
                        <li><a href="#">Versace</a></li>
                        <li><a href="#">Armani</a></li>
                        <li><a href="#">Prada</a></li>
                        <li><a href="#">Dolce and Gabbana</a></li>
                        <li><a href="#">Chanel</a></li>
                        <li><a href="#">Gucci</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title">
                        <a data-toggle="collapse" data-parent="#accordian" href="#womens">
                        <span className="badge pull-right"><i className="fa fa-plus" /></span>
                        Womens
                        </a>
                    </h4>
                    </div>
                    <div id="womens" className="panel-collapse collapse">
                    <div className="panel-body">
                        <ul>
                        <li><a href="#">Fendi</a></li>
                        <li><a href="#">Guess</a></li>
                        <li><a href="#">Valentino</a></li>
                        <li><a href="#">Dior</a></li>
                        <li><a href="#">Versace</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Kids</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Fashion</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Households</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Interiors</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Clothing</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Bags</a></h4>
                    </div>
                </div>
                <div className="panel panel-default">
                    <div className="panel-heading">
                    <h4 className="panel-title"><a href="#">Shoes</a></h4>
                    </div>
                </div>
                </div>{/*/category-products*/}
                <div className="brands_products">{/*brands_products*/}
                <h2>Brands</h2>
                <div className="brands-name">
                    <ul className="nav nav-pills nav-stacked">
                    <li><a href="#"> <span className="pull-right">(50)</span>Acne</a></li>
                    <li><a href="#"> <span className="pull-right">(56)</span>Grüne Erde</a></li>
                    <li><a href="#"> <span className="pull-right">(27)</span>Albiro</a></li>
                    <li><a href="#"> <span className="pull-right">(32)</span>Ronhill</a></li>
                    <li><a href="#"> <span className="pull-right">(5)</span>Oddmolly</a></li>
                    <li><a href="#"> <span className="pull-right">(9)</span>Boudestijn</a></li>
                    <li><a href="#"> <span className="pull-right">(4)</span>Rösch creative culture</a></li>
                    </ul>
                </div>
                </div>{/*/brands_products*/}
                <div className="price-range">{/*price-range*/}
                <h2>Price Range</h2>
                <div className="well text-center">
                   <Slider value={price} onChange={handlePriceChange} valueLabelDisplay="auto" min={0} max={100} step={5} />
                   <b className="pull-left">${price[0]}</b>
                   <b className="pull-right">${price[1]}</b>
                </div>
                </div>{/*/price-range*/}
                <div className="shipping text-center">{/*shipping*/}
                <img src="images/home/shipping.jpg" alt="" />
                </div>{/*/shipping*/}
            </div>
        </div>
        </>
    )
}
export default MenuLeft