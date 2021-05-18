const CartItem = require("../models/cartItem");
const fs = require('fs');
const path = require('path');

const matColors = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/mat-colors.json')));
const mats = matColors.map(x => ({ color: x.id, label: x.label, hex: x.color }));
const framesParse = JSON.parse(fs.readFileSync(path.join(__dirname, '../resources/frames.json')));
const frames = framesParse.map(x => ({ style: x.id, label: x.label, slice : x.border.slice, cost: x.cost}));

function validateCartItem(toVal) {
    console.log(`validate item ${toVal}`);
 
    let errorObj = {"message" : "Validation failed"};
    errorObj.errors = {};
    let errs = errorObj.errors;
 
    // check artworkId
    if (toVal.artworkId != undefined && toVal.artworkId != null) {
       if (!Number.isInteger(toVal.artworkId)) errs.artworkId = "invalid";
    } else errs.artworkId = "missing";
 
    // check printSize
    if (toVal.printSize != undefined && toVal.printSize != null) {
       if (toVal.printSize != "S" && toVal.printSize != "M" && toVal.printSize != "L")
          errs.printSize = "invalid";
    } else errs.printSize = "missing";
 
    // check frameStyle
    if (toVal.frameStyle != undefined && toVal.frameStyle != null) {
        // TODO: check if one of the frameStyles from 'GET /frames'
       /*let styles = frames;

       if( styles.filter(val => val.id === toVal.frameStyle).length === 0 ) {
            errs.frameStyle = "invalid";
        }  */

    } else errs.frameStyle = "missing";

    // check frameWidth
    if (toVal.frameWidth != undefined && toVal.frameWidth != null) {
        if (toVal.frameWidth < 20 || toVal.frameWidth > 50)
            errs.frameWidth = "invalid";
    } else errs.frameWidth = "missing";

    // check matColor
    if (toVal.matColor) {
        // TODO: check if one of the color names from 'GET /mats'
       /*let colors = mats;

       if( colors.filter(val => val.id === toVal.matColor).length === 0 ) {
            errs.matColor = "invalid";
        }  */

    } else if (toVal.matWidth != 0) errs.matColor = "missing";


    console.log(toVal.matWidth);
    // check matWidth
    if (toVal.matWidth != undefined && toVal.matWidth != null) {
        if (toVal.matWidth < 0 || toVal.matWidth > 100)
            errs.matWidth = "invalid";
    } else errs.matWidth = "missing";
 
    console.log(errorObj);
    if (Object.keys(errorObj.errors).length != 0) {
       console.error(`Validation not passed. Returning Errors.`);
       return errorObj;
    } 
 
    else {
       console.log(`Validation passed. Returning CartItem`)
       let newCartItem = new CartItem(
          toVal.cartItemId,
          toVal.printSize,
          toVal.artworkId,
          toVal.frameStyle,
          toVal.frameWidth,
          toVal.matColor,
          toVal.matWidth
          );
          
       console.log(newCartItem);
      return newCartItem;
    }
}

exports.validateCartItem = validateCartItem;