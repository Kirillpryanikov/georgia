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

  setPositionCenter(el: ElementRef) {
    $('.u2g-overlay').css({'display' : 'block'});
    let style = {
      top: (this.platform.height() - el.nativeElement.offsetHeight) / 2,
      left: (this.platform.width() - el.nativeElement.offsetWidth) / 2
    };
    this.renderer.setStyle(el.nativeElement, 'top', style.top  + 'px');
    this.renderer.setStyle(el.nativeElement, 'left', style.left  + 'px');
  }

  closePopup() {
    $('.u2g-overlay').css({'display' : 'none'});

    $('.u2g-popup-wrapper').remove(); // hide background
  }

  showPopup() {
    const that = this;
    var popup = $('<div class="u2g-popup-wrapper"></div>');
    $(document).on('click', '[data-popup]', function(e) {
      if($(this).prop('tagName') == 'LABEL') {
        if($(this).find('input[type="checkbox"]').is(':not(:checked)')) {
          $(this).addClass('u2g-check');
        } else {
          $(this).find('input[type="checkbox"]').prop('checked', false)
          return false;
        }
      }
      e.preventDefault();
      that.hideDropdown();
      popup.appendTo('ionic-content');

      $('.u2g-overlay').css({'display' : 'block'});
      popup.load('popups.html #' + $(this).data('popup'), function() {
        if (!!$('.u2g-select:not(.u2g-select_stylized)')) {
          var select = $('.u2g-popup-wrapper').find('.u2g-select');

          if(select.length != 0) {
            // styleSelect('.u2g-select');
            select.addClass('.u2g-select')
          }
        }
        that.popupPosition(popup);
      });
    });

    $(document).on('click', '.u2g-overlay', function() {
      $('.u2g-popup-wrapper').remove();

      $('.u2g-check').removeClass('u2g-check');
    });

    $(document).on('click', '.u2g-close-popup_js', function(e) {
      that.hidePopup();
    });

    $(document).on('click', '.u2g-yes-button_js', function() {
      $('.u2g-check').find('input[type="checkbox"]').prop('checked', true);

      that.hidePopup();
    });
  }


  offClick() {
    $(document).off('click', '.u2g-overlay', function() {});
    $(document).off('click', '.u2g-close-popup_js', function() {});
    $(document).off('click', '.u2g-close-popup_js', function() {});
    $(document).off('click', '[data-popup]', function(e) {})
  }

  private hidePopup(){
    $('.u2g-popup-wrapper').remove();

    $('.invoice-input_js').val('');

    $('.u2g-check').removeClass('u2g-check');

    $('.u2g-overlay').css({'display' : 'none'});
  }

  private popupPosition(popup) {
    var top = ($(window).height() - popup.outerHeight()) / 2,
      left = ($(window).width() - popup.outerWidth()) / 2;
    popup.css({
      'top': top + 'px',
      'left': left + 'px',
    });
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
