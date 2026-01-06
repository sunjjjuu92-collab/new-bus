/**
 * common.js
 * - scroll top 버튼
 * - 공통 삭제 모달
 * - 공통 일반 모달
 * - 공통 full 팝업(slide up)
 * - 탭 sticky
 * - 기본 탭 전환
 */

$(function () {

  /* =========================
   * 1. 상단으로 이동 버튼
   * ========================= */
  const $window = $(window);
  const $scrollBtn = $('.scrollTop_btn');

  if ($scrollBtn.length) {
    $window.on('scroll', function () {
      $scrollBtn.toggleClass('is-visible', $window.scrollTop() > 200);
    });

    $scrollBtn.on('click', 'button', function (e) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 400);
    });
  }

  /* =========================
   * 2. 공통 삭제 모달
   * ========================= */
  let $deleteTarget = null;

  $(document).on('click', '.delete-btn', function (e) {
    e.preventDefault();

    const $btn = $(this);

    $deleteTarget =
      $btn.closest('.item-row').length ? $btn.closest('.item-row') :
      $btn.closest('.notice-item').length ? $btn.closest('.notice-item') :
      $btn.closest('.card-type').length ? $btn.closest('.card-type') :
      null;

    if ($deleteTarget) {
      $('#deleteModal').addClass('active');
      $('body').addClass('is-modal-open');
    }
  });

  $(document).on('click', '.modal-btn-confirm', function () {
    if ($deleteTarget) {
      $deleteTarget.remove();
      $deleteTarget = null;
    }
    closeDeleteModal();
  });

  $(document).on(
    'click',
    '.modal-btn-cancel, .modal-btn-close',
    closeDeleteModal
  );

  $(document).on('click', '#deleteModal', function (e) {
    if (e.target === this) closeDeleteModal();
  });

  function closeDeleteModal() {
    $('#deleteModal').removeClass('active');
    $('body').removeClass('is-modal-open');
  }

  /* =========================
   * 3. 일반 모달 열기/닫기
   * ========================= */
  $(document).on('click', '.js-modal-open', function (e) {
    e.preventDefault();

    const targetId = $(this).data('target');
    const $modal = $('#' + targetId);

    if ($modal.length) {
      $modal.addClass('active');
      $('body').addClass('is-modal-open');
    }
  });

  $(document).on('click', '.modal-btn-close, .modal-btn-cancel', function () {
    $('.modal-overlay.active').removeClass('active');
    $('body').removeClass('is-modal-open');
  });

  $(document).on('click', '.modal-overlay', function (e) {
    if ($(e.target).is('.modal-overlay')) {
      $('.modal-overlay.active').removeClass('active');
      $('body').removeClass('is-modal-open');
    }
  });

  /* =========================
   * 4. full 팝업 (slide up/down)
   * ========================= */
  $(document).on('click', '.js-popup-open', function (e) {
    e.preventDefault();

    const targetId = $(this).data('target');
    const $popup = $('#' + targetId);

    if ($popup.length) {
      $popup.addClass('active');
      $('body').addClass('is-popup-open');
    }
  });

  $(document).on('click', '.popup-close', closePopup);

  $(document).on('click', '.popup-wrap', function (e) {
    if ($(e.target).is('.popup-wrap')) {
      closePopup();
    }
  });

  $(document).on('keydown', function (e) {
    if (e.key === 'Escape') closePopup();
  });

  function closePopup() {
    $('.popup-wrap.active').removeClass('active');
    $('body').removeClass('is-popup-open');
  }

  /* =========================
   * 5. 탭 sticky
   * ========================= */
  const $tab = $('.tab');

  if ($tab.length) {
    const stickyOffset = $tab.offset().top;

    $window.on('scroll', function () {
      $tab.toggleClass('is-sticky', $window.scrollTop() > stickyOffset);
    });
  }

  /* =========================
   * 6. 기본 탭 전환
   * ========================= */
  $('.tabcontent > div').hide();

  $('.tabnav a').on('click', function (e) {
    e.preventDefault();

    $('.tabcontent > div').hide().filter(this.hash).fadeIn(200);
    $('.tabnav a').removeClass('active');
    $(this).addClass('active');
  }).first().trigger('click');


  $(function () {
  const $file = $('#imgFile');
  const $box = $('.image-box');
  const $plus = $box.find('.upload-plus');
  const $del = $('#imgDelete');

  /* 이미지 업로드 */
  $file.on('change', function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = e => {
      $box
        .css('background-image', `url(${e.target.result})`)
        .addClass('has-image');

      $plus.hide();
      $del.prop('disabled', false).prop('checked', false);
    };
    reader.readAsDataURL(file);
  });

  /* 체크박스 모양 버튼 = 삭제 */
  $del.on('change', function () {
    if (!this.checked) return;

    // 파일 제거
    $file.val('');

    // 미리보기 제거
    $box
      .removeClass('has-image')
      .css('background-image', '');

    // 초기 상태로 복원
    $plus.show();
    $(this).prop('checked', false).prop('disabled', true);
  });
});




/**
 * Body Scroll Lock
 */
function lockBodyScroll() {
  $('body').addClass('is-scroll-locked');
}

function unlockBodyScroll() {
  $('body').removeClass('is-scroll-locked');
}
});



