import React, { Component } from "react";
import GotService from "../../services/gotService";
import ItemDetails, { Field } from "../itemDetails";


export default class BooksItem extends Component{
    gotService = new GotService();

  

    render(){
        return(
            <ItemDetails itemId={this.props.bookId}   getData={this.gotService.getBook}>
            <Field field= 'name' label = "Name"/>
            <Field field= 'numberOfPages' label = "numberOfPages"/>
            <Field field= 'publisher' label = "publisher"/>
            <Field field= 'released' label = "released"/>
           
          </ItemDetails>
        )
    }
}