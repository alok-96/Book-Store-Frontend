import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookCard from "./BookCard";

const Books = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/books");
        console.log(res);
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchBooks();
  }, []);

  return (
    <>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>Book Store</h1>
      <div className="book-container">
        {books.map((item) => {
          return (
            <BookCard
              key={item.id}
              id={item.id}
              cover={item.cover}
              title={item.title}
              description={item.description}
              price={item.price}
            />
            
          );
        })}
      </div>
      <button
        className="btn"
        style={{
          marginInline: "auto",
          marginBottom: "50px",
          display: "flex",
          justifyContent: "center",
        }}
        onClick={() => {
          navigate("/add");
        }}
      >
        Add New Book
      </button>
    </>
  );
};

export default Books;
