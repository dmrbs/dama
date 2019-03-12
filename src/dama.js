var gamepanel = document.getElementById("gamepanel");


for (var row = 1; row <= 8; row++) {
    var erow = document.createElement("div");
    erow.classList.add("row");
    for (let column = 1; column <= 8; column++) {
        var ecolumn = document.createElement("div");

        ecolumn.classList.add("square");
        if (row % 2 == 0) {
            if (column % 2 == 0) {
                ecolumn.classList.add("square-white");
            } else {
                ecolumn.classList.add("square-black");
            }
        } else {
            if (column % 2 == 0) {
                ecolumn.classList.add("square-black");
            } else {
                ecolumn.classList.add("square-white");
            }
        }




        ecolumn.setAttribute("row", row);
        ecolumn.setAttribute("column", column);
        ecolumn.setAttribute("id", row + "-" + column)


        ecolumn.ondrop = function (ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            var tas = document.getElementById(data)
            var stoneRow = Number(tas.getAttribute("row"));
            var stoneColumn = Number(tas.getAttribute("column"));
            var boxTargetRow = Number(ev.target.getAttribute("row"))
            var boxTargetColumn = Number(ev.target.getAttribute("column"))
            var stoneTeam = tas.getAttribute("team");
            if (stoneTeam == "Black") {
                if (!(ev.currentTarget.childNodes.length > 0)) {
                    if ((stoneRow + 1 == boxTargetRow) && (stoneColumn == boxTargetColumn)) {
                        tas.setAttribute("row", boxTargetRow);
                        ev.target.appendChild(tas);
                    } if (((stoneColumn == boxTargetColumn + 1) || (stoneColumn == boxTargetColumn - 1)) && stoneRow == boxTargetRow) {
                        tas.setAttribute("column", boxTargetColumn);
                        ev.target.appendChild(tas);
                    }

                    if (stoneRow + 2 == boxTargetRow) {
                        var id = (boxTargetRow - 1) + "-" + boxTargetColumn;
                        var deadBox = document.getElementById(id);
                        deadBox.childNodes.forEach(element => {

                            if (element.getAttribute("team") == "White") {

                                deadBox.removeChild(element);
                                tas.setAttribute("row", boxTargetRow);
                                ev.target.appendChild(tas);

                            }
                        })




                    }
                    if (((stoneColumn == boxTargetColumn + 2) || (stoneColumn == boxTargetColumn - 2)) && stoneRow == boxTargetRow) {
                        var id;
                        if (boxTargetColumn > stoneColumn) {
                            id = boxTargetRow + "-" + (boxTargetColumn - 1);
                        } else if (stoneColumn > boxTargetColumn) {
                            id = boxTargetRow + "-" + (boxTargetColumn + 1);
                        }

                        var deadBox = document.getElementById(id);
                        deadBox.childNodes.forEach(element => {

                            if (element.getAttribute("team") == "White") {

                                deadBox.removeChild(element);
                                tas.setAttribute("column", boxTargetColumn);
                                ev.target.appendChild(tas);

                            }
                        })
                    }

                    if (boxTargetRow == 8) {
                        tas.setAttribute("isDama", true);
                    }


                }

            } else if (stoneTeam == "White") {
                if (!(ev.currentTarget.childNodes.length > 0)) {
                    if (tas.getAttribute("isDama") == "false") {
                        if ((stoneRow - 1 == boxTargetRow) && (stoneColumn == boxTargetColumn)) {
                            tas.setAttribute("row", boxTargetRow);
                            ev.target.appendChild(tas);
                        } if (((stoneColumn == boxTargetColumn + 1) || (stoneColumn == boxTargetColumn - 1)) && stoneRow == boxTargetRow) {
                            tas.setAttribute("column", boxTargetColumn);
                            ev.target.appendChild(tas);
                        } if (stoneRow - 2 == boxTargetRow) {
                            var id = (boxTargetRow + 1) + "-" + boxTargetColumn;
                            var deadBox = document.getElementById(id);
                            deadBox.childNodes.forEach(element => {

                                if (element.getAttribute("team") == "Black") {

                                    deadBox.removeChild(element);
                                    tas.setAttribute("row", boxTargetRow);
                                    ev.target.appendChild(tas);

                                }
                            })




                        }


                        if (((stoneColumn == boxTargetColumn + 2) || (stoneColumn == boxTargetColumn - 2)) && stoneRow == boxTargetRow) {
                            var id;
                            if (boxTargetColumn > stoneColumn) {
                                id = boxTargetRow + "-" + (boxTargetColumn - 1);
                            } else if (stoneColumn > boxTargetColumn) {
                                id = boxTargetRow + "-" + (boxTargetColumn + 1);
                            }

                            var deadBox = document.getElementById(id);
                            deadBox.childNodes.forEach(element => {

                                if (element.getAttribute("team") == "Black") {

                                    deadBox.removeChild(element);
                                    tas.setAttribute("column", boxTargetColumn);
                                    ev.target.appendChild(tas);

                                }
                            })

                        }
                        if (boxTargetRow == 1) {
                            tas.setAttribute("isDama", true);
                        }
                    } else {

                        if (boxTargetRow > stoneRow || boxTargetRow < stoneRow) {
                            if (boxTargetRow > stoneRow) {
                                for (var i = stoneRow; i < boxTargetRow; i++) {
                                    var id = i + "-" + boxTargetColumn;
                                    var element = document.getElementById(id);
                                    if (!(element.childNodes.length > 1)) {
                                        var taselement = element.childNodes[0];
                                        if (taselement != null) {
                                            if (taselement.getAttribute("team") == "Black") {
                                                element.removeChild(taselement);
                                            }

                                            tas.setAttribute("row", boxTargetColumn);
                                            ev.target.appendChild(tas);

                                        }


                                    }
                                }

                            }
                            if (boxTargetRow < stoneRow) {
                                for (var i = boxTargetRow; i < stoneRow; i++) {
                                    var id = i + "-" + boxTargetColumn;
                                    var element = document.getElementById(id);
                                    if (!(element.childNodes.length > 1)) {
                                        var taselement = element.childNodes[0];
                                        if (taselement != null) {
                                            if (taselement.getAttribute("team") == "Black") {
                                                element.removeChild(taselement);
                                            }

                                            tas.setAttribute("row", boxTargetColumn);
                                            ev.target.appendChild(tas);

                                        }


                                    }
                                }

                            }

                        }

                    }


                }
            }





        }
        ecolumn.ondragover = function (ev) {
            ev.preventDefault();
        }


        erow.appendChild(ecolumn);
    }
    gamepanel.appendChild(erow);
}
window.onload = function () {
    createGame();
}

function createGame() {
    for (let i = 2; i <= 3; i++) {
        for (let column = 0; column < 8; column++) {

            var stone = new Stone("Black", i, column + 1);
            stone.draw();
        }
    }
    for (let i = 6; i <= 7; i++) {
        for (let column = 0; column < 8; column++) {

            var stone = new Stone("White", i, column + 1);
            stone.draw();
        }
    }


}
function Stone(team, row, column) {
    this.team = team;
    this.row = row;
    this.column = column;
    this.isDama = false;

    this.draw = function () {
        var squareList = document.querySelectorAll(".square");
        squareList.forEach(element => {
            var rowCount = element.getAttribute("row");
            var columnCount = element.getAttribute("column");
            if ((Number(rowCount) == this.row) && (Number(columnCount) == this.column)) {

                var stone = document.createElement("img");
                if (team == "Black") {
                    stone.src = "media/black.png";
                } else if (team == "White") {
                    stone.src = "media/white.png";
                }
                stone.classList.add("stone");
                var stoneId = document.createAttribute("Id");
                stoneId.value = row + "" + column;
                stone.setAttributeNode(stoneId);

                var draggable = document.createAttribute("draggable");
                draggable.value = true;
                stone.setAttributeNode(draggable);


                var rowcount = document.createAttribute("row");
                rowcount.value = this.row;
                var columncount = document.createAttribute("column");
                columncount.value = this.column;
                stone.setAttributeNode(rowcount);
                stone.setAttributeNode(columncount);

                stone.setAttribute("team", this.team);
                stone.setAttribute("isDama", this.isDama);
                element.appendChild(stone);

                stone.ondragstart = function (ev) {
                    ev.dataTransfer.setData("text", row + "" + column);
                }

            }



        })





    };



}

