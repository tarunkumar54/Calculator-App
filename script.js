const btnsList = document.querySelectorAll(".btns");
const displayBox = document.querySelector(".screen");
const operators = document.querySelectorAll(".operator");
const onlyNumVals = document.querySelectorAll(".numVal");

for (let btn of btnsList) {
  btn.addEventListener("click", () => {
    let inputFeed = btn.innerHTML;
    let lastElement = displayBox.innerHTML.charAt(
      displayBox.innerHTML.length - 1
    );

    if (!isNaN(inputFeed) || inputFeed === ".") {
      //Adding a zero before dot
      if (
        inputFeed === "." &&
        displayBox.innerHTML !== "0." &&
        displayBox.innerHTML === ""
      ) {
        displayBox.innerHTML += "0.";
      }

      //Adding a zero before dot, after operator
      if (inputFeed === "." && isNaN(lastElement) && lastElement !== ".") {
        displayBox.innerHTML += "0.";
      }

      if (
        inputFeed === "." &&
        !isNaN(lastElement) &&
        displayBox.innerHTML.length >= 3
      ) {
        displayBox.innerHTML += inputFeed;
      }

      //Adding just numbers
      else if (inputFeed !== ".") {
        if (lastElement === "r" || lastElement === "y") {
          displayBox.innerHTML = inputFeed;
        } else {
          displayBox.innerHTML += inputFeed;
        }
      }

      //Adding dot after starting number, ignoring another one
      else if (
        inputFeed === "." &&
        displayBox.innerHTML >= 1 &&
        lastElement !== "."
      )
        if (inputFeed === "." && !isNaN(lastElement)) {
          displayBox.innerHTML += inputFeed;
        }
    }

    if (isNaN(inputFeed) && inputFeed !== ".") {
      //Clear Screen Button
      if (inputFeed === "C" && displayBox.innerHTML !== "") {
        displayBox.innerHTML = "";
      }

      //Clear Entry Button
      else if (inputFeed === "CE" && displayBox.innerHTML.length >= 1) {
        if (lastElement === "r" || lastElement === "y") {
          displayBox.innerHTML = "";
        } else {
          displayBox.innerHTML = displayBox.innerHTML.slice(0, -1);
        }
      }

      //Percent Button
      else if (inputFeed === "%" && displayBox.innerHTML !== "") {
        if (isNaN(lastElement)) {
          displayBox.innerHTML = "Expression Error";
        } else {
          displayBox.innerHTML = eval(displayBox.innerHTML);
          displayBox.innerHTML = displayBox.innerHTML / 100;
        }
      }

      //Equal Button
      else if (inputFeed === "=" && displayBox.innerHTML !== "") {
        if (isNaN(lastElement)) {
          displayBox.innerHTML = displayBox.innerHTML;
        } else {
          let res = eval(displayBox.innerHTML);
          if (res.toString().length >= 5) {
            displayBox.innerHTML = res.toFixed(6);
          } else {
            displayBox.innerHTML = res;
          }
        }
      }

      //Operators Button
      else if (
        inputFeed === "/" ||
        inputFeed === "*" ||
        inputFeed === "-" ||
        inputFeed === "+"
      ) {
        if (isNaN(lastElement)) {
          if (
            (displayBox.innerHTML.length = 1 && displayBox.innerHTML === "-")
          ) {
            if (lastElement === "y" || lastElement === "r") {
              displayBox.innerHTML = "";
            } else {
              displayBox.innerHTML = displayBox.innerHTML;
            }
          } else {
            if (lastElement === "y" || lastElement === "r") {
              displayBox.innerHTML = "";
            } else {
              displayBox.innerHTML = displayBox.innerHTML.slice(0, -1);
              displayBox.innerHTML += inputFeed;
            }
          }
        }
        // Allowing minus in empty display
        else if (displayBox.innerHTML === "" && inputFeed === "-") {
          displayBox.innerHTML += inputFeed;
        } else if (displayBox.innerHTML !== "" && !isNaN(lastElement)) {
          displayBox.innerHTML += inputFeed;
        }
      }
    }
  });
}
