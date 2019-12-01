import { Component, OnInit } from '@angular/core';
import { ModelService } from '../editor/editor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.css']
})
export class EditorViewComponent implements OnInit {
  html;
  constructor(private modelService: ModelService, private router: Router) { }

  ngOnInit() {

    this.html = this.modelService.getHtml();

    console.log(this.html)
  }
  backToEdit(){
    this.router.navigate(['']);
  }

}
