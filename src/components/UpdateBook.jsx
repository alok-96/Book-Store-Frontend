import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateBook = () => {
  const navigate = useNavigate();
  const location = useLocation(); // gives the path of url
  const bookId = location.pathname.split("/")[2];

  const [book, setBook] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(book);
    try {
      await axios.put("http://localhost:5000/books/" + bookId, book);
      toast.success("Book has been updated Successfully!");
      navigate("/");
    } catch (err) {
      console.log(err);
      toast.error("Some error occured.");
    }
  };

  useEffect(() => {
    const fetchBookDetail = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/books/" + bookId,
          book
        );
        console.log(res.data[0]);
        setBook(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBookDetail();
  }, []);

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h2>Update Book</h2>
        <div>
          <label>Title</label> <br />
          <input
            type="text"
            name="title"
            required
            className="input-field"
            defaultValue={book.title}
            value={book.title}
            onChange={(e) =>
              setBook({ ...book, [e.target.name]: e.target.value })
            }
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
            onChange={(e) =>
              setBook({ ...book, [e.target.name]: e.target.value })
            }
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
            onChange={(e) =>
              setBook({ ...book, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label>Cover Image</label> <br />
          <input
            type="file"
            name="cover"
            accept="image/*"
            className="input-field"
            value={book.cover}
            onChange={(e) =>
              setBook({ ...book, [e.target.name]: e.target.files[0] })
            }
          />
        </div>
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;
