import React from "react";
import { Link } from "react-router-dom";
import "./MyGigs.scss";
import { getCurrentUser, getAccessToken } from "../../utils/getCurrentUser";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
function MyGigs() {
  const currentUser = getCurrentUser();
  const token = getAccessToken();
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () =>
      newRequest(token)
        .get(`/gigs`)
        .then((res) => {
          return res.data;
        }),
  });
  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest(token).delete(`/gigs/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });
  const handleDelete = (id) => {
    mutation.mutate(id);
  };
  return (
    <div className='myGigs'>
      <div className='container'>
        <div className='title'>
          <h1>Gigs</h1>
          {currentUser.isSeller && (
            <Link to='/add'>
              <button>Add New Gig</button>
            </Link>
          )}
        </div>
        <table>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Price</th>
            <th>Sales</th>
            <th>Action</th>
          </tr>
          {isLoading
            ? "loading"
            : error
            ? "error"
            : data.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className='image' src={gig.cover} alt='' />
                  </td>
                  <td>{gig.title}</td>
                  <td>{gig.price}</td>
                  <td>{gig.sales}</td>
                  <td>
                    <img
                      className='delete'
                      src='./img/delete.png'
                      alt=''
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
        </table>
      </div>
    </div>
  );
}

export default MyGigs;
