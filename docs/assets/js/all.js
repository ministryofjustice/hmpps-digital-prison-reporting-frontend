import Copy from "./copy";
import Tabs from "./tabs";

$(function () {
  $('[data-module="app-tabs"]').each(function (e, el) {
    new Tabs($(el));
  });

  $('[data-module="app-copy"]').each(function (e, el) {
    new Copy(el).init();
  });
});
