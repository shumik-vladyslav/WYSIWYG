let tableBtn = document.querySelector("#tableBtn");
let col6Btn = document.querySelector("#col6Btn");
let tableСonstructor = document.getElementById('tableСonstructor');
let tableСonstructorBody = document.getElementById('tableСonstructorBody');
let editableContainer = document.getElementById("editableContainer");

tableBtn.addEventListener("click", showTableСonstructor);
col6Btn.addEventListener("click", generatecol6);
document.addEventListener('click', function (event) {
  let isClickInside = tableСonstructor.contains(event.target);
  let isClickInsideButton = tableBtn.contains(event.target);

  if (!isClickInside && !isClickInsideButton) {
    tableСonstructor.classList.remove('show');
  }
});

tableСonstructorBody.addEventListener("mouseover", function (event) {
  let tArr = event.srcElement.id.split('-');

  document.getElementById('rows').innerText = tArr[1];
  document.getElementById('cols').innerText = tArr[2];

  if (!tArr[2]) {
    document.getElementById('cols').innerText = '0';
  }
  if (!tArr[1]) {
    document.getElementById('rows').innerText = '0';
  }
  for (var i = 1; i <= 10; i++) {
    for (var j = 1; j <= 10; j++) {
      if (i <= +tArr[1] && j <= +tArr[2]) {
        document.getElementById('tableСonstructorElement-' + i + '-' + j).classList.add('active');
      } else {
        document.getElementById('tableСonstructorElement-' + i + '-' + j).classList.remove('active');
      }
    }
  }

}, false);

for (var i = 1; i <= 10; i++) {
  for (var j = 1; j <= 10; j++) {
    tableСonstructorBody.innerHTML += '<div onclick="generatetable(this)" id="tableСonstructorElement-' + i + '-' + j + '" class="item"> <div class="inside"></div> </div>';
  }
}

function generatetable(el) {
  event.stopPropagation();

  var table = `<table class="table table-bordered">`;

  let tArr = event.srcElement.id.split('-');
  let rowCount = tArr[1];
  let colCount = tArr[2];
  for (var i = 1; i <= +rowCount; i++) {
    table += '<tr>'
    for (var j = 1; j <= +colCount; j++) {
      table += '<td></td>';
      if (j === +colCount) {
        table += '</tr>';
      }
    }
  }
  table += '</table>';

  console.log(table);

  editableContainer.focus();

  var placeCaretAtStart = createCaretPlacer(false);


  document.execCommand("insertHTML", false, table);

  tableСonstructor.classList.toggle('show');
}

function createCaretPlacer(atStart) {
  return function(el) {
      el.focus();
      if (typeof window.getSelection != "undefined"
              && typeof document.createRange != "undefined") {
          var range = document.createRange();
          range.selectNodeContents(el);
          range.collapse(atStart);
          var sel = window.getSelection();
          sel.removeAllRanges();
          sel.addRange(range);
      } else if (typeof document.body.createTextRange != "undefined") {
          var textRange = document.body.createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(atStart);
          textRange.select();
      }
  };
}

function generatecol6() {
  var col =
    `
    <div class="row">
      <div class="col-6 p-2">
        <p>col 6</p>
      </div>
      <div class="col-6 p-2">
        <p>col 6</p>
      </div>
    </div>
  `;
  document.execCommand("insertHTML", false, col);
}

function readImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      img = "<img class='image' src='" + e.target.result + "'>";
      document.execCommand("insertHTML", false, img);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readVideo(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      let video = `<video class='video' autoplay controls src="${e.target.result}"></video>`
      document.execCommand("insertHTML", false, video);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function showTableСonstructor() {
  tableСonstructor.classList.toggle('show')
}