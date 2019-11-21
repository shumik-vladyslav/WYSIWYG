let tableBtn = document.querySelector("#tableBtn");
let col6Btn = document.querySelector("#col6Btn");

tableBtn.addEventListener("click", generatetable);
col6Btn.addEventListener("click", generatecol6);

function generatetable(){
  var table = `<table class="table table-bordered">
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>`;
  document.execCommand("insertHTML", false, table);
}

function generatecol6(){
  var col = `<div class="row"><div class="col-6 border p-2">
    <p>col 6</p>
  </div><div class="col-6 border p-2">
  <p>col 6</p>
</div></div> <p>New line</p>`;
  document.execCommand("insertHTML", false, col);
}

function readImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      img = "<img src='" + e.target.result + "'>";
      document.execCommand("insertHTML", false, img);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function readVideo(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e) {
      let video = `<video autoplay controls src="${e.target.result}"></video>`
      document.execCommand("insertHTML", false, video);
    };
    reader.readAsDataURL(input.files[0]);
  }
}