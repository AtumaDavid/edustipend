import React, { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import { Button, Card } from "react-bootstrap";
import { motion } from "framer-motion";

const PlaylistItems = () => {
  const { data, isPending, error } = useFetch(
    "http://localhost:3000/playlists"
  );

  const [openPlaylistId, setOpenPlaylistId] = useState(null);
  const [displayLimit, setDisplayLimit] = useState(3);
  const totalItems = data ? data.length : 0;

  const togglePlaylist = (playlistId) => {
    setOpenPlaylistId((prevId) => (prevId === playlistId ? null : playlistId));
  };

  const handleLoadMore = () => {
    if (displayLimit >= totalItems) {
      setDisplayLimit((prevLimit) => prevLimit - 3);
    } else {
      setDisplayLimit((prevLimit) => prevLimit + 3);
    }
  };

  const handleViewLess = () => {
    setDisplayLimit((prevLimit) => prevLimit - 3);
  };

  // const handleDeletePlaylist = async (playlistId) => {
  //   try {
  //     await fetch(`http://localhost:3000/playlists/${playlistId}`, {
  //       method: "DELETE",
  //     });

  //     const updatedPlaylists = data.filter(
  //       (playlist) => playlist.id !== playlistId
  //     );
  //     setPlaylists(updatedPlaylists);
  //   } catch (error) {
  //     console.error("Error deleting playlist:", error);
  //   }
  // };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1.5 }}
    >
      <Card style={{ backgroundColor: "#8232f2" }}>
        <Card.Body className="scrollable-card-body">
          <Card.Title className="mb-5">
            <h1 className="gradient-text" style={{ fontSize: "2em" }}>
              My Playlists
            </h1>
          </Card.Title>
          {error && <p>{error}</p>}
          {isPending && <p>loading...</p>}
          {data &&
            data.slice(0, displayLimit).map((playlist) => (
              <Card className="mb-3 p-4" key={playlist.id}>
                <Card.Title className="d-flex justify-content-between align-items-center">
                  <>{playlist.title}</>

                  <>
                    <Button
                      onClick={() => togglePlaylist(playlist.id)}
                      style={{
                        backgroundColor: "#a500ff",
                        border: "1px solid ",
                      }}
                    >
                      {openPlaylistId === playlist.id
                        ? "Hide songs"
                        : "View songs"}
                    </Button>
                    {/* <Button
                      onClick={() => handleDeletePlaylist(playlist.id)}
                      variant="danger"
                      className="ms-2"
                      type="button"
                    >
                      Delete
                    </Button> */}
                  </>
                </Card.Title>
                {openPlaylistId === playlist.id && (
                  <ul>
                    {playlist.songs.map((song, index) => (
                      <li key={index}>{song}</li>
                    ))}
                  </ul>
                )}
              </Card>
            ))}

          <div className="d-flex justify-content-center">
            {displayLimit < totalItems ? (
              <>
                <Button
                  onClick={handleLoadMore}
                  className="me-3"
                  style={{
                    backgroundColor: "#a500ff",
                    border: "1px solid ",
                  }}
                >
                  View More
                </Button>
                <Button
                  onClick={handleViewLess}
                  style={{
                    backgroundColor: "#a500ff",
                    border: "1px solid ",
                  }}
                >
                  View Less
                </Button>
              </>
            ) : (
              <Button
                onClick={handleViewLess}
                style={{
                  backgroundColor: "#a500ff",
                  border: "1px solid ",
                }}
              >
                View Less
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default PlaylistItems;
