import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ModelService } from './editor.service';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { NgIf } from '@angular/common';

declare var YUI;

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

  showMoreText;
  showMoreParagraph;
  showMoreFormating;
  showMoreMisc;

  showDrbFontSize;
  showDrbFontFamily;

  showDrbFontColor;
  showDrbFontFill;

  showUnorderedList;
  showOrderedList;

  showParagraphFormat;
  showLineHeight;

  showEmoji;
  showSpecialSymbols;

  fontSizeList = [
    {
      lable: '10px',
      value: 1
    },
    {
      lable: '13px',
      value: 2
    },
    {
      lable: '16px',
      value: 3
    },
    {
      lable: '20px',
      value: 4
    },
    {
      lable: '24px',
      value: 5
    },
    {
      lable: '32px',
      value: 6
    }
  ];
  fontFamilyList = [
    {
      lable: 'Roboto, sans-serif',
      value: 'Roboto, sans-serif'
    },
    {
      lable: 'Arial',
      value: 'Arial'
    }
  ];
  fontColorList = [
    {
      value: '#2196f3'
    },
    {
      value: '#f37e21'
    },
    {
      value: '#00c853'
    },
    {
      value: '#ff6b68'
    },
    {
      value: '#f6b45d'
    },
    {
      value: '#175485'
    },
    {
      value: '#000000'
    },
    {
      value: '#333333'
    },
    {
      value: '#666666'
    },
    {
      value: '#999999'
    },
    {
      value: '#dddddd'
    },
    {
      value: '#eeeeee'
    },
  ];
  orderedList = [
    {
      lable: 'Default',
      style: 'list-style: unset'
    },
    {
      lable: 'Lower Alpha',
      style: 'list-style: lower-alpha'
    },
    {
      lable: 'Lower Greek',
      style: 'list-style: lower-greek'
    },
    {
      lable: 'Lower Roman',
      style: 'list-style: lower-roman'
    },
    {
      lable: 'Upper Alpha',
      style: 'list-style: upper-alpha;'
    },
    {
      lable: 'Upper Roman',
      style: 'list-style: upper-roman'
    }
  ];
  unorderedList = [
    {
      lable: 'Default',
      style: 'list-style: unset'
    },
    {
      lable: 'Circle',
      style: 'list-style: circle'
    },
    {
      lable: 'Disc',
      style: 'list-style: disc'
    },
    {
      lable: 'Square',
      style: 'list-style: square'
    }
  ];
  paragraphFormatList = [
    {
      lable: 'Normal',
      tag: 'p'
    },
    {
      lable: 'Heading 1 (h1)',
      tag: 'h1'
    },
    {
      lable: 'Heading 2 (h2)',
      tag: 'h2'
    },
    {
      lable: 'Heading 3 (h3)',
      tag: 'h3'
    },
    {
      lable: 'Heading 4 (h4)',
      tag: 'h4'
    },
  ];
  lineHeightList = [
    {
      lable: 'Default',
      style: 'line-height: normal'
    },
    {
      lable: 'Single',
      style: 'line-height: 1'
    },
    {
      lable: '1.15',
      style: 'line-height: 1.15'
    },
    {
      lable: '1.5',
      style: 'line-height: 1.5'
    },
    {
      lable: 'Double',
      style: 'line-height: 2'
    },
  ];
  specialSymbolstList = [
    {
      value: 'Ƣ',
    },
    {
      value: '¥',
    },
    {
      value: '®',
    },
    {
      value: '©',
    },
    {
      value: '¶',
    },
  ];

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
  currentOrderedList = false;
  currentUnorderedList = false;

  constructor(private modelService: ModelService, private router: Router, private chRef: ChangeDetectorRef) {

  }

  setStyleParent(style) {
    let listId = window.getSelection().focusNode.parentNode.parentNode;
    $(listId).attr('style', style);
  }
  setStyleElement(style) {
    let listId = window.getSelection().focusNode.parentNode;
    setTimeout(() => {
      $(listId).attr('style', style);
    }, 50);
  }
  setClassElement(classElement) {
    let listId = window.getSelection().focusNode.parentNode;
    $(listId).addClass(classElement);
  }
  setOrderedList() {
    if (!this.currentOrderedList) {
      document.execCommand('insertOrderedList', false, null);
    }
  }
  setUnorderedList() {
    if (!this.currentUnorderedList) {
      document.execCommand('insertUnorderedList', false, null);
    }
  }
  setTextIndent() {
    document.execCommand('indent', false, null);
  }
  removeTextIndent() {
    document.execCommand('outdent', false, null);
  }

  hideDetails() {
    this.showMoreText = false;
    this.showMoreParagraph = false;
    this.showMoreFormating = false;
    this.showMoreMisc = false;
  }

  setQuote() {
    let body = window.getSelection().focusNode.parentNode;
    let clone = body.cloneNode(true);
    console.log(clone, 'clone');
    document.execCommand('insertHTML', false, `<div class="quote">${clone.textContent}</div> <div class="element-space"></div>`);
  }
  createLink() {
    let link = prompt('link name');
    if (link) {
      document.execCommand('createLink', false, link);
    }
  }

  ngOnInit() {

    let self = this;

    document.onselectionchange = function (event) {
      // console.log(event, 'eventevent')

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

      let currentOrderedList: any = document.queryCommandValue("insertOrderedList");
      let currentUnorderedList: any = document.queryCommandValue("insertUnorderedList");

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

      self.currentOrderedList = (currentOrderedList === 'true');
      self.currentUnorderedList = (currentUnorderedList === 'true');

      self.reportSelection();
      // console.log(self.currentSubscript);
      // console.log(self.currentSuperscript);

    }
  }

  getSelectionCharacterOffsetWithin(element) {
    var start = 0;
    var end = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;
    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();
      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.startContainer, range.startOffset);
        start = preCaretRange.toString().length;
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        end = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToStart", textRange);
      start = preCaretTextRange.text.length;
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      end = preCaretTextRange.text.length;
    }
    return { start: start, end: end };
  }

  selOffsetsStart;
  selOffsetsEnd;

  createRange(node, chars, range?) {
    if (!range) {
      range = document.createRange()
      range.selectNode(node);
      range.setStart(node, 0);
    }

    if (chars.count === 0) {
      range.setEnd(node, chars.count);
    } else if (node && chars.count > 0) {
      if (node.nodeType === Node.TEXT_NODE) {
        if (node.textContent.length < chars.count) {
          chars.count -= node.textContent.length;
        } else {
          range.setEnd(node, chars.count);
          chars.count = 0;
        }
      } else {
        for (var lp = 0; lp < node.childNodes.length; lp++) {
          range = this.createRange(node.childNodes[lp], chars, range);

          if (chars.count === 0) {
            break;
          }
        }
      }
    }

    return range;
  };

  reportSelection() {
    var selOffsets = this.getSelectionCharacterOffsetWithin(document.getElementById("editableContainer"));
    this.selOffsetsStart = selOffsets.start;
    this.selOffsetsEnd = selOffsets.end;
    // console.log(this.selOffsetsStart, 'selOffsetsStart');
    // console.log(this.selOffsetsEnd, 'selOffsetsEnd');

  }

  setPos(pos) {

    let nodeIndex = 0;
    let nodeLength = 0;
    let newPos = pos;

    var tag = document.getElementById("editableContainer");

    // Creates range object 
    var setpos = document.createRange();

    // Creates object for selection 
    var set = window.getSelection();

    // Set start position of range 
    for (let index = 0; index < tag.childNodes.length; index++) {
      console.log(index, 'index');
      if (nodeLength + +tag.childNodes[index].textContent.length < pos) {
        nodeLength += +tag.childNodes[index].textContent.length;
        newPos -= +tag.childNodes[index].textContent.length;
      } else {
        nodeIndex = index;
        break;
      }
    }
    // tag.childNodes.forEach((element, index) => {
    //   if (nodeLength + +element.textContent.length < pos) {
    //     console.log('111111');

    //     nodeLength += +element.textContent.length;
    //     newPos = -element.textContent.length;
    //   } else {
    //     console.log('2222');

    //     nodeIndex = index;
    //   }
    // });
    console.log(nodeLength, 'noneLength');
    console.log(nodeIndex, 'nodeIndex');
    console.log(pos, 'pos');
    console.log(newPos, 'newPos');

    console.log(tag.childNodes[0], 'tag.childNodes[0]');
    console.log(tag.childNodes[1], 'tag.childNodes[1]');
    console.log(tag.childNodes, 'tag.childNodes');


    setpos.setStart(tag.childNodes[0], 5);

    // Collapse range within its boundary points 
    // Returns boolean 
    setpos.collapse(true);

    // Remove all ranges set 
    set.removeAllRanges();

    // Add range with respect to range object. 
    set.addRange(setpos);

    // Set cursor on focus 
    tag.focus();
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
      if (i === 1) {
        table += '<tr>'
        for (var j = 1; j <= +rowCount; j++) {
          table += '<th></th>';
          if (j === +rowCount) {
            table += '</tr>';
          }
        }
      }
      table += '<tr>'
      for (var j = 1; j <= +rowCount; j++) {
        table += '<td></td>';
        if (j === +rowCount) {
          table += '</tr>';
        }
      }
    }
    table += '</table> <p class="paragraph element-space"></p>';

    // this.editableContainer.focus();

    // var placeCaretAtStart = this.createCaretPlacer(false);

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
    
        <p class="paragraph element-space"></p>
        `;
    document.execCommand("insertHTML", false, col);
  }

  imgContainerId = 'imgContainerId-';
  imgEditFlag = {};
  resizeNone = true;

  imageOptions(el, imgId) {
    let body = window.getSelection().focusNode.parentNode;
    let clone = el.firstElementChild.cloneNode(true);
    let clone2 = el.cloneNode(true);
    console.log(clone2, 'cesdzasdasdasda');

    // console.log(body, 'body');
    // console.log(el.firstElementChild);
    el.firstElementChild.remove();

    let id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
    let self = this;

    clone.style.width = "100%";
    clone.style.height = "100%";

    let newElement = `
    <div class="pos-r" contenteditable='false'>
        <div id='${this.imgContainerId + id}' class="img-wrap df img-container">
          ${clone.outerHTML}
          <div class="img-actions-wrap">
            <button id='${this.imgContainerId + id + '-replace'}' class="button" title="Replace">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
            <div class="pos-r hover-drb-wrap">
              <button class="button" title="Align">
                <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
                <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
                <div class="arrow">
                  <img class="inactive" src="assets/icons/editor-head/inactive/path.svg" alt="">
                  <img class="active" src="assets/icons/editor-head/active/path.svg" alt="">
                </div>
              </button>
              <div class="focus-drb">
                <button id='${this.imgContainerId + id + '-align-left'}' class="default-drb--item">
                  Left
                </button>
                <button id='${this.imgContainerId + id + '-align-center'}' class="default-drb--item">
                  Center
                </button>
                <button id='${this.imgContainerId + id + '-align-right'}' class="default-drb--item">
                  Right
                </button>
              </div>
            </div>
            <button id='${this.imgContainerId + id + '-img-name'}' class="button" title="Image name">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
            <button id='${this.imgContainerId + id + '-delete'}' class="button" title="Remove">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
            <button id='${this.imgContainerId + id + '-link'}' class="button" title="Insert-Link">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
            <div class="pos-r hover-drb-wrap">
              <button class="button" title="Display">
                <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
                <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
                <div class="arrow">
                  <img class="inactive" src="assets/icons/editor-head/inactive/path.svg" alt="">
                  <img class="active" src="assets/icons/editor-head/active/path.svg" alt="">
                </div>
              </button>
              <div class="focus-drb">
                <button class="default-drb--item">
                  drb--item
                </button>
              </div>
            </div>
            <button id='${this.imgContainerId + id + '-alt'}' class="button" title="Alternative-Text">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
            <button class="button" title="Change-Size">
              <img class="inactive" src="assets/icons/editor-head/inactive/bold.svg" alt="">
              <img class="active" src="assets/icons/editor-head/active/bold.svg" alt="">
            </button>
          </div>
        </div>
      </div>
    `;

    console.log(clone);
    el.innerHTML = newElement;

    YUI().use('overlay', 'resize-plugin', function (Y) {
      console.log(self.imgEditFlag, 'self.imgEditFlag[imgId]self.imgEditFlag[imgId]');

      let width = self.imgEditFlag[imgId].width ? self.imgEditFlag[imgId].width + "px" : "unset";
      let height = self.imgEditFlag[imgId].height ? self.imgEditFlag[imgId].height + "px" : "unset";

      if (0 < self.imgEditFlag[imgId].width && 100 > self.imgEditFlag[imgId].width)
        width = "100px"
      if (0 < self.imgEditFlag[imgId].height && 100 > self.imgEditFlag[imgId].height)
        height = "100px"

      console.log(height);
      console.log(width);

      var overlay = new Y.Overlay({
        srcNode: '#' + self.imgContainerId + id,
        width: width,
        height: height,
      });
      overlay.plug(Y.Plugin.Resize);
      overlay.render();

      overlay.resize.on('resize:resize', function (event) {
        console.log('resize:resize');
      });

      overlay.resize.on('resize:start', function (event) {
        console.log('resize:start');
      });

      overlay.resize.on('resize:end', function (event) {

        self.imgEditFlag[imgId].width = event.info.offsetWidth;
        self.imgEditFlag[imgId].height = event.info.offsetHeight;

        console.log('resize:end');
      });
      overlay.resize.on('resize:align', function (event) {
        console.log('resize:align');
      });
      overlay.resize.on('resize:mouseUp', function (event) {
        console.log('resize:mouseUp');
        self.resizeNone = false;
        setTimeout(() => {
          self.resizeNone = true;
        }, 200);
      });

    });

    let interval = setInterval(() => {
      if (document.getElementById(self.imgContainerId + id)) {

        document.getElementById(self.imgContainerId + id + '-align-left').addEventListener('click', function (this, event) {
          self.alignImgLeft(el);
        });

        document.getElementById(self.imgContainerId + id + '-align-center').addEventListener('click', function (this, event) {
          self.alignImgCenter(el);
        });

        document.getElementById(self.imgContainerId + id + '-align-right').addEventListener('click', function (this, event) {
          self.alignImgRight(el);
        });

        document.getElementById(self.imgContainerId + id + '-img-name').addEventListener('click', function (this, event) {
          self.setImgName(el, imgId);
        });
        document.getElementById(self.imgContainerId + id + '-delete').addEventListener('click', function (this, event) {
          self.setImgDelete(el, imgId);
        });
        document.getElementById(self.imgContainerId + id + '-alt').addEventListener('click', function (this, event) {
          self.setImgAlt(el, imgId);
        });
        document.getElementById(self.imgContainerId + id + '-link').addEventListener('click', function (this, event) {
          self.setImgLink(el, imgId);
        });
        document.getElementById(self.imgContainerId + id + '-replace').addEventListener('click', function (this, event) {
          self.setImgReplace(document.getElementById(imgId).parentElement);
        });

        clearInterval(interval);
      }
    }, 300);

    // document.execCommand('insertHTML', false, clone);
  }
  alignImgLeft(el) {
    el.style = 'justify-content: flex-start;'
  }
  alignImgCenter(el) {
    el.style = 'justify-content: center;'
  }
  alignImgRight(el) {
    el.style = 'justify-content: flex-end;'
  }
  setImgName(el, imgId) {
    let name = prompt("Your image name", '');
    if (name) {
      this.imageOutEdit(imgId);
      this.imgEditFlag[imgId].flag = false;

      this.imgEditFlag[imgId].targetEl.firstElementChild.querySelectorAll('.img-name')[0].innerHTML = name;
      let clone = this.imgEditFlag[imgId].targetEl.firstElementChild.querySelectorAll('.img-name')[0].cloneNode(true)
      
      document.getElementById(imgId).firstElementChild.remove();
      document.getElementById(imgId).innerHTML = this.imgEditFlag[imgId].targetEl.firstElementChild.outerHTML;
      setTimeout(() => {
        console.log(document.getElementById(imgId).offsetHeight);
        console.log(document.getElementById(imgId));
      }, 2000);
      // el.firstElementChild.innerHTML = html + el.firstElementChild.innerHTML
    }
  }
  setImgAlt(el, imgId) {
    let name = prompt("Your alternative image name", '');
    if (name) {
      this.imageOutEdit(imgId);
      this.imgEditFlag[imgId].flag = false;

      this.imgEditFlag[imgId].targetEl.firstElementChild.querySelectorAll('a')[0].firstElementChild.setAttribute("alt", name)
      document.getElementById(imgId).firstElementChild.remove();
      document.getElementById(imgId).innerHTML = this.imgEditFlag[imgId].targetEl.firstElementChild.outerHTML;
      // el.firstElementChild.innerHTML = html + el.firstElementChild.innerHTML
    }
  }
  setImgLink(el, imgId) {
    let name = prompt("Your link", '');
    if (name) {
      this.imageOutEdit(imgId);
      this.imgEditFlag[imgId].flag = false;

      this.imgEditFlag[imgId].targetEl.firstElementChild.querySelectorAll('a')[0].setAttribute("href", name)
      document.getElementById(imgId).firstElementChild.remove();
      document.getElementById(imgId).innerHTML = this.imgEditFlag[imgId].targetEl.firstElementChild.outerHTML;
      // el.firstElementChild.innerHTML = html + el.firstElementChild.innerHTML
    }
  }
  setImgDelete(el, imgId) {
    document.getElementById(imgId).remove();
    // el.firstElementChild.innerHTML = html + el.firstElementChild.innerHTML
  }
  setImgReplace(parent) {
    if (parent) {
      if (parent.querySelectorAll('.row')[0]) {
        console.log(parent);
        parent.querySelectorAll('.row')[0].classList.toggle("row-reverse")
      } else {
        this.setImgReplace(parent.parentElement)
      }
    } else {
      console.log('cerff');
    }

    // el.firstElementChild.innerHTML = html + el.firstElementChild.innerHTML
  }
  imageOutEdit(imgId) {

    console.log(document.getElementById(imgId));
    console.log(imgId);
    console.log(this.imgEditFlag[imgId].targetEl);
    if (imgId && document.getElementById(imgId) && document.getElementById(imgId).firstElementChild) {
      document.getElementById(imgId).firstElementChild.remove();
      document.getElementById(imgId).innerHTML = this.imgEditFlag[imgId].targetEl.firstElementChild.outerHTML;

      console.log(this.imgEditFlag[imgId]);

      let img = document.getElementById(imgId).firstElementChild as HTMLElement;
      console.log(img);
      console.log(this.imgEditFlag[imgId].width);
      console.log(this.imgEditFlag[imgId].height);
      let width = this.imgEditFlag[imgId].width ? this.imgEditFlag[imgId].width + "px" : "100%";
      let height = this.imgEditFlag[imgId].height ? this.imgEditFlag[imgId].height + "px" : "100%";

      if (0 < this.imgEditFlag[imgId].width && 100 > this.imgEditFlag[imgId].width)
        width = "100px";
      if (0 < this.imgEditFlag[imgId].height && 100 > this.imgEditFlag[imgId].height)
        height = "100px";

      img.style.width = width;
      img.style.height = height;
    }
    // document.execCommand('insertHTML', false, clone);
  }

  readImg(input) {
    if (input.srcElement.files && input.srcElement.files[0]) {
      var reader = new FileReader();
      let id = `f${(~~(Math.random() * 1e8)).toString(16)}`;
      let self = this;
      reader.onload = function (e: any) {
        let img = `
        <div id='${self.imgContainerId + id}' class="img-wrap df img-container" contenteditable="false">
          <div class='pos-r max-full'>
            <div class="img-name" contenteditable="true"></div>
            <a class="img-link">
              <img class='image img' src='` + e.target.result + `'>
            </a>
          </div>
        </div>
        <p class='element-space'></p>
        <div class='element-space'></div>
        `;
        document.execCommand("insertHTML", false, img);
      };
      reader.readAsDataURL(input.srcElement.files[0]);

      let interval = setInterval(() => {
        if (document.getElementById(self.imgContainerId + id)) {
          document.getElementById(self.imgContainerId + id).addEventListener('click', function (this, event) {
            event.stopPropagation();
            if (!self.imgEditFlag[self.imgContainerId + id] || (self.imgEditFlag[self.imgContainerId + id] && !self.imgEditFlag[self.imgContainerId + id].flag)) {
              let clone = this.cloneNode(true);
              if (self.imgEditFlag[self.imgContainerId + id]) {
                self.imgEditFlag[self.imgContainerId + id].flag = true;
                self.imgEditFlag[self.imgContainerId + id].targetEl = clone;
              } else {
                self.imgEditFlag[self.imgContainerId + id] = {
                  flag: true,
                  targetEl: clone,
                  width: 0,
                  height: 0
                };
              }
              self.imageOptions(this, self.imgContainerId + id);
              console.log(111);
            }
            $(window).click(function () {
              if (self.resizeNone && self.imgEditFlag[self.imgContainerId + id].flag) {
                console.log(222);
                self.imageOutEdit(self.imgContainerId + id);
                self.imgEditFlag[self.imgContainerId + id].flag = false;
              }
            });
          });
          clearInterval(interval);
        }
      }, 300);

    }
  }
  setEmoji(e) {
    let body = window.getSelection().focusNode.parentNode;
    document.execCommand('insertHTML', false, e.emoji.native);
    this.showEmoji = false;
  }
  setSymbol(value) {
    let body = window.getSelection().focusNode.parentNode;
    document.execCommand('insertHTML', false, value);
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
