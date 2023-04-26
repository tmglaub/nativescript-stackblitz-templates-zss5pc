import { Observable } from "@nativescript/core";
import { Color } from "@nativescript/core/color";
import { getViewById } from "@nativescript/core/ui/core/view";

var GameOver = false;
var Player = "X";
var field = [["0", "0", "0"], ["0", "0", "0"], ["0", "0", "0"]];

function createViewModel() {
  const viewModel = new Observable();
  viewModel.onTap = () => {
    console.log("Button was pressed");

    if (!GameOver) {
      var btn = args.object;
      var parentGrid = btn.parent;
      var parentStack = parentGrid.parent;
      var lbl = getViewById(parentStack, "Info");

      if (btn.text == "") {
        field[btn.row][btn.col] = Player;
        btn.text = Player;

        // Spieler wechseln
        if (Player == "X") {
          const color = new Color("#FF0000");
          btn.backgroundColor = color;
          lbl.text = "Spieler O ist an der Reihe";
          Player = "O";
        } else {
          const color = new Color("#00FF00");
          btn.backgroundColor = color;
          lbl.text = "Spieler X ist an der Reihe";
          Player = "X";
        }

        // prüfen ob GameOver
        const lblColor = new Color("#FFFF00");

        // prüfen ob in einer Reihe alles X
        if (viewModel.rowsCrossed("X") == "X") {
          lbl.text = "Spieler X hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob in einer Reihe alles O
        if (viewModel.rowsCrossed("O") == "O") {
          lbl.text = "Spieler O hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob in einer Zeile alles X
        if (viewModel.colsCrossed("X") == "X") {
          lbl.text = "Spieler X hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob in einer Zeile alles O
        if (viewModel.colsCrossed("O") == "O") {
          lbl.text = "Spieler O hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob diagonal alles X
        if (viewModel.diaCrossed("X") == "X") {
          lbl.text = "Spieler X hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob diagonal alles O
        if (viewModel.diaCrossed("O") == "O") {
          lbl.text = "Spieler O hat gewonnen!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
        // prüfen ob Unentschieden
        if (viewModel.draw()) {
          lbl.text = "Unentschieden!";
          lbl.backgroundColor = lblColor;
          GameOver = true;
        }
      }
    }
  };

  viewModel.onReset = (args) => {
    console.log("Restart was pressed");
    Player = "X";
    var btn = args.object;
    var lbl = getViewById(btn.parent, "Info");
    var grid = getViewById(btn.parent, "grid");
    var btn1 = getViewById(btn.parent, "1");
    var btn2 = getViewById(btn.parent, "2");
    var btn3 = getViewById(btn.parent, "3");
    var btn4 = getViewById(btn.parent, "4");
    var btn5 = getViewById(btn.parent, "5");
    var btn6 = getViewById(btn.parent, "6");
    var btn7 = getViewById(btn.parent, "7");
    var btn8 = getViewById(btn.parent, "8");
    var btn9 = getViewById(btn.parent, "9");

    lbl.text = "Spieler X ist an der Reihe";
    lbl.backgroundColor = null;

    btn1.text = "";
    btn2.text = "";
    btn3.text = "";
    btn4.text = "";
    btn5.text = "";
    btn6.text = "";
    btn7.text = "";
    btn8.text = "";
    btn9.text = "";

    var color = new Color(100, 255, 255, 255);
    btn1.backgroundColor = color;
    btn2.backgroundColor = color;
    btn3.backgroundColor = color;
    btn4.backgroundColor = color;
    btn5.backgroundColor = color;
    btn6.backgroundColor = color;
    btn7.backgroundColor = color;
    btn8.backgroundColor = color;
    btn9.backgroundColor = color;

    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        field[i][j] = "0";
      }
    }
    GameOver = false;
  };

  viewModel.rowsCrossed = (player) => {
    for (i = 0; i < 3; i++) {
      if (field[i][0] == field[i][1] &&
        field[i][1] == field[i][2] &&
        field[i][0] == player) {
        return field[i][0];
      }
    }
    return "";
  };

  viewModel.colsCrossed = (player) => {
    for (i = 0; i < 3; i++) {
      if (field[0][i] == field[1][i] &&
        field[1][i] == field[2][i] &&
        field[0][i] == player) {
        return field[0][i];
      }
    }
    return "";
  };

  viewModel.diaCrossed = (player) => {
    if (field[0][0] == field[1][1] &&
      field[1][1] == field[2][2] &&
      field[2][2] == player) {
      return field[0][0];
    }
    if (field[2][0] == field[1][1] &&
      field[1][1] == field[0][2] &&
      field[0][2] == player) {
      return field[0][2];
    }
    return "";
  };

  viewModel.draw = () => {
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        if (field[i][j] == 0) {
          return false;
        }
      }
    }
    return true;
  };

  return viewModel;
}

export default createViewModel;