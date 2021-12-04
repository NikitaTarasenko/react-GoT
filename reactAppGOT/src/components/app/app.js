import React, { Component } from "react";
import { Col, Row, Container } from "reactstrap";
import Header from "../header";
import RandomChar from "../randomChar";
import styled from "styled-components";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CharacterPage, HousesPage, BooksPage, BooksItem } from "../pages";

import "./app.css";

const ToggleBtn = styled.button`
  background-color: aqua;
  padding: 10px 20px;
  margin: 20px 0;
`;

export default class App extends Component {
  gotService = new GotService();

  state = {
    showRandomChar: true,
    error: false,
  };

  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  ToggleItem = () => {
    this.setState((state) => {
      return {
        showRandomChar: !state.showRandomChar,
      };
    });
  };

  render() {
    const char = this.state.showRandomChar ? <RandomChar /> : null;

    if (this.state.error) {
      return <ErrorMessage />;
    }

    return (
      <Router>
        <div className="app">
          <Container>
            <Header />
          </Container>
          <Container>
            <Row>
              <Col lg={{ size: 5, offset: 0 }}>
                {char}
                <ToggleBtn onClick={this.ToggleItem}>
                  Toggle Random Char
                </ToggleBtn>
              </Col>
            </Row>
            <Route path="/characters" component={CharacterPage} />
            <Route path="/houses" exact component={HousesPage} />
            <Route path="/books" exact component={BooksPage} />
            <Route
              path="/books/:id"
              render={({ match }) => {
                const { id } = match.params;
                return <BooksItem bookId={id} />;
              }}
            />
          </Container>
        </div>
      </Router>
    );
  }
}
