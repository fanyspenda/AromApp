import { Card, Image, Segment, Grid } from "semantic-ui-react";
import React from "react";
import Axios from "axios";

export default class ListRecipe extends React.Component {
  state = {
    recipes: []
  };

  componentDidMount = () => {
    Axios.get("https://arom-app-backend.herokuapp.com/recipe").then(res => {
      this.setState({
        recipes: res.data
      });
    });
  };

  render() {
    return (
      <>
        <Segment basic>
          <Card.Group>
            {this.state.recipes.map((recipe, index) => (
              <Card centered color="red">
                <Image
                  src="https://react.semantic-ui.com/images/avatar/large/matthew.png"
                  wrapped
                  ui={true}
                />
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
