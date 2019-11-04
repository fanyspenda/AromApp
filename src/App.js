import React from "react";
import CreateRecipe from "./pages/CreateRecipe";
import { Menu } from "semantic-ui-react";

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
            active={activeItem === "Create Recipe"}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name="List Recipes"
            active={activeItem === "List Recipes"}
            onClick={this.handleItemClick}
          />
        </Menu>
        <CreateRecipe />
      </>
    );
  }
}
