import { Card, Image, Segment, Grid } from "semantic-ui-react";
import React from "react";
import axios from "axios";

export default class ListRecipe extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount = () => {
    axios.get("https://arom-app-backend.herokuapp.com/recipe").then(res => {
      this.setState({
        recipes: res.data
      });
    });
  };

  handleCardClick = (recipe, urlImage) => {
    recipe.urlImage = urlImage;
    this.props.history.push("/detailrecipe", { recipe });
  };

  render() {
    return (
      <>
        <Segment basic>
          <Card.Group>
            {this.state.recipes.map((recipe, index) => (
              <Card
                centered
                color="red"
                onClick={() => this.handleCardClick(recipe)}
              >
                <Image src={recipe.image_url} wrapped ui={true} />
                <Card.Content>
                  <Card.Header>
                    <p
                      style={{
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                        width: "260px"
                      }}
                    >
                      {recipe.name}
                    </p>
                  </Card.Header>
                </Card.Content>
              </Card>
            ))}
          </Card.Group>
        </Segment>
      </>
    );
  }
}
