import React, { Component } from "react";
import ItemList from "../itemList";
import ItemDetails, { Field } from "../itemDetails";
import ErrorMessage from "../errorMessage";
import GotService from "../../services/gotService";
import RowBlock from "../rowBlock";

export default class HousesPage extends Component {
  gotService = new GotService();
  state = {
    selectedHouse: null,
    error: false,
  };
  componentDidCatch() {
    this.setState({
      error: true,
    });
  }

  onItemSelected = (id) => {
    this.setState({
        selectedHouse: id,
    });
  };

  render() {
    if (this.state.error) {
      return <ErrorMessage />;
    }
    const itemList = ( 
          <ItemList
            onItemSelected={this.onItemSelected}
            getData={this.gotService.getAllHouses}
            renderItem = {(item) => `${item.name}, (${item.region})`}
          />
    )
    const houseDetails = (
      <ItemDetails itemId={this.state.selectedHouse}   getData={this.gotService.getHouse}>
          <Field field= 'name' label = "Name"/>
          <Field field= 'region' label = "Region"/>
          <Field field= 'words' label = "Words"/>
          <Field field= 'overlord' label = "Overlord"/>
        </ItemDetails>
    )
    return (
      <RowBlock left = {itemList} right ={ houseDetails}/>
    );
  }


}
