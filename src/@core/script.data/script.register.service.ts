import { ElementRef, Injectable } from '@angular/core';
import * as $ from 'jquery';

const organizationField = '<input type="text" class="u2g-form-group__field organization_field_c" name="organization">';
const idNumber = $('.js-id-number');
const nonGeorgian = $('.js-non-georgian');

@Injectable()
export class ScriptRegisterService {

  checkbox() {
    $(document).on('touchstart', '.js-switch', function (event) {
      var checkbox = $(this).find('input[type="checkbox"]');
      event.preventDefault();
      if (checkbox.is(':not(:checked)')) {
        if ($(this).closest('.js-organization').length) {
          $('.js-organization').append(organizationField);
          idNumber.find('span').text('ID number 9 digit');
          nonGeorgian.css({'display': 'none'});
        }
        if ($(this).closest('.js-non-georgian').length) {
          $('.js-organization').css({'display': 'none'});
          idNumber.find('span').text('ID/Password Number');
        }
        checkbox.prop('checked', true);
      } else if (checkbox.is(':checked')) {
        if ($(this).closest('.js-organization').length) {
          $('[name="organization"]').remove();
          idNumber.find('span').text('ID number 11 digit');
          nonGeorgian.css({'display': 'flex'});
        }
        if ($(this).closest('.js-non-georgian').length) {
          $('.js-organization').css({'display': 'flex'});
          idNumber.find('span').text('ID number 11 digit');
        }
        checkbox.prop('checked', false);
      }
    });
  }

  offClick() {
    $(document).off('touchstart', '.js-switch');
  }

  hideDropdown() {
    $('.u2g-show').removeClass('u2g-show');

    $('.u2g-showed').removeClass('u2g-showed');

    $('.u2g-overlay').css({'display' : 'none'});

    $('.u2g-page-wrapper--right').removeClass('u2g-page-wrapper--right');

    $('body').removeClass('overflow');

    $('.u2g-menu-toggle').removeClass('u2g-menu-toggle--open');
  }
}
