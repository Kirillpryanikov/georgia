import { Injectable } from '@angular/core';
import * as $ from 'jquery'

@Injectable()
export class ScriptMainService {
  constructor(){}

  dropdown() {
    const that = this;
    $(document).on('click', '[data-show-element]', function () {
      $('.' + $(this).data('show-element')).toggleClass('u2g-show');

      $(this).addClass('u2g-showed');

      $('.u2g-overlay').css({'display' : 'block'});

      $('body').addClass('overflow');

      if ($(this).hasClass('u2g-menu-toggle')) {
        $(this).addClass('u2g-menu-toggle--open');

        $('.u2g-page-wrapper').addClass('u2g-page-wrapper--right');
      }
    });

    $(document).on('mouseup', function (e) {

      var showItem = $('.u2g-show');

      if(showItem.length > 0) {

        if($(e.target).hasClass('u2g-showed')) {
          return;
        }

        if (!showItem.is(e.target) && showItem.has(e.target).length === 0) {
          that.hideDropdown();
        }
      }
    });
  }

  private hideDropdown() {
    $('.u2g-show').removeClass('u2g-show');

    $('.u2g-showed').removeClass('u2g-showed');

    $('.u2g-overlay').css({'display' : 'none'});

    $('.u2g-page-wrapper--right').removeClass('u2g-page-wrapper--right');

    $('body').removeClass('overflow');

    $('.u2g-menu-toggle').removeClass('u2g-menu-toggle--open');
  }
}
