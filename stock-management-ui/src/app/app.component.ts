import { Component, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from './common/service/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'stock-management-ui';
  displayProgressSpinner = false;
  constructor(private loaderService: LoaderService,private cdRef : ChangeDetectorRef){}

  ngOnInit(){
    this.loaderService.loaderState.subscribe((data)=>{
      this.displayProgressSpinner = data.show;
      this.cdRef.detectChanges();
    })
  }
  
  ngAfterViewChecked() {
      this.cdRef.detectChanges();
  }
  
}
