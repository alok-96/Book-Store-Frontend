import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: "",
    description: "",
    price: 0,
    cover: null,
  });

  const handleImage = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const baseURL = reader.result;
      setBook({...book, cover:baseURL})
    };
  };

  const handleChange = (e) =>{
    setBook({...book, [e.target.name]: e.target.value});
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);
    try {
      await axios.post("http://localhost:5000/books", book);
      toast.success("Book has been added successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured.");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Add Book</h2>
        <div>
          <label>Title</label> <br />
          <input
            type="text"
            name="title"
            required
            className="input-field"
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label> <br />
          <input
            type="text"
            name="description"
            required
            className="input-field"
            value={book.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Price</label> <br />
          <input
            type="number"
            name="price"
            required
            className="input-field"
            value={book.price}
            min={1}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Cover Image</label> <br />
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="input-field"
            onChange={handleImage}
          />
        </div>
        <button type="submit" className="btn">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddBook;
