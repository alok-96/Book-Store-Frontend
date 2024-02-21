import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const AddBook = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const [book, setBook] = useState({
    title: "",
    author: "",
    price: 0,
    cover: "",
  });
  const [image, setImage] = useState("");

  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const AddingIntoDB = async (cover) => {
    if (book.id) {
      try {
        await axios.put("http://localhost:5000/books/" + book.id, {
          ...book,
          cover: cover,
        });
        console.log();
        toast.success("Book has been updated Successfully!");
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Some error occured.");
      }
    } else {
      try {
        await axios.post("http://localhost:5000/books", {
          ...book,
          cover: cover,
        });
        toast.success("Book has been added successfully!");
        navigate("/");
      } catch (err) {
        console.log(err);
        toast.error("Some error occured.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "BookStore");
    data.append("cloud_name", "dccf2xkje");

    fetch("https://api.cloudinary.com/v1_1/dccf2xkje/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data.url);
        AddingIntoDB(data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (location.state) {
      setBook(location.state.data);
    }
  }, []);

  return (
    <div className="container">
      <form
        onSubmit={handleSubmit}
        className="form-container"
        encType="multipart/form-data"
      >
        <h2>{book.id ? "Update" : "Add"} Book</h2>
        <div>
          <label>Title</label> <br />
          <input
            type="text"
            name="title"
            required
            className="input-field"
            value={book.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Author</label> <br />
          <input
            type="text"
            name="author"
            required
            className="input-field"
            value={book.author}
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
            multiple={false}
            className="input-field"
            onChange={handleImage}
          />
        </div>
        <button type="submit" className="btn">
          {book.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddBook;
