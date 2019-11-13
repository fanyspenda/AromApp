import { Card, Image, Segment, Grid, Button } from "semantic-ui-react";
import React from "react";
import axios from "axios";

export default class ListRecipe extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount = () => {
    this.getData()
  };

  getData = () => {
    axios.get("https://arom-app-backend.herokuapp.com/recipe").then(res => {
      this.setState({
        recipes: res.data
      });
    });
  }

  deleteData = (id) => {
    axios.delete(`https://arom-app-backend.herokuapp.com/recipe/${id}`).then(res => {
      this.getData()
    });
  }

  handleCardClick = (recipe, urlImage) => {
    recipe.urlImage = urlImage;
    this.props.history.push("/detailrecipe", { recipe });
  };

  handleDeleteButtonClick = (id) => {
    this.deleteData(id)
  }

  render() {
    return (
      <>
        <Segment basic>
          <Card.Group>
            { this.state.recipes.map((recipe, index) => (
              <Card
                centered
                color="red"
              >
                <Image src={ recipe.image_url } wrapped ui={ true } />
                <Card.Content onClick={ () => this.handleCardClick(recipe) }>
                  <Card.Header>
                    <p
                      style={ {
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "260px"
                      } }
                    >
                      { recipe.name }
                    </p>
                  </Card.Header>
                </Card.Content>
                <Card.Content>
                  <Button
                    onClick={ () => this.handleDeleteButtonClick(recipe._id) }
                    color="red">
                    Delete
                  </Button>
                </Card.Content>
              </Card>
            )) }
          </Card.Group>
        </Segment>
      </>
    );
  }
}
