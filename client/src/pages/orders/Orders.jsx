import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Orders.scss";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
const Orders = () => {
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () =>
      newRequest(token)
        .get(`/orders`)
        .then((res) => {
          return res.data;
        }),
  });
  const openConversation = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest(token).get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response.status === 404) {
        const res = await newRequest(token).post(`/conversations/`, {
          to: currentUser.seller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };
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
                  <td onClick={() => openConversation(order)}>
                    <img className='message' src='./img/message.png' alt='' />
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
};

export default Orders;
