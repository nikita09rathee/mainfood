import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Cardsdata from "./CardsData";
import axios from "axios";
import "./style.css";
import { useDispatch } from "react-redux";
import { ADD } from "../redux/actions/action";

const Cards = () => {
  const [data, setData] = useState(Cardsdata);
  const [searchdata, setSearchdata] = useState("");
  // console.log(data);

  const dispatch = useDispatch();

  const send = (e) => {
    // console.log(e);
    dispatch(ADD(e));
  };

  function handlesort(e) {
    if (e.target.value === "low") {
      // getdata.sort((first, second) => first.username - second.username);
      data.sort((a, b) => {
        if (a.price > b.price) return 1;
        else return -1;
      });
      setData([...data]);
    } else if (e.target.value === "high") {
      data.sort((a, b) => {
        if (a.price > b.price) return -1;
        else return 1;
      });
      setData([...data]);
    }
  }

  return (
    <div className="container mt-3">
      <h2 className="text-center">Add to Cart Projects</h2>
      {/* <h1> this is card page</h1> */}
      <div id="bellowNav">
        <div>
          <h2>SORT BY PRICE</h2>
          <button className="btn 4" value={"high"} onClick={handlesort}>
            HIGH{" "}
          </button>
          <button className="btn" value={"low"} onClick={handlesort}>
            LOW
          </button>
        </div>{" "}
        <div>
          <input
            type="text"
            placeholder="Enter your fav dish.."
            id="inputfield"
            onChange={(event) => setSearchdata(event.target.value)}
          />

          <button className="search">Search</button>
        </div>
      </div>
      <div className="row d-flex justify-content-center align-items-center">
        {data
          .filter((element) => {
            if (!searchdata) {
              // alert("This item is not Available");/
              return element;
            } else if (
              element.rname.toLowerCase().includes(searchdata.toLowerCase())
            ) {
              return element;
            }
          })
          .map((element, id) => {
            return (
              <>
                <Card
                  style={{ width: "22rem", border: "none" }}
                  className="mx-2 mt-4 card_style"
                >
                  <Card.Img
                    variant="top"
                    src={element.imgdata}
                    style={{ height: "16rem" }}
                    className="mt-3"
                  />
                  <Card.Body>
                    <Card.Title>{element.rname}</Card.Title>
                    <Card.Text>Price : ₹ {element.price}</Card.Text>
                    <div className="button_div d-flex justify-content-center">
                      <Button
                        variant="primary"
                        onClick={() => send(element)}
                        className="col-lg-12"
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </>
            );
          })}
        {/* <button>Prev</button>
        <button>Next</button> */}
      </div>
      {/* <button>hello</button> */}
    </div>
  );
};

// {
//   document.getElementById("inputfield").style.border = "#0a95ff";
// }

export default Cards;
