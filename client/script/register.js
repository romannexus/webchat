"use strict";
const dateInput = document.getElementById("bday");

const today = new Date();

const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, "0");
const day = String(today.getDate()).padStart(2, "0");

const formattedDateMax = `${year}-${month}-${day}`;
const formattedDateMin = `${year - 100}-${month}-${day}`;

dateInput.max = formattedDateMax;
dateInput.min = formattedDateMin;
