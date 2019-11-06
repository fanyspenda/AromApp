import React from "react";
import { Menu } from "semantic-ui-react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import CreateRecipe from "./pages/CreateRecipe";
import ListRecipe from "./pages/ListRecipe";

// class Formik extends React.Component {
//   state = {
//     values: {
//       email: "",
//       password: ""
//     },
//     loading: false
//   };

//   handleChange = (name, value) => {
//     this.setState();
//   };

//   render() {
//     <div>
//       <h1>Judulnya</h1>
//       {/* {this.props.children(this.state.values)} */}
//       {this.props.render({ state: this.state, handleChange: handleChange })}
//     </div>;
//   }
// }

export default class App extends React.Component {
  state = {
    activeItem: "AromApp"
  };

  handleItemClick = (e, { name }) =>
    this.setState({
      activeItem: name
    });

  render() {
    const { activeItem } = this.state;
    return (
      <>
        <Router>
          {/* <Formik>
          {({ state, handleChange }) => (
            <form>
              <input type="email" value={values.email}></input>
              <input type="password" value={values.password}></input>
            </form>
          )}
        </Formik>

        <Formik
          render={values => (
            <>
              <input type="email" value={values.email}></input>
              <input type="password" value={values.password}></input>
            </>
          )}
        /> */}

          <Menu color="red" inverted>
            <Menu.Item
              header
              name="AromApp"
              className="AromApp"
              onClick={this.handleItemClick}
            >
              AromApp
            </Menu.Item>
            <Menu.Item
              name="Create Recipe"
              as={Link}
              to="/createrecipe"
              active={activeItem === "Create Recipe"}
              onClick={this.handleItemClick}
            />
            <Menu.Item
              name="List Recipes"
              as={Link}
              to="/"
              active={activeItem === "List Recipes"}
              onClick={this.handleItemClick}
            />
          </Menu>

          <Route path="/" exact component={ListRecipe} />
          <Route path="/createrecipe" exact component={CreateRecipe} />
        </Router>
      </>
    );
  }
}
