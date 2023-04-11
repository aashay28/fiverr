import React from "react";
import { Link } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest.get(`/orders`).then((res) => {
        return res.data;
      }),
  });

  return (
    <div className='orders'>
      <div className='container'>
        <div className='title'>
          <h1>Orders</h1>
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            {<th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>}
            <th>Contact</th>
          </tr>
          {isLoading
            ? "loading"
            : error
            ? "error"
            : data.map((order) => (
                <tr key={order._id}>
                  <td>
                    <img className='image' src={order.img} alt='' />
                  </td>
                  <td>{order.title}</td>
                  <td>{order.price}</td>
                  <td>
                    {currentUser.isSeller ? order.buyerId : order.sellerId}
                  </td>
                  <td>
                    <img className='message' src='./img/message.png' alt='' />
                  </td>
                </tr>
              ))}
          {/* <tr>
            <td>
              <img
                className='image'
                src='https://images.pexels.com/photos/270408/pexels-photo-270408.jpeg?auto=compress&cs=tinysrgb&w=1600'
                alt=''
              />
            </td>
            <td>Stunning concept art</td>
            <td>
              59.<sup>99</sup>
            </td>
            <td>Maria Anders</td>
            <td>
              <img className='message' src='./img/message.png' alt='' />
            </td>
          </tr> */}
        </table>
      </div>
    </div>
  );
};

export default Orders;
