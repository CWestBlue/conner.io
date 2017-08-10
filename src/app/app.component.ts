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

  currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) {
      return self.pageYOffset;
    }
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop) {
      return document.documentElement.scrollTop;
    }
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) {
      return document.body.scrollTop;
    }
    return 0;
  }


  scroll(id) {
    const startY = this.currentYPosition();
    const stopY = this.elmYPosition(id);
    window.scrollTo({ left: 0, top: stopY, behavior: 'smooth'});
  }

  elmYPosition(id) {
    const elm = document.getElementById(id);
    console.log(elm);
    let y = elm.offsetTop;
    let node: any;
    while (elm.offsetParent && elm.offsetParent !== document.body) {
      node = elm.offsetParent;
      y += node.offsetTop;
    } return y;
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
