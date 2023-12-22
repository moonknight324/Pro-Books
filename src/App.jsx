import "./App.css";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";

function App() {
  const [bookData, setbookData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://reactnd-books-api.udacity.com/books`, {
        headers: { Authorization: "whatever-you-want" },
      })
      .then((out) => {
        setbookData(out.data.books);
      })
      .catch((error) => {
        console.log("Status Code: " + error.response.status);
        if (error.response.status !== 404) {
          console.log(error);
        } else {
          console.log("Website not found");
        }
      });
  }, []);

  return (
    <div>
      {bookData.map((book) => {
        return (
          <div key={book.id}>
            <h2>{book.title}</h2>
            <div className="main">
              <img
                width={300}
                height={300}
                src={book.imageLinks.smallThumbnail}
                alt=""
              ></img>
              <p>{book.description}</p>
            </div>
            {book.authors.map((author, index) => {
              return <h4 key={index}>{author}</h4>;
            })}
            <hr></hr>
          </div>
        );
      })}
    </div>
  );
}

export default App;
