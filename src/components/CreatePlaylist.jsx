import React, { useRef, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { useFetch } from "../hooks/useFetch";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/playlist-animation.json";

const CreatePlaylist = () => {
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [newSongs, setNewSongs] = useState("");
  const [songs, setSongs] = useState([]);
  const songInput = useRef(null);

  const { postData, error } = useFetch(
    "http://localhost:3000/playlists",
    "POST"
  );

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleAdd = (e) => {
    e.preventDefault();
    const sng = newSongs.trim();

    // disallow duplicate songs
    if (sng && !songs.includes(sng)) {
      setSongs((prevSongs) => [...prevSongs, sng]);
    }
    setNewSongs("");
    songInput.current.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(title, songs);

    postData({
      title,
      songs,
    });
  };

  // hover effect button
  // const buttonVariants = {
  //   hover: {
  //     scale: 1.1, // Increase the scale on hover
  //   },
  // };

  return (
    <motion.div
      className="mt-5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.5 }}
    >
      <div>
        <h1 className="gradient-text">Make your party fun!!!</h1>
        <p className="sub-text text-light">
          Create your own custom playlist!!!
        </p>
      </div>
      <div className="d-flex align-items-center">
        <motion.button
          className=""
          style={{
            backgroundColor: "#a500ff",
            border: "1px solid white",
            fontSize: "24px",
            padding: "16px 16px",
            color: "white",
            borderRadius: "8px",
            marginRight: "16px",
          }}
          onClick={handleShow}
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 8px rgb(255,255,255)",
            boxShadow: "0px 0px 8px rgb(255,255,255)",
          }}
          transition={{ duration: 0.2 }}
        >
          Create Playlist
        </motion.button>
        <Lottie
          animationData={animationData}
          style={{ height: "300px", width: "300px" }}
        />
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create your Playlists</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Title: </Form.Label>
              <Form.Control
                type="text"
                placeholder="playlist title"
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Playlist Songs: </Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setNewSongs(e.target.value)}
                value={newSongs}
                ref={songInput}
              />
              <Button
                className="mt-2"
                onClick={handleAdd}
                style={{
                  backgroundColor: "#a500ff",
                  border: "1px solid ",
                }}
              >
                add
              </Button>
              <p>
                Current songs:{" "}
                {songs.map((i) => (
                  <em key={i}>{i}, </em>
                ))}
              </p>
            </Form.Group>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={handleClose}
                style={{
                  backgroundColor: "red",
                  border: "1px solid ",
                }}
              >
                Close
              </Button>
              <Button
                onClick={handleClose}
                type="submit"
                style={{
                  backgroundColor: "#a500ff",
                  border: "1px solid ",
                }}
              >
                Create!
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </motion.div>
  );
};

export default CreatePlaylist;
