import { Component, OnInit, HostListener } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ContactDialogComponent } from './contact-dialog.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';
  selectedOption: any;
  TxtType = function (el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
  };
  @HostListener('window:resize') onResize() {
    this.setToScreenHeight(document.getElementById('my-image'));
    this.setToScreenWidth(document.getElementById('my-image'));
    this.setToScreenHeight(document.getElementById('About'));
    this.setToScreenWidth(document.getElementById('image-text'));
    // this.setToScreenHeight(document.getElementById('Contact'));
  }

  constructor(public dialog: MdDialog) { }
  ngOnInit() {
    this.setToScreenHeight(document.getElementById('my-image'));
    this.setToScreenWidth(document.getElementById('my-image'));
    this.setToScreenHeight(document.getElementById('About'));
    this.setToScreenWidth(document.getElementById('image-text'));
    this.setWritter();
    this.windowOnLoad();

    // this.setToScreenHeight(document.getElementById('Contact'));

  }


  setWritter() {
    this.TxtType.prototype.tick = function () {
      const i = this.loopNum % this.toRotate.length;
      const fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">' + this.txt + '</span>';

      const that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function () {
        that.tick();
      }, delta);
    };
  }
  windowOnLoad() {
    const elements = document.getElementsByClassName('typewrite');
    for (let i = 0; i < elements.length; i++) {
      const toRotate = elements[i].getAttribute('data-type');
      const period = elements[i].getAttribute('data-period');
      if (toRotate) {
        new this.TxtType(elements[i], JSON.parse(toRotate), period);
      }
    }
    // INJECT CSS
    const css = document.createElement('style');
    css.type = 'text/css';
    css.innerHTML = '.typewrite > .wrap { border-right: 0.08em solid #fff}';
    document.body.appendChild(css);
  }

  openDialog() {
    this.dialog.open(ContactDialogComponent);
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
    window.scrollTo({ left: 0, top: stopY, behavior: 'smooth' });
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

  setToScreenHeight(element: HTMLElement) {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    element.style.minHeight = String(windowHeight) + 'px';
    if (element.id === 'my-image') {
      element.style.maxHeight = String(windowHeight) + 'px';
    }
  }

  setToScreenWidth(element) {
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    element.style.minWidth = String(windowWidth) + 'px';
    element.style.maxWidth = String(windowWidth) + 'px';
  }
}
