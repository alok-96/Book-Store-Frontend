import axios from "axios";
import React from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const BookCard = (props) => {
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      console.log(id);
      await axios.delete("http://localhost:5000/books/" + id);
      toast.success("Book has been deleted successfully!");
      navigate("/");
      window.location.reload();
    } catch (err) {
      console.log(err);
      toast.error("Some error occured.");
    }
  };
  
  return (
    <div className="book-card">
      {props.cover && <img src={props.cover} alt="Book_Image" />}
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <p>{props.price}</p>
      <div className="actions">
        <button
          className="update"
          onClick={() => {
            navigate(`/update/${props.id}`);
          }}
        >
          Update
        </button>
        <button className="delete" onClick={() => handleDelete(props.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default BookCard;
