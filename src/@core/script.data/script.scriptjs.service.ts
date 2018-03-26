import { ElementRef, Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { Platform } from 'ionic-angular';
import * as $ from 'jquery';

@Injectable()
export class ScriptService {
  private renderer: Renderer2;

  constructor(private platform: Platform,
              private rendererFactory: RendererFactory2){
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  /**
   * Location center
   * @param {ElementRef} el
   */
  setPositionCenter(el: ElementRef) {
    $('.u2g-overlay').css({'display' : 'block'});
    let style = {
      top: (el.nativeElement.parentElement.clientHeight - el.nativeElement.offsetHeight) / 2,
      left: (el.nativeElement.parentElement.clientWidth - el.nativeElement.offsetWidth) / 2
    };
    this.renderer.setStyle(el.nativeElement, 'top', style.top  + 'px');
    this.renderer.setStyle(el.nativeElement, 'left', style.left  + 'px');
  }

  /**
   * Close Modal
   */
  closePopup() {
    this.hidePopup();
    $('.u2g-popup-wrapper').remove(); // hide background
  }

  /**
   * Click on checkbox
   * @param {ElementRef} el this is input[type = checkbox]
   */
  checkboxSelect(el: ElementRef) {
    this.renderer.addClass(el, 'u2g-check');
    this.renderer.addClass(el, 'u2g-select');
    console.log('el :::: ', el)
  }

  offClick() {
    $(document).off('touchstart', '.u2g-overlay', function() {});
    $(document).off('touchstart', '.u2g-close-popup_js', function() {});
    $(document).off('touchstart', '.u2g-close-popup_js', function() {});
    $(document).off('touchstart', '[data-popup]', function(e) {})
  }

  private hidePopup(){
    $('.u2g-popup-wrapper').remove();

    $('.invoice-input_js').val('');

    $('.u2g-check').removeClass('u2g-check');

    $('.u2g-overlay').css({'display' : 'none'});
  }


  private hideDropdown() {
    $('.u2g-show').removeClass('u2g-show');

    $('.u2g-showed').removeClass('u2g-showed');

    $('.u2g-overlay').css({'display' : 'none'});

    $('.u2g-page-wrapper--right').removeClass('u2g-page-wrapper--right');

    $('ionic-content').removeClass('overflow');

    $('.u2g-menu-toggle').removeClass('u2g-menu-toggle--open');
  }
}
