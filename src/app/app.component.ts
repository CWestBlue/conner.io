import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  @HostListener('window:resize') onResize() {
    this.picSize(document.getElementById('my-image'));
  }
  ngOnInit() {
    this.picSize(document.getElementById('my-image'));

  }

  picSize(myImage) {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    myImage.style.minHeight = String(windowHeight) + 'px';
    myImage.style.maxHeight = String(windowHeight) + 'px';
    myImage.style.minWidth = String(windowWidth) + 'px';
    myImage.style.maxWidth = String(windowWidth) + 'px';
  }
}
