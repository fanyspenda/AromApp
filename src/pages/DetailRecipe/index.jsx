import React from "react";
import {
  Label,
  Segment,
  Image,
  Grid,
  Card,
  Header,
  Divider
} from "semantic-ui-react";

export default class DetailRecipe extends React.Component {
  recipe = this.props.location.state.recipe;
  state = {
    name: this.recipe.name,
    description: this.recipe.description,
    ingredients: this.recipe.ingredients,
    steps: this.recipe.steps,
    price: this.recipe.price,
    urlImage: this.recipe.urlImage
  };

  render() {
    return (
      <>
        <Segment basic>
          <Header as="h1" textAlign="center">
            {this.state.name}
          </Header>
          <Divider />
          <Image src={this.state.urlImage} circular centered size="large" />
          <br />
          <br />

          <Label size="big" color="red">
            <Header as="h2" inverted textAlign="center">
              Deskripsi
            </Header>
          </Label>
          <Divider />
          <p>{this.state.description}</p>
          <br />
          <br />

          <Label size="big" color="red">
            <Header as="h2" inverted textAlign="center">
              Harga Masakan Jadi
            </Header>
          </Label>
          <Divider />
          <p>{this.state.price}</p>
          <br />
          <br />

          <Label size="big" color="red">
            <Header as="h2" inverted textAlign="center">
              Bahan dan Harga
            </Header>
          </Label>
          <Divider />

          <Grid columns="3" celled>
            {this.state.ingredients.map((ingredient, index) => (
              <Grid.Row>
                <Grid.Column computer="1" mobile="2">
                  <h3>{`${index + 1}`}</h3>
                </Grid.Column>
                <Grid.Column computer="7" mobile="6">
                  <h3>{`${ingredient.name}`}</h3>
                </Grid.Column>
                <Grid.Column computer="8" mobile="8" textAlign="right">
                  <h3>{`Rp. ${ingredient.price}`}</h3>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>

          <br />
          <br />
          <Label size="big" color="red">
            <Header as="h2" inverted textAlign="center">
              Langkah-Langkah
            </Header>
          </Label>
          <Divider />

          <Grid columns="2" celled>
            {this.state.steps.map((step, index) => (
              <Grid.Row>
                <Grid.Column computer="1" mobile="2">
                  <h3>{`${index + 1}`}</h3>
                </Grid.Column>
                <Grid.Column computer="15" mobile="14">
                  <h3>{`${step}`}</h3>
                </Grid.Column>
              </Grid.Row>
            ))}
          </Grid>
        </Segment>
      </>
    );
  }
}
