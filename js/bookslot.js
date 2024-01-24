import { auth, db } from "./firebase.mjs";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  ref,
  set,
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";

async function book_slot(event) {
  const selectDate = document.getElementById("selectDate").value;
  const startTime = document.getElementById("startTime").value;
  const selectHour = document.getElementById("selectHour").value;
  const selectSlots = document.getElementById("selectSlots").value;
  const vehicleType = document.getElementById("vehicleType").value;
  event.preventDefault();

  var selectedDateTime = new Date(selectDate);
  var currentDate = new Date();
  if (selectedDateTime > currentDate) {
    alert("Slot booked successfully!");
  } else {
    alert("Please select a date after the current date.");
  }

  try {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        // console.log("User is logged in:", user);
        const authUid = user?.uid;
        const email = user?.email;

        await set(ref(db, `booked_slot/${authUid}`), {
          email,
          selectDate,
          startTime,
          selectHour,
          selectSlots,
          vehicleType,
        });

        alert("Booked Slot Successfully!");
      } else {
        console.log("User is logged out");
      }
    });
  } catch (error) {
    console.error("Error during registration:", error.message);
    alert(error.code);
  }
}

document
  .getElementById("book_slot_submit")
  .addEventListener("click", function (event) {
    book_slot(event);
  });
