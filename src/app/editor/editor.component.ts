import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModelService } from './editor.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit, AfterViewInit {
  textColor;
  tableBtn;
  col6Btn;
  tableСonstructorBody;
  constructorData;
  editableContainer;
  showTableConstructor;
  html;
  
  currentFontName = 'Roboto, sans-serif';
  currentColour;
  currentFontSize = '3';
  currentFontWeight = false;
  currentItalic = false;
  currentJustifyCenter = false;
  currentJustifyFull = false;
  currentUnderLine = false;
  currentJustifyLeft = true;
  currentJustifyRight = false;
  currentSubscript = false;
  currentSuperscript = false;
  currentStrikeThrough = false;

  constructor(private modelService: ModelService, private router: Router, private chRef: ChangeDetectorRef) {

  }

  ngOnInit() {

    let self = this;

    document.onselectionchange = function () {
      let fontName = document.queryCommandValue("fontName");
      let colour = document.queryCommandValue("ForeColor");
      let fontSize = document.queryCommandValue("FontSize");
      let fontWeight: any = document.queryCommandValue("bold");
      let italic: any = document.queryCommandValue("italic");
      let justifyCenter: any = document.queryCommandValue("justifyCenter");
      let justifyFull: any = document.queryCommandValue("justifyFull");
      let underLine: any = document.queryCommandValue("underLine");
      let justifyLeft: any = document.queryCommandValue("justifyLeft");
      let justifyRight: any = document.queryCommandValue("justifyRight");
      let subscript: any = document.queryCommandValue("subscript");
      let superscript: any = document.queryCommandValue("superscript");
      let strikeThrough: any = document.queryCommandValue("strikeThrough");

      self.currentFontName = fontName;
      self.currentColour = colour;
      self.currentFontSize = fontSize;
      self.currentFontWeight = (fontWeight === 'true');
      self.currentItalic = (italic === 'true');
      self.currentJustifyCenter = (justifyCenter === 'true');
      self.currentJustifyFull = (justifyFull === 'true');
      self.currentUnderLine = (underLine === 'true');
      self.currentJustifyLeft = (justifyLeft === 'true');
      self.currentJustifyRight = (justifyRight === 'true');
      self.currentSubscript = (subscript === 'true');
      self.currentSuperscript = (superscript === 'true');
      self.currentStrikeThrough = (strikeThrough === 'true');

      console.log(self.currentSubscript);
      console.log(self.currentSuperscript);
      console.log(self.currentFontName);
      
    }
  }

  ngAfterViewInit() {
    this.html = this.modelService.getHtml();

    if (this.html) {
      document.getElementById('editableContainer').innerHTML = this.html;
    }

    this.tableBtn = document.querySelector("#tableBtn");
    this.col6Btn = document.querySelector("#col6Btn");
    this.tableСonstructorBody = document.getElementById('tableСonstructorBody');
    this.editableContainer = document.getElementById("editableContainer");

    this.col6Btn.addEventListener("click", this.generatecol6);

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
    this.constructorData = []
    for (var i = 1; i <= 10; i++) {
      this.constructorData.push([]);
      for (var j = 1; j <= 10; j++) {
        this.constructorData[i - 1].push([]);
      }
    }
    this.chRef.detectChanges()
  }

  generatetable(el) {
    el.stopPropagation();
    var table = `<table class="table table-bordered">`;
    let tArr = el.srcElement.id.split('-');
    let rowCount = tArr[1];
    let colCount = tArr[2];

    for (var i = 1; i <= +colCount; i++) {
      table += '<tr>'
      for (var j = 1; j <= +rowCount; j++) {
        table += '<td></td>';
        if (j === +rowCount) {
          table += '</tr>';
        }
      }
    }
    table += '</table>';

    this.editableContainer.focus();

    var placeCaretAtStart = this.createCaretPlacer(false);

    document.execCommand("insertHTML", false, table);
    this.showTableConstructor = false;
  }

  createCaretPlacer(atStart) {
    return function (el) {
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
      <div class="col-6 p-0 pr-2">
        <div class="content">
          
        </div>
      </div>
      <div class="col-6 p-0 pl-2">
        <div class="content">
            
        </div>
      </div>
    </div>
  `;
    document.execCommand("insertHTML", false, col);
  }

  readImg(input) {
    if (input.srcElement.files && input.srcElement.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        let img = "<img class='image' src='" + e.target.result + "'>";
        document.execCommand("insertHTML", false, img);
      };
      reader.readAsDataURL(input.srcElement.files[0]);
    }
  }

  readVideo(input) {
    if (input.srcElement.files && input.srcElement.files[0]) {
      var reader = new FileReader();
      reader.onload = function (e: any) {
        let video = `<video class='video' autoplay controls src="${e.target.result}"></video>`
        document.execCommand("insertHTML", false, video);
      };
      reader.readAsDataURL(input.srcElement.files[0]);
    }
  }

  save() {
    let e = document.getElementById("editableContainer");
    console.log(e.innerHTML)
    this.modelService.setHtml(e.innerHTML);
    this.router.navigate(['view']);
  }

}
