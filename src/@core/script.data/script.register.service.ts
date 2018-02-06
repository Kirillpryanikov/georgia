import { Injectable } from '@angular/core';
import * as $ from 'jquery'

const organizationField = '<input type="text" class="u2g-form-group__field" name="organization" data-rule-required="true">';
const idNumber = $('.js-id-number');
const nonGeorgian = $('.js-non-georgian');

@Injectable()
export class ScriptRegisterService {
  constructor(){}

  checkbox(event) {
      var checkbox = $(this).find('input[type="checkbox"]');
      event.preventDefault();
      if(checkbox.is(':not(:checked)')) {

        if($(this).closest('.js-organization').length) {
          $('.js-organization').append(organizationField);

          idNumber.find('span').text('ID number 9 digit');

          nonGeorgian.css({'display' : 'none'});
        }

        if($(this).closest('.js-non-georgian').length) {
          $('.js-organization').css({'display' : 'none'});

          idNumber.find('span').text('ID/Password Number');
        }

        checkbox.prop('checked', true);
      } else if(checkbox.is(':checked')) {

        if($(this).closest('.js-organization').length) {
          $('[name="organization"]').remove();

          idNumber.find('span').text('ID number 11 digit');

          nonGeorgian.css({'display' : 'flex'});
        }

        if($(this).closest('.js-non-georgian').length) {
          $('.js-organization').css({'display' : 'flex'});

          idNumber.find('span').text('ID number 11 digit');
        }
        checkbox.prop('checked', false);
      }
  }

  dropdown() {
    const that = this;
    $(document).on('click', '[data-show-element]', function () {
      $('.' + $(this).data('show-element')).toggleClass('u2g-show');

      $(this).addClass('u2g-showed');
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
