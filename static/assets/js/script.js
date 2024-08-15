$(document).ready(function() {
    $('#sidebarCollapse').on('click', function() {
      $('#sidenav-main').toggleClass('active');
      $('.collapse.in').toggleClass('in');
      $('a[aria-expanded=true]').attr('aria-expanded', 'false');
      document.getElementById("bodyContent").style.width="100%";
    });
});