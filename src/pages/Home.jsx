import React from "react";
import { Col, Row } from "react-bootstrap";
import CreatePlaylist from "../components/CreatePlaylist";
import PlaylistItems from "../components/PlaylistItems";

const Home = () => {
  return (
    <div>
      <Row className="g-3">
        <Col xs={12} md={8}>
          <CreatePlaylist />
        </Col>
        <Col xs={6} md={4}>
          <PlaylistItems />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
