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
    totalIngredientPrice: 0,
    steps: this.recipe.steps,
    price: this.recipe.price,
    urlImage: this.recipe.image_url
  };

  componentDidMount = () => {
    let totalPrice = 0;
    this.recipe.ingredients.map((ingredient, index) => {
      totalPrice += ingredient.price;
    });

    this.setState({
      totalIngredientPrice: totalPrice
    });
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
            <Grid.Row>
              <Grid.Column computer="8" mobile="8">
                <h2>Total Harga</h2>
              </Grid.Column>
              <Grid.Column computer="8" mobile="8" textAlign="right">
                {this.state.totalIngredientPrice < this.state.price ? (
                  <h2
                    style={{ color: "#25cc00" }}
                  >{`Rp. ${this.state.totalIngredientPrice}`}</h2>
                ) : (
                  <h2
                    style={{ color: "red" }}
                  >{`Rp. ${this.state.totalIngredientPrice}`}</h2>
                )}
              </Grid.Column>
            </Grid.Row>
            <Grid.Row>
              <Grid.Column computer="8" mobile="8">
                <h2>Harga Masakan Jadi</h2>
              </Grid.Column>
              <Grid.Column computer="8" mobile="8" textAlign="right">
                {this.state.totalIngredientPrice > this.state.price ? (
                  <h2
                    style={{ color: "#25cc00" }}
                  >{`Rp. ${this.state.price}`}</h2>
                ) : (
                  <h2 style={{ color: "red" }}>{`Rp. ${this.state.price}`}</h2>
                )}
              </Grid.Column>
            </Grid.Row>
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
