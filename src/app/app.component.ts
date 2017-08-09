import { Component, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';

  @HostListener('window:resize') onResize() {
    this.setToScreenHeight(document.getElementById('my-image'));
    this.setToScreenWidth(document.getElementById('my-image'));
    this.setToScreenHeight(document.getElementById('About'));
    this.setToScreenHeight(document.getElementById('Contact'));
  }
  ngOnInit() {
    this.setToScreenHeight(document.getElementById('my-image'));
    this.setToScreenWidth(document.getElementById('my-image'));
    this.setToScreenHeight(document.getElementById('About'));
    this.setToScreenHeight(document.getElementById('Contact'));

  }

  setToScreenHeight(element) {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    element.style.minHeight = String(windowHeight) + 'px';
    element.style.maxHeight = String(windowHeight) + 'px';
  }

  setToScreenWidth(element) {
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    element.style.minWidth = String(windowWidth) + 'px';
    element.style.maxWidth = String(windowWidth) + 'px';
  }
}
