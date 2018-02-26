import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import * as Masonry from 'masonry-layout';
import * as jQueryBridget from 'jquery-bridget'

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

  hideDropdown(){
    $('.u2g-show').removeClass('u2g-show');

    $('.u2g-showed').removeClass('u2g-showed');

    $('.u2g-overlay').css({'display' : 'none'});

    $('.u2g-page-wrapper--right').removeClass('u2g-page-wrapper--right');

    $('body').removeClass('overflow');

    $('.u2g-menu-toggle').removeClass('u2g-menu-toggle--open');
  }

  tabsSetting() {
    $('li:not(.tab-active_js)').on('click', function () {
      $(this).addClass('u2g-settings__tab-active').siblings().removeClass('u2g-settings__tab-active')
        .parents('.tabs-wrapper_js').find('.tab-content_js').hide().eq($(this).index()).fadeIn(0);
    });
  }

  initMasonry() {
    console.log('masonry');
    jQueryBridget( 'masonry', Masonry, $ );
    $('.u2g-content--masonry').masonry({
      itemSelector: '.u2g-info-block',
      columnWidth: '.u2g-info-block',
      gutter: 24,
      percentPosition: true
    });
  }

  invoiceFileAdd() {
    $(document).on('change', '.invoice-input_js', function (e) {
      var fileName;

      if(e.target.files[0] == undefined) {
        fileName = '';
      } else {
        fileName = e.target.files[0].name;
      }

      $('.u2g-file-name').text(fileName);

      $('.remove-file_js').addClass('u2g-remove-file--chosen');
    });
  }

  invoiceFileRemove() {
    $(document).on('click', '.remove-file_js', function() {

      $('.invoice-input_js').val('');

      $('.u2g-file-name').text('');

      $('.remove-file_js').removeClass('u2g-remove-file--chosen');
    });
  }


  radio() {
    $(document).on('click', '.u2g-add-product__radio > input', function() {
      if($('#radio-description').is(':checked')) {
        $('.u2g-add-product__field--select').addClass('u2g-add-product__field--active');
        $('.u2g-add-product__field--code').removeClass('u2g-add-product__field--active');
      } else {
        $('.u2g-add-product__field--select').removeClass('u2g-add-product__field--active');
        $('.u2g-add-product__field--code').addClass('u2g-add-product__field--active');
      }
    });
  }

  //shipper field readonly
  readonly(){
    $(document).on('click', '[name="shipper"]', function() {
      var urlInput = $('#store-url');

      if($('#shipper-personal').is(':checked')) {
        urlInput.prop('readonly', true);
        urlInput.addClass('readonly');
        $('#store-url').val('');
        $('.error').remove();
      } else {
        urlInput.prop('readonly', false);
        urlInput.removeClass('readonly');
      }
    });
  }
}
