import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModelService } from './editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {

  tableBtn;
  col6Btn;
  tableСonstructor;
  tableСonstructorBody;
  editableContainer
  constructor(private modelService: ModelService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.tableBtn = document.querySelector("#tableBtn");
    this.col6Btn = document.querySelector("#col6Btn");
    this.tableСonstructor = document.getElementById('tableСonstructor');
    this.tableСonstructorBody = document.getElementById('tableСonstructorBody');
    this.editableContainer = document.getElementById("editableContainer");

    this.tableBtn.addEventListener("click", this.showTableСonstructor);
    this.col6Btn.addEventListener("click", this.generatecol6);
document.addEventListener('click',  (event) => {
  let isClickInside = this.tableСonstructor.contains(event.target);
  let isClickInsideButton = this.tableBtn.contains(event.target);

  if (!isClickInside && !isClickInsideButton) {
    this.tableСonstructor.classList.remove('show');
  }
});

this.tableСonstructorBody.addEventListener("mouseover", function (event) {
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
    this.tableСonstructorBody.innerHTML += '<div onclick="generatetable(this)" id="tableСonstructorElement-' + i + '-' + j + '" class="item"> <div class="inside"></div> </div>';
  }
}
  }




 generatetable(el) {
   console.log(el)
  el.stopPropagation();

  var table = `<table class="table table-bordered">`;

  let tArr = el.srcElement.id.split('-');
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

  this.editableContainer.focus();

  var placeCaretAtStart = this.createCaretPlacer(false);


  document.execCommand("insertHTML", false, table);

  this.tableСonstructor.classList.toggle('show');
}

 createCaretPlacer(atStart) {
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
      } else if (typeof (document.body as any).createTextRange != "undefined") {
          var textRange = (document.body as any).createTextRange();
          textRange.moveToElementText(el);
          textRange.collapse(atStart);
          textRange.select();
      }
  };
}

 generatecol6() {
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

 readImg(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      let img = "<img class='image' src='" + e.target.result + "'>";
      document.execCommand("insertHTML", false, img);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

 readVideo(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();
    reader.onload = function (e: any) {
      let video = `<video class='video' autoplay controls src="${e.target.result}"></video>`
      document.execCommand("insertHTML", false, video);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

 showTableСonstructor() {
  this.tableСonstructor.classList.toggle('show')
}

  save() {
    let e = document.getElementById("editableContainer");
    console.log(e.innerHTML)
    this.modelService.setHtml(e.innerHTML);
    this.router.navigate(['view']);
  }

}
