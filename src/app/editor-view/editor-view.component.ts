import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ModelService } from '../editor/editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.css']
})
export class EditorViewComponent implements OnInit, AfterViewInit {
 
  @ViewChild('viewContent', {static: false}) viewContent;

  html;
  constructor(private modelService: ModelService, private router: Router) { }

  ngOnInit() {
    this.html = this.modelService.getHtml();
    console.log(this.html)
  }

  ngAfterViewInit(): void {
    this.viewContent.nativeElement.innerHTML = this.html
  }
  backToEdit(){
    this.router.navigate(['']);
  }

}
