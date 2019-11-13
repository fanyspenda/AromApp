import React from "react";
import {
  Button,
  Segment,
  Input,
  Form,
  Label,
  Grid,
  TextArea
} from "semantic-ui-react";

import axios from "axios";

export default class CreateRecipe extends React.Component {
  state = {
    name: "",
    description: "",
    image: null,
    ingredients: [
      {
        name: "bawang putih",
        price: 0
      },
      {
        name: "",
        price: 0
      }
    ],
    steps: ["a", "b", "c"],
    price: 0
  };

  handleAddIngredientClick = () => {
    let defaultIngredient = {
      name: "",
      price: 0
    };
    let newIngredients = this.state.ingredients;
    newIngredients.push(defaultIngredient);

    this.setState({
      ingredients: newIngredients
    });
  };

  handleDeleteIngredientClick = () => {
    let newIngredients = this.state.ingredients;
    newIngredients.pop();
    this.setState({
      ingredients: newIngredients
    });
  };

  handleIngredientChange = (event, index) => {
    let newIngredients = this.state.ingredients;
    newIngredients[index].name = event.target.value;
    this.setState({
      ingredients: newIngredients
    });
  };

  handleStepChange = (event, index) => {
    let stepsCopy = this.state.steps;
    stepsCopy[index] = event.target.value;
    this.setState({
      steps: stepsCopy
    });
  };

  handlePriceChange = (event, index) => {
    let ingredientsCopy = this.state.ingredients;
    ingredientsCopy[index].price = event.target.value;
    this.setState({
      ingredients: ingredientsCopy
    });
  };

  handleNameChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleDescriptionChange = event => {
    this.setState({
      description: event.target.value
    });
  };

  handlePriceCompleteChange = event => {
    this.setState({
      price: event.target.value
    });
  };

  handleDeleteStepClick = () => {
    let stepsCopy = this.state.steps;
    stepsCopy.pop();
    this.setState({
      steps: stepsCopy
    });
  };

  handleAddStepClick = () => {
    let stepCopy = this.state.steps;
    stepCopy.push("");
    this.setState({
      steps: stepCopy
    });
  };

  handleSubmitClick = () => {
    const { name, description, ingredients, steps, price, image } = this.state;
    axios
      .post("https://arom-app-backend.herokuapp.com/recipe", {
        name,
        description,
        ingredients,
        steps,
        price
      })
      .then(res => {
        const { data } = res;
        const formData = new FormData();
        formData.append("image", this.state.image);

        axios
          .post(
            `https://arom-app-backend.herokuapp.com/recipe/${data._id}/upload`,
            formData
          )
          .then(() => {
            alert("Berhasil memasukkan resep baru!");
            this.props.history.push('/')
          });
      });
  };

  handleFileChange = event => {
    this.setState({
      image: event.target.files[0]
    });
  };

  render() {
    return (
      <>
        <Segment basic>
          <h1>Tambahkan Resep Baru</h1>
        </Segment>
        <Segment basic>
          <Form>
            <Label size="large">Nama Resep</Label>
            <Form.Field>
              <Input
                fluid
                value={ this.state.name }
                placeholder="Mau nulis resep apa?"
                onChange={ this.handleNameChange }
              />
            </Form.Field>

            <Label size="large">Deskripsi</Label>
            <Form.Field>
              <TextArea
                style={ { resize: "none" } }
                rows="5"
                value={ this.state.description }
                onChange={ this.handleDescriptionChange }
                placeholder="jelasin dong masakan ini seperti apa.."
              />
            </Form.Field>

            <Form.Field>
              <Label size="large">Gambar</Label>
              <Input type="file" onChange={ this.handleFileChange } />
            </Form.Field>
            <Label size="large">Harga Masakan Jadi</Label>
            <Form.Field>
              <Input
                fluid
                value={ this.state.price }
                type="number"
                placeholder="Harga jadinya berapa ya?"
                onChange={ this.handlePriceCompleteChange }
              />
            </Form.Field>
            <br />
            <br />
            <Grid columns="2">
              <Grid.Row>
                <Grid.Column>
                  <Label size="big">Bahan dan Harga</Label>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    circular
                    floated="right"
                    size="medium"
                    color="blue"
                    icon="plus"
                    onClick={ this.handleAddIngredientClick }
                  />
                  { this.state.ingredients.length > 1 ? (
                    <Button
                      circular
                      floated="right"
                      size="medium"
                      color="red"
                      icon="minus"
                      onClick={ this.handleDeleteIngredientClick }
                    />
                  ) : null }
                </Grid.Column>
              </Grid.Row>

              { this.state.ingredients.map((ingredient, index) => (
                <Grid.Row key={ index }>
                  <Grid.Column>
                    <Input
                      fluid
                      label="Bahan"
                      value={ ingredient.name }
                      placeholder="bahan apa yang mau ditambahkan?"
                      onChange={ event =>
                        this.handleIngredientChange(event, index)
                      }
                    />
                  </Grid.Column>
                  <Grid.Column>
                    <Input
                      fluid
                      label="Harga"
                      type="number"
                      value={ ingredient.price }
                      onChange={ event => this.handlePriceChange(event, index) }
                    />
                  </Grid.Column>
                </Grid.Row>
              )) }
              {/* <Grid.Column>
                  <Input fluid label="Bahan" />
                </Grid.Column>
                <Grid.Column>
                  <Input fluid label="Harga" />
                </Grid.Column> */}

              <Grid.Row>
                <Grid.Column>
                  <Label size="big">Langkah</Label>
                </Grid.Column>
                <Grid.Column>
                  <Button
                    circular
                    floated="right"
                    size="medium"
                    color="blue"
                    icon="plus"
                    onClick={ this.handleAddStepClick }
                  />
                  { this.state.steps.length > 1 ? (
                    <Button
                      circular
                      floated="right"
                      size="medium"
                      color="red"
                      icon="minus"
                      onClick={ this.handleDeleteStepClick }
                    />
                  ) : null }
                </Grid.Column>
              </Grid.Row>
            </Grid>
            <br />
            { this.state.steps.map((step, index) => (
              <Form.Field>
                <Input
                  label={ index + 1 }
                  value={ step }
                  onChange={ event => this.handleStepChange(event, index) }
                  placeholder="langkah apa selanjutnya?"
                />
              </Form.Field>
            )) }
            <br />
            <br />
            <Form.Field>
              <Button
                fluid
                size="huge"
                color="red"
                icon="minus"
                onClick={ this.handleSubmitClick }
              >
                Tambahkan Resep
              </Button>
            </Form.Field>
          </Form>
        </Segment>
      </>
    );
  }
}
