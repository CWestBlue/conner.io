import { Component, OnInit, HostListener, AfterViewInit } from '@angular/core';
import { MdDialog } from '@angular/material';
import { ContactDialogComponent } from './contact-dialog.component';
import { MdIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
// import * as ScrollMagic from 'scrollmagic';

declare const TweenLite: any;

declare const ScrollMagic: any;


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'app works!';
  selectedOption: any;
  controller = new ScrollMagic.Controller();
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

  constructor(public dialog: MdDialog, private register: MdIconRegistry, private domSanitizer: DomSanitizer) {
    register.addSvgIcon('firebase', domSanitizer.bypassSecurityTrustResourceUrl('assets/firebase.svg'));
    register.addSvgIcon('ionic', domSanitizer.bypassSecurityTrustResourceUrl('assets/ionic.svg'));
    register.addSvgIcon('nodejs', domSanitizer.bypassSecurityTrustResourceUrl('assets/nodejs.svg'));
    register.addSvgIcon('electron', domSanitizer.bypassSecurityTrustResourceUrl('assets/electron.svg'));
    // register('angular', domSanitizer.bypassSecurityTrustResourceUrl(''));
   }
  ngOnInit() {
    this.setToScreenHeight(document.getElementById('my-image'));
    this.setToScreenWidth(document.getElementById('my-image'));
    this.setToScreenHeight(document.getElementById('About'));
    this.setToScreenWidth(document.getElementById('image-text'));
    this.setWritter();
    this.windowOnLoad();
    console.log(ScrollMagic);

    // this.setToScreenHeight(document.getElementById('Contact'));

  }

  ngAfterViewInit() {
    const bio = document.getElementById('BIO');
    const education = document.getElementById('Education');
    // const bioTween = new TweenLite.from(bio, 1.5, { right: 500 });
    // const educationTween = new TweenLite.from(education, 1.5, { opacity: 0 });
    // new ScrollMagic.Scene({
    //   triggerElement: '#About'
    // })
    //   .setTween(bioTween)
    //   .addTo(this.controller);
    // new ScrollMagic.Scene({
    //   triggerElement: '#About'
    // })
    // .setTween(educationTween)
    // .addTo(this.controller);
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

  setToScreenHeight(element: HTMLElement) {
    const windowHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    element.style.height = String(windowHeight + 'px');
    element.style.minHeight = String(windowHeight) + 'px';
  }

  setToScreenWidth(element) {
    const windowWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    // element.style.minWidth = String(windowWidth) + 'px';
    element.style.width = String(windowWidth + 'px');
    // element.style.maxWidth = String(windowWidth) + 'px';
  }
}
